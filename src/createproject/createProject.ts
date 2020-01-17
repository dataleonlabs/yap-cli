import { exec } from 'child_process';
import { mkdir } from 'fs';
import { last } from 'lodash';
import { ncp } from 'ncp';
import { join } from 'path';
import { promisify } from 'util';

const commpandPrompt = `curl -i \
-H "Accept: application/json" \
-H "X-HTTP-Method-Override: PUT" \
-X POST -d '{ "query": "query fields{ fields { id, data } }" }' \
http://localhost:3000`;

const createProject = async (projectName:string = "myYapApp") => {
    const args = process.argv.slice(2);
    const sourcedir = join(__dirname, './projectstructure');
    const currentDir = `${process.cwd()}/${projectName}`;
    await promisify(mkdir)(currentDir);
    // tslint:disable-next-line: no-console
    console.log('copying files to ', currentDir);
    await promisify(ncp)(sourcedir, currentDir);
    try {
        // tslint:disable-next-line: no-console
        console.log('running npm i');
        await promisify(exec)('npm i', {cwd: currentDir});
        // tslint:disable-next-line: no-console
        console.log("App ready in folder", `./${projectName}`);
    } catch (e) {
        // tslint:disable-next-line: no-console
        console.log(e);
        // tslint:disable-next-line: no-console
        console.log('npm i failed. However, you can try to run it manually');
    }
    // tslint:disable-next-line: no-console
    console.log('You can run npm run build && npm run local to start your lambda!');
        // tslint:disable-next-line: no-console
    console.log("You can query your server with a curl");
    // tslint:disable-next-line: no-console
    console.log(commpandPrompt);
};

export default createProject;