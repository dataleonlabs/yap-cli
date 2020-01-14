# Create-yap-policy
Policies are applied inside the gateway which sits between the API consumer and the managed API. The gateway receives all requests and usually forwards them unaltered to the underlying API. However a policy can apply changes to both the inbound request and outbound response.

### Exemple
Apply policies specified at different scopes, If you have a policy at the global level and a policy configured for an API, then whenever that particular API is used both policies will be applied. yap allows for deterministic ordering of combined policy statements via the base element.

```xml
<policies>
    <inbound>
        <find-and-replace from="xyz" to="abc" />
    </inbound>
</policies>
```

## Custom Policies
The steps required to create a custom policy and apply it to an existing API are:
- Create the policy implementation in JavaScript (TypeScript is recommended)

### Npm
#### Installing with NPX
npx is a tool intended to help round out the experience of using packages from the npm registry — the same way npm makes it super easy to install and manage dependencies hosted on the registry, npx makes it easy to use CLI tools and other executables hosted on the registry. It greatly simplifies a number of things that, until now, required a bit of ceremony to do with plain npm.

To get started, first make sure that your dev environment meets the requirements for running the the platform. Once you have the proper version of Node.js, install npx tool.

```bash
# install the CLI globally
npm install -g npx
```

If you've previously installed `create-yap` globally via `npm install -g create-yap`, we recommend you uninstall the package using `npm uninstall -g create-yap` to ensure that npx always uses the latest version.

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_


```bash
# create a directory with the minimum required files
npx create-yap example-policy --type policy
```

### Yarn

```sh
yarn create yap example-policy --type policy
```

_[`yarn create <starter-kit-package>`](https://yarnpkg.com/lang/en/docs/cli/create/) is available in Yarn 0.25+_

It will create a directory called `example-policy` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

### Project structure
```
example-policy
├── README.md
├── node_modules
├── package.json
├── .gitignore
└── src
    ├── index.ts
    └── index.test.ts
```

No configuration or complicated folder structures, only the files you need to build your policy.<br>
Once the installation is done, you can open your policy folder:

```sh
cd example-policy
```

### Your index.js
Right next to package.json should be index.ts, which is the entry point to your policy. This is where the Platform will look to understand how your policy will interact with Yap. Open it up in your editor of choice and let’s take a look!

```index.ts``` contains Class Typescript with methods:

| methods           | Description                                                               |
|------------------:|---------------------------------------------------------------------------|
| id                | Id of policy                                                              |
| name              | Name of policy                                                            |
| description       | Description of policy (2-3 lines recommended)                             |
| category          | Category of policy                                                        |
| scopes            | Which scopes your policies will be executed (inbound, outbound, on-error) |        
| validation        | Validation structure scope writted by user                                |
| action            | Execute when user apply your policy                                       |

#### Example
```typescript
import { Context, ExecutionContext, IPolicy, tryExecuteFieldValue } from "@youngapp/yap-core";

export default class ExamplePolicy implements IPolicy {

    public get id() {
        return 'example-policy';
    }
    
    public get name() {
        return 'Example policy';
    }
    
    public get category() {
        return 'security';
    }
    
    public get description() {
        return 'The example-policy policy to set the message body for incoming and outgoing requests.';
    }
    
    public get scopes() {
        return ['inbound', 'outbound', 'on-error'];
    }

    /**
     * example-policy policy
     * Use the example-policy policy to set the message body for incoming and outgoing requests.
     * To access the message body you can use the context.Request.Body property
     * or the context.Response.Body, depending on whether the policy is in the inbound or
     * outbound section.
     * @example
     * <example-policy>bJtrpFi1fO1JMCcwLx8uZyAg</example-policy>
     */
   public async apply(executionContext:ExecutionContext) {
        const { policyElement, context, scope } = executionContext;
        context.request.body = tryExecuteFieldValue(policyElement.elements[0].text, executionContext);
        return executionContext;
    }

    public validate(policyElement: any) {
        return true;
    }
}
```

### Commands

Inside the newly created project, you can run some built-in commands:

#### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

#### `npm run build` or `yarn build`

Builds the policy for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

Your policy is ready to be deployed.

#### `npm publish` or `yarn publish`
To share your code publicly in a user or Org namespace, you can publish public user-scoped or Org-scoped packages to the npm registry.

Your policy is ready for community.
