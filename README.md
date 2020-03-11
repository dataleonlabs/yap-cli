# YAP command line interface
Command line tool for youngapp ecosystem.

## Introduction
AWS's serverless Lambda functions open a world of possibilities for running on-demand, server-side code without having to run a dedicated server. However, managing service discovery, configuring API gateways, and coordinating deployments between your app and your serverless functions can quickly become overwhelming. This document will help you get started with Connector Functions on Serverless.

### Create project
```npx -p @youngapp/yap-cli create my-api```

Creates project template for your serverless function, which will use Yap core as method router
CLI Receives one argument
* folder name for your project. Default: my-api


### Testing specifications
With Yap you're able to predefine a very well structured test YAML file once, and every time you make any changes to your API you can test it with just one command in your terminal.

```npx -p @youngapp/yap-cli test specs/*.yml```

```npx -p @youngapp/yap-cli test dist/src/index.js specs/*.yml```

Runs yaml tests for your implemented api class
CLI Receives two arguments: 
* relative path to your implemented class (optional, default dist/src/index.js)
* relative path to yml test files with search pattern on a tail

Tests should run in mocha execution environment, and with default reporter so you can run it in your CI pipeline

Api class should implement handle method which confines to AWS lambda handler signature
You can read more about youngapp yml testing here https://manual.youngapp.co/community-edition/functional-testing

### Connectors
API management is the process of creating and publishing web application programming interfaces (APIs), enforcing their usage policies, controlling access, nurturing subscriber communities, collecting and analyzing usage statistics, and reporting performance.

#### Custom Connector
Follow instructions to create a [custom connector](https://manual.youngapp.co/community-edition/custom/how-do-i-create-a-connector)

### Policy
Policies are applied inside the gateway which sits between the API consumer and the managed API. The gateway receives all requests and usually forwards them unaltered to the underlying API. However a policy can apply changes to both the inbound request and outbound response.

#### Custom Policies
Follow instructions to create a [custom policy](https://manual.youngapp.co/community-edition/custom/how-to-create-a-policy)

## Opening issues
If you encounter a bug with YAP, we would appreciate if you inform us about it. 
Before opening a new issue, please go through [existing issues](https://github.com/youngapp/yap-cli/issues)
to find the solution right away if your problem was solved before. 

Attach the following details if appropriate: 
- SDK, Node.js
- Environment and OS
- Stack trace
- Reduced repro case

The GitHub issues are intended for bug reports and feature requests. 
For quick help and questions on using the Yap SDK for JavaScript, please use the resources listed within [Getting Help](https://github.com/youngapp/yap-cli#getting-help) section. The time of our support experts is rushingly flying but even so, they would like to help you in time, and therefore, will appreciate your help in applying for support reasonably by providing full details and excluding duplicated issues.

## Contribute
Yap is the open source and we love contributions! If you have an idea for a great improvement or spy an issue you’re keen to fix, you can fork us on [GitHub](https://github.com/youngapp/create-yap).

No contribution is too small – we encourage you to provide feedback and [report issues](https://github.com/youngapp/yap-cli/issues).

## License
This SDK is distributed under the GNU General Public License v3.0. 
See [LICENSE.txt](LICENSE.txt) for more information.
