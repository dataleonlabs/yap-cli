import apiTest from '../../src/apitest/apiTest';
import assert from 'assert';
import Mocha from 'mocha';
import { stub } from 'sinon';
import global from '../../src/helpers/global';

describe("API test launcher", () => {
    it("Should take env variables of class and cases and run mocha test", () => {
        const setArgs = [
            "someClass",
            "someCases",
        ];
        const envStub = stub(process, 'argv').value(setArgs);
        const mochaAddFileStub = stub(Mocha.prototype, "addFile");
        const mochaRunStub = stub(Mocha.prototype, 'run');

        apiTest(setArgs);

        assert.equal(global.apiclass, setArgs[0]);
        assert.equal(global.testcases, setArgs[1]);

        assert(mochaRunStub.calledOnce);
        assert(mochaAddFileStub.calledOnce);

        mochaAddFileStub.restore();
        mochaRunStub.restore();
        envStub.restore();
    });

    it("Should take env variable of cases, defaul for class, and run mocha test", () => {

        const setArgs = [
            "someCases1",
        ];
        const envStub = stub(process, 'argv').value(setArgs);
        const mochaAddFileStub = stub(Mocha.prototype, "addFile");
        const mochaRunStub = stub(Mocha.prototype, 'run');

        apiTest(setArgs);

        assert.equal(global.apiclass, 'dist/src/index.js');
        assert.equal(global.testcases, setArgs[0]);

        assert(mochaRunStub.calledOnce);
        assert(mochaAddFileStub.calledOnce);

        mochaAddFileStub.restore();
        mochaRunStub.restore();
        envStub.restore();
    });
});