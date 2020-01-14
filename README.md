# YAP command line interface

Command line tool for youngapp ecosystem

## Commands

### Test API

```npx -p @youngapp/yap-cli yap-api-test apiTestDefinitions/*.yml```
```npx -p @youngapp/yap-cli yap-api-test dist/src/index.js apiTestDefinitions/*.yml```

Runs yaml tests for your implemented api class
CLI Receives two arguments: 
* relative path to your implemented class (optional, default dist/src/index.js)
* relative path to yml test files with search pattern on a tail

Tests should run in mocha execution environment, and with default reporter so you can run it in your CI pipeline

Api class should implement handle method which confines to AWS lambda handler signature
You can read more about youngapp yml testing here https://manual.youngapp.co/community-edition/functional-testing