<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="./desktop-solid.png" alt="Project logo"></a>
</p>

<h3 align="center"> <b>VM Assignment Portal</b> </h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/soumyaprasadrana/VMAssignmentPortal.svg)](https://github.com/soumyaprasadrana/VMAssignmentPortal/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/soumyaprasadrana/VMAssignmentPortal.svg)](https://github.com/soumyaprasadrana/VMAssignmentPortal/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> In organizational level we use large no of VMs for our day today work, this portal will help to keep a track on usage of each and every vm.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)
- [License](#license)

## 🧐 About <a name = "about"></a>

VM Assignment Portal is created to easily manage all VM related activities within a team. Entries of VMs can be created in this portal and then various operations like Assign, Release etc. can be performed.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

- Node 14 +
- Angular 12+
- Docker & Docker Compose ( Production SaaS )
- VM Assignment Portal API ( Check Readme for more details )

## Installing

Check Pre-requisites , VM Assignment portal Server must be running before using this project

### Dev Enviroment

```
git clone https://github.com/soumyaprasadrana/VMAssignmentPortal.git
cd {repositoryPath}
npm install
cd server
npm install
```

Open project in visual studio code and open two terminals run

1.  ```
    ng build --configuration="development" --watch
    ```
2.  ```
    cd server
    node app.js
    ```

### Prod Enviroment

```
git clone https://github.com/soumyaprasadrana/VMAssignmentPortal.git
cd {repositoryPath}
npm run build-prod
cd build/server
set APIBASE="http://localhost:8080/VMMangementPortalAPI
node app
```

### Prod Enviroment ( SaaS - Docker )

Pre-requisite- Docker Compose

```
git clone https://github.com/soumyaprasadrana/VMAssignmentPortal.git
cd {repositoryPath}
npm run build-prod
cd build\docker\saas
cd portal-api
docker build -t portal_api:1.0 .
cd ..
cd portal-ui
docker build -t portal_ui:1.0 .
cd ..
cd portal-db
docker build -t portal_db:1.0 .
cd ..
docker-compose up
```

Access the application by http://localhost:3000/

## ⛏️ Built Using <a name = "built_using"></a>

- [Express](https://expressjs.com/) - Server Framework
- [Angular](https://angular.io/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@soumya](https://github.com/soumyaprasadrana) - Architecture & Devlopment

See also the list of [contributors](https://github.com/soumyaprasadrana/VMAssignmentPortal/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References

## License <a name = "license"></a>

MIT License

Copyright (c) 2022 soumya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
