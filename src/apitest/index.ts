#!/usr/bin/env node
//This scipt will be launched for yap-api-test command

import Mocha from 'mocha';
import path from 'path';
import global from '../helpers/global';

const args = process.argv.slice(2);

/**
 * Script executor. It expects command line arguments: apiHandlerClass and testCasesDir
 * Please, refer to readme.md
 */
const apitest = async () => {
    const mocha = new Mocha();
    if(args.length > 1) {
        global.apiclass = args[0];
        global.testcases = args[1];
    } else {
        global.apiclass = 'dist/src/index.js';
        global.testcases = args[0];
    }
    mocha.addFile(
        path.join(__dirname, './testDefinition.test.js'),
    );

    mocha.run();
};

// tslint:disable-next-line: no-console
apitest().catch(console.log);