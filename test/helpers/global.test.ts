import global1 from '../../src/helpers/global';
import global2 from '../../src/helpers/global';
import {deepEqual } from 'assert';

describe("Global container test", () => {
    it("Should save data to global container", () => {
        const variableKey = "k89";
        const variableValue = {a: 1};
        global1[variableKey] = variableValue;
        deepEqual(global2[variableKey], variableValue)
    });
});