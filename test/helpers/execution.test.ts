import { deepEqual, equal, throws } from 'assert';
import { executeInString, propertiesExecutor } from '../../src/helpers/execution';

describe("Execution tool test", () => {
    it("Should replace string occurecies by using a context", () => {
        const string = "@(a) and @(b)";
        const context = { a: "cat", b: "dog" };
        const result = executeInString(string, context);
        equal(result, "cat and dog");
    });

    it("Should not replace string occurecies by using a context", () => {
        const string = "@(a) and @(b)";
        const context = { c: "cat", d: "dog" };
        throws(() => executeInString(string, context), "ReferenceError: a is not defined");
    });

    it("Properties executor should execute correctly", () => {
        const object = { a: "@(aVal)", b: "@(bVal)" };
        const context = { aVal: "cat", bVal: "dog" };
        const expected = { a: "cat", b: "dog" };
        deepEqual(propertiesExecutor(object, context), expected);
    });
});