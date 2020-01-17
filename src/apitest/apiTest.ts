import Mocha from 'mocha';
import path from 'path';
import global from '../helpers/global';

/**
 * Applies api test to handler and to test cases, which described in a test dir
 * @param args [apiClassPath (default dist/src/handler.js), pathToTestFiles with wildcard]
 * @example ['./dist/src/handler.js', './testfiles/*.test.yml]
 */
export default function apiTest(args:string[]) {
    const mocha = new Mocha();
    if(args.length > 1) {
        global.apiclass = args[0];
        global.testcases = args[1];
    } else {
        global.apiclass = 'dist/api.js';
        global.testcases = args[0];
    }
    mocha.addFile(
        path.join(__dirname, './testDefinition.test.js'),
    );

    mocha.run();
}