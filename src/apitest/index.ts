#!/usr/bin/env node
//This scipt will be launched for yap-api-test command

import apiTest from './apiTest';

const args = process.argv.slice(2);

apiTest(args);