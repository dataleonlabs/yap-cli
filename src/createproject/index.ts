#!/usr/bin/env node
//This scipt will be launched for yap-create-project command
import createProject from './createProject';

const args = process.argv.slice(2);
// tslint:disable-next-line: no-console
createProject(args.length ? args[0] : undefined).catch(console.log);