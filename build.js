var path = require('path')
const { spawn } = require("child_process");
const build_list = ["prod", "dev"];
const arg = process.argv.slice(2);

if (arg.length == 0) {
    console.log("Build type arugent missing ! Usage : node build dev/prod")
    process.exit(1)
}
const buildType = arg[0];
if (buildType != "dev" || buildType != "prod") {
    console.log("invalid build type ! supported builds are : dev,prod");
    process.exit(1);
}
console.log("Initializing application build...");
console.log("Going to run npm on angular application directory install..")

const npm_install = spawn("npm install");

npm_install.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
});

npm_install.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
});

npm_install.on('error', (error) => {
    console.log(`error: ${error.message}`);
});

npm_install.on("close", code => {
    console.log(`child process exited with code ${code}`);
    if (code == 0) {
        console.log(" npm install completed successfully.");
        const ng_build = spawn(`ng build --configuration="${buildType}"`);
        ng_build.stdout.on("data", data => {
            console.log(`stdout: ${data}`);
        });

        ng_build.stderr.on("data", data => {
            console.log(`stderr: ${data}`);
        });

        ng_build.on('error', (error) => {
            console.log(`error: ${error.message}`);
        });
        ng_build.on("close", code => {
            if (code == 0) {
                console.log(`Angular application build success for type ${buildType}`);
                const server_npm_install = spawn(`cd server && npm install`);
            } else {
                console.log("build failed with error please check console log.");
            }
        });
    } else {
        console.log("build failed with error please check console log.");
    }
});