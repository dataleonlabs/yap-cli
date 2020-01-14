# create-yap-connector
AWS's serverless Lambda functions open a world of possibilities for running on-demand, server-side code without having to run a dedicated server. However, managing service discovery, configuring API gateways, and coordinating deployments between your app and your serverless functions can quickly become overwhelming. This document will help you get started with Connector Functions on Serverless. 

API management is the process of creating and publishing web application programming interfaces (APIs), enforcing their usage policies, controlling access, nurturing subscriber communities, collecting and analyzing usage statistics, and reporting performance.

Connector provides the event and context parameters when the serverless function is invoked. You provide the callback parameter, which is optional, but recommended.

When you call a serverless function’s endpoint, the handler receives an event object similar to what you would receive from the AWS API Gateway:
```
{
    "path": "Path parameter",
    "httpMethod": "Incoming request's method name"
    "headers": {Incoming request headers}
    "queryStringParameters": {query string parameters }
    "body": "A JSON string of the request payload."
    "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
}
```

## Custom Connector

### Npm
#### Installing with NPX
npx is a tool intended to help round out the experience of using packages from the npm registry — the same way npm makes it super easy to install and manage dependencies hosted on the registry, npx makes it easy to use CLI tools and other executables hosted on the registry. It greatly simplifies a number of things that, until now, required a bit of ceremony to do with plain npm.

To get started, first make sure that your dev environment meets the requirements for running the the platform. Once you have the proper version of Node.js, install npx tool.

```bash
# install the CLI globally
npm install -g npx
```

If you've previously installed `create-yap-connector` globally via `npm install -g create-yap`, we recommend you uninstall the package using `npm uninstall -g create-yap` to ensure that npx always uses the latest version.

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_


```bash
# create a directory with the minimum required files
npx create-yap --type connector example-connector
```

### Yarn

```sh
yarn create yap --type connector example-connector
```

_[`yarn create <starter-kit-package>`](https://yarnpkg.com/lang/en/docs/cli/create/) is available in Yarn 0.25+_

It will create a directory called `example-connector` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

### Project structure
```
example-connector
├── README.md
├── node_modules
├── serverless.yml
├── package.json
├── .gitignore
└── src
    ├── index.ts
    └── index.test.ts
```

No configuration or complicated folder structures, only the files you need to build your connector.<br>
Once the installation is done, you can open your connector folder:

```sh
cd example-connector 
```

### Your index.js
Right next to package.json should be index.ts, which is the entry point to your connector. This is where the Platform will look to understand how your connector will interact with Yap. Open it up in your editor of choice and let’s take a look!


#### Example
```typescript
import { IConnection, IConnector, IField } from "@youngapp/yap-core";

export class ExampleConnector implements IConnector {

    private connection: IConnection;

    constructor(connection: IConnection = {}) {
        this.connection = connection;
    }

    /**
     * Simple action to apply reporting data aws lambda
     */
    public async reporting(fields:IField) {
        // Some manipulation with fields.data
        return true;
    }

    public test() {
        return true;
    }
}
```

### Using connector
```typescript

// My custom connector
const exampleConnector = new ExampleConnector();

app.post('/reporting', async (ctx: Context) => {
    ctx.body = await exampleConnector.reporting({ data: ctx.request.body });
})

export default app
```

### Commands

Inside the newly created project, you can run some built-in commands:

#### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

#### `npm run build` or `yarn build`

Builds the connector for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

Your connector is ready to be deployed.

#### `npm deploy` or `yarn deploy`
To share your code publicly in a user or Org namespace, you can publish public user-scoped or Org-scoped packages to the npm registry.

Your connector is ready for community.

