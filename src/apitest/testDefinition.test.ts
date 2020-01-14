//File to be added to mocha as test file for yap-api-test command

import { deepEqual } from 'assert';
import faker from 'faker';
import fs from 'fs';
import { sync } from 'glob';
import yaml from 'js-yaml';
import { set } from 'lodash';
import { basename, dirname, resolve } from 'path';
import { executeInString, propertiesExecutor } from '../helpers/execution';
import global from '../helpers/global';
import { getTestAwsContext, getTestRequest } from '../helpers/request';

const { apiclass, testcases } = global;
if (!apiclass || !testcases) {
    throw new Error("apiclass && testcases env variables should be set");
} else {
    const { testApi } = require(resolve(process.cwd(), apiclass));
    const testCasesFullPath = resolve(process.cwd(), testcases);
    const testDir = dirname(testCasesFullPath);
    const testPattern = basename(testCasesFullPath) || '*.yml';
    const ymlFiles = sync(testPattern, { cwd: testDir });
    for (const file of ymlFiles) {
        const testFile = yaml.safeLoad(fs.readFileSync(resolve(testDir, file), 'utf8'));
        describe(testFile.info.title, () => {
            for (const [, value] of Object.entries(testFile.scenarios)) {
                const scenarioValue = value as any;
                const testCaller = scenarioValue.only === true ? it.only : it;
                testCaller(scenarioValue.describe, async () => {
                    const apiInstance = new testApi();
                    const variables = scenarioValue.variables;
                    const scenarioRequest = scenarioValue.request;
                    propertiesExecutor(variables, { faker });
                    const testDataContext = { faker, variables };
                    propertiesExecutor(scenarioRequest, testDataContext);
                    const request = { ...getTestRequest(), ...scenarioRequest };
                    const response = await apiInstance.handle(request, getTestAwsContext());
                    propertiesExecutor(response, testDataContext);
                    set(testDataContext, 'response', response);
                    for (const assert of Object.values(scenarioValue.tests)) {
                        deepEqual(
                            executeInString((assert as any[])[0].expect, testDataContext),
                            executeInString((assert as any[])[1].toEqual, testDataContext),
                        );
                    }
                });
            }
        });
    }
}
