// Copyright (c) 2022 soumya
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:16:40
 * @modify date 2022-02-26 18:16:40
 * @desc Helps to build the application
 */
const { spawn } = require("child_process");
const { exec } = require("child_process");
const arg = process.argv.slice(2);
const fs = require('fs');


if (arg.length == 0) {
    console.log("Build type arugent missing ! Usage : node build dev/prod")
    process.exit(1)
}
var buildType = arg[0];
if (buildType != "dev" && buildType != "prod") {
    console.log("invalid build type ! supported builds are : dev,prod");
    process.exit(1);
}
if (buildType == "dev") {
    buildType = "development";
}
if (buildType == "prod") {
    buildType = "production";
}
var adm_zip;
var del;
console.log("Initializing application build...");
adm_zip = require('adm-zip');
del = require('del');

async function extractArchive(filepath, output_dir) {
    try {
        const zip = new adm_zip(filepath);
        const outputDir = output_dir;
        zip.extractAllTo(outputDir);

        console.log(`Extracted to "${outputDir}" successfully`);
        return true;
    } catch (e) {
        console.log(`Something went wrong. ${e}`);
        return false;
    }
}
async function createProdZipArchive() {
    try {
        const zip = new adm_zip();
        const outputFile = "./build/VMAssignmentPortal.zip";
        zip.addLocalFolder("./dist", "./dist");
        zip.addLocalFolder("./server", "./server");
        console.log("Writing production zip...")
        zip.writeZip(outputFile);
        console.log(`Created ${outputFile} successfully`);
        console.log("Creating Dockerfile ....");
        createSaaSFiles();
        return true;
    } catch (e) {
        console.log(`Something went wrong. ${e}`);
        return false;
    }
}

async function copySaaSFiles() {
    console.log("Starting resource copy to saas ...");
    if (fs.existsSync('./build/docker/saas/portal-ui')) {
        if (!fs.existsSync('./build/docker/saas/portal-ui/files')) {
            fs.mkdirSync('./build/docker/saas/portal-ui/files', { recursive: true });
        }
        fs.copyFile('./build/VMAssignmentPortal.zip', './build/docker/saas/portal-ui/files/VMAssignmentPortal.zip', (err) => {
            if (err) {
                console.log(err);
                console.log("Unable to copy resorce: VMAssignmentPortal.zip to saas directory.")
            } else {
                console.log("Rousource: VMAssignmentPortal.zip copied to saas directory.");
                console.log("Deleting old archive...");
                (async() => {
                    try {
                        await del('./build/VMAssignmentPortal.zip');

                        console.log(`/build/VMAssignmentPortal.zip is deleted!`);

                    } catch (err) {
                        console.error(`Error while deleting build.`);
                    }
                })();
            }
        });

    }
    if (fs.existsSync('./build/docker/saas/portal-api')) {
        if (!fs.existsSync('./build/docker/saas/portal-api/files')) {
            fs.mkdirSync('./build/docker/saas/portal-api/files', { recursive: true });
        }
        fs.copyFile('./VMManagementPortalAPI.war', './build/docker/saas/portal-api/files/VMManagementPortalAPI.war', (err) => {
            if (err) {
                console.log(err);
                console.log("Unable to copy VMManagementPortalAPI.war to saas directory.")
            } else {
                console.log("Rousource: VMManagementPortalAPI.war copied to saas directory.");

            }
        });
        fs.copyFile('./wait-for-it.sh', './build/docker/saas/portal-api/files/wait-for-it.sh', (err) => {
            if (err) {
                console.log(err);
                console.log("Unable to copy wait-for-it.sh to saas directory.")
            } else {
                console.log("Rousource: wait-for-it.sh copied to saas directory.");

            }
        });

    }

    if (fs.existsSync('./build/docker/saas/portal-db')) {
        if (!fs.existsSync('./build/docker/saas/portal-db/files')) {
            fs.mkdirSync('./build/docker/saas/portal-db/files', { recursive: true });
        }
        fs.copyFile('./portaldb.sql', './build/docker/saas/portal-db/files/portaldb.sql', (err) => {
            if (err) {
                console.log(err);
                console.log("Unable to copy resorce: ./portaldb.sql to docker directory.")
            } else {
                console.log("Rousource: ./portaldb.sql copied to saas directory.");

            }
        });

    }

}
async function createSaaSFiles() {
    if (!fs.existsSync('./build/docker/saas/portal-ui')) {
        fs.mkdirSync('./build/docker/saas/portal-ui', { recursive: true });
    }
    if (!fs.existsSync('./build/docker/saas/portal-db')) {
        fs.mkdirSync('./build/docker/saas/portal-db', { recursive: true });
    }
    if (!fs.existsSync('./build/docker/saas/portal-api')) {
        fs.mkdirSync('./build/docker/saas/portal-api', { recursive: true });
    }
    const docker_file_data = 'FROM node:14' + '\n' +
        'WORKDIR /app' + '\n' +
        'COPY files/VMAssignmentPortal.zip /app/' + '\n' +
        'RUN unzip VMAssignmentPortal.zip' + '\n' +
        'WORKDIR  /app/server' + '\n' +
        'EXPOSE 3000' + '\n' +
        'ENTRYPOINT ["node","/app/server/app.js"]';
    const portal_db_docker_file_data = 'FROM mysql:5.7 ' + '\n' +
        'ADD files/portaldb.sql /docker-entrypoint-initdb.d/ ' + '\n' +
        'ENV MYSQL_DATABASE=vmportal02 ' + '\n' +
        'ENV MYSQL_ROOT_PASSWORD=DBfull@cess123 ' + '\n' +
        'EXPOSE 3306 ' + '\n' +
        'CMD [ "--max_connections=1000000" ]';
    const portal_api_docker_file_data = 'FROM tomcat:9.0 ' + '\n' +
        'USER root ' + '\n' +
        'ENV JAVA_OPTS="-Xmx1024m -Xms1024m " ' + '\n' +
        'COPY files/VMManagementPortalAPI.war /usr/local/tomcat/webapps/ ' + '\n' +
        'COPY files/wait-for-it.sh /usr/local/tomcat/bin/ ';
    const docker_compose = 'version: \'3.7\'\n\nservices:\n  ui:\n    image: portal_ui:1.0\n    ports:\n      - \"3000:3000\"\n    environment:\n      LOG_LEVEL: \'info\'\n      APIBASE: http:\/\/api:8080\/VMManagementPortalAPI\n    networks:\n      - portal_net\n    volumes:\n      - logs:\/app\/server\/logs\n    depends_on:\n        - \"api\"\n\n  api:\n    image: portal_api:1.0\n    ports:\n      - \"8080\"\n    environment:\n      JAVA_OPTS : -Xmx1024m -Xms1024m \n      DB_NAME : vmportal02\n      DB_USER : alex\n      DB_PASSWORD : Full@ccess123\n      DB_SERVER:  db\n      DB_USE_SSL: false\n    networks:\n      - portal_net\n    depends_on:\n        - \"db\"\n    command: [\"wait-for-it.sh\", \"db:3306\",\"-t\",\"300\", \"--\", \"catalina.sh\", \"run\"]\n        \n  db:\n    image: portal_db:1.0\n    ports:\n        - \"3306\"\n    networks:\n        - portal_net\n    volumes:\n        - .\/data\/db:\/var\/lib\/mysql\nnetworks:\n  portal_net:\n    driver: bridge\n\nvolumes:\n  logs:\n  ';
    createFile('./build/docker/saas/portal-ui', 'Dockerfile', docker_file_data);
    createFile('./build/docker/saas/portal-db', 'Dockerfile', portal_db_docker_file_data);
    createFile('./build/docker/saas/portal-api', 'Dockerfile', portal_api_docker_file_data);
    createFile('./build/docker/saas', 'docker-compose.yml', docker_compose);
}
async function createFile(dir, file, data) {
    const fsPromises = fs.promises;
    console.log("Recieved data for file writtting : ", data);
    (async() => {
        await fsPromises.writeFile(dir + '/' + file, data).then((res) => {
            if (res) {
                console.log(`Error occurred while writing ${file} ...`, res);
            }
            console.log(`${file} write completed.`);
        }).catch((err) => {
            console.log(`${file} write promise catch...`, err);
        });

    })();
}
console.log("Cleaning build directory...");
if (fs.existsSync('./build')) {

    (async() => {
        try {
            await del('./build');

            console.log(`build is deleted!`);
            start_build();
        } catch (err) {
            console.error(`Error while deleting build.`);
        }
    })();
} else {

    try {
        start_build();
    } catch (e) { console.log(e); }
}
async function start_build() {
    const npm_install = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ["install","--force"], {
        cwd: process.cwd(),
        stdio: 'inherit'
    });


    npm_install.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    npm_install.on("close", code => {
        console.log(`child process exited with code ${code}`);
        if (code == 0) {
            console.log(" npm install completed successfully.");
            const ng_build = spawn(/^win/.test(process.platform) ? 'ng.cmd' : 'ng', ["build", `--configuration=${buildType}`], {
                cwd: process.cwd(),
                stdio: "inherit"
            });

            ng_build.on('error', (error) => {
                console.log(`error: ${error.message}`);
            });
            ng_build.on("close", (code, res) => {
                if (code == 0) {
                    console.log(`Angular application build success for type ${buildType}`);
                    const server_npm_install = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ["install"], {
                        cwd: process.cwd() + '/server',
                        stdio: "inherit"
                    });
                    console.log('runnging npm install for express server...');
                    server_npm_install.on('error', (error) => {
                        console.log(`error: ${error.message}`);
                    });

                    server_npm_install.on("close", code => {
                        if (code == 0) {
                            console.log("Extracting single page applications...");
                            if (extractArchive('./spa.zip', './server/')) {
                                if (buildType == "production") {
                                    if (!fs.existsSync('./build')) {
                                        fs.mkdirSync('./build', { recursive: true });
                                    }
                                    if (createProdZipArchive()) {
                                        copySaaSFiles();
                                        console.log("Extracting build resources ...");
                                        if (extractArchive('./build/VMAssignmentPortal.zip', './build/')) {
                                            console.log("Remving old resources...");
                                            (async() => {

                                                try {

                                                    await del('./dist');

                                                    console.log('dist is deleted!');

                                                } catch (err) {
                                                    console.error(`Error while deleting build.`);
                                                }
                                            })();

                                            console.log("Old resources cleaned.")
                                        }
                                        console.log("Build Success!");

                                    } else {
                                        console.log("Build Suceess with error.");
                                        console.log("Unable o craete production zip");

                                    }
                                } else {
                                    console.log("Build Success!");

                                }
                            } else {
                                console.log("Unable to extract Single Page Apps! Try extracting manually isinde server folder!");
                                process.exit(1);
                            }

                        } else {
                            console.log("build failed with error please check console log.");
                        }
                    });
                } else {
                    console.log(`build failed with error please check console log.Exit Code:${code},error:${res}`);
                }
            });
        } else {
            console.log("build failed with error please check console log.");
        }
    });
}