import assert from 'assert';
import rmrf from 'rimraf';
import { readFileSync } from 'fs';
import { join } from 'path';
import createProject from '../../src/createproject/createProject';

describe("Create app launcher", () => {

    it.skip("Should create project folder in default folder", async () => {
        const setArgs = [
            "",
            "",
        ];
        const oldArgv = process.argv;
        process.argv = setArgs;
        await createProject();
        const oldPackageJson = readFileSync(join(__dirname, '../../src/createproject/projectstructure/package.json')).toString();
        const newPackageJson = readFileSync(join(__dirname, '../../myYapApp/package.json')).toString();

        //just check if package.json persist
        //if copy was failed, we would not reach this assert
        assert.equal(oldPackageJson, newPackageJson);
        process.argv = oldArgv;
    });

    afterEach(async () => {
        const currentDir = process.cwd();
        rmrf.sync(`${currentDir}/myYapApp`);
    })
});