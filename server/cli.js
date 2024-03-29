const arg = process.argv.slice(2);
const fs = require("fs");

const fn = "[PORTAL-CLI]";

if (arg.length == 0) {
  console.log(
    fn +
      ` 
        VM PORTAL APP CLI:
        USAGES :
            --add-function functionName
    `
  );
  process.exit(1);
}
var command = arg[0];
if (command != "--add-function") {
  console.log(
    fn +
      "- Invalid command " +
      `
    VM PORTAL APP CLI:
        USAGES :
            --add-function functionName
    `
  );
  process.exit(1);
}
var commandArg = arg[1];
if (command == "--add-function" && !commandArg) {
  console.log(
    fn +
      "- Invalid function name " +
      `
    VM PORTAL APP CLI:
        USAGES :
            --add-function functionName
    `
  );
  process.exit(1);
}
var commandArg2 = arg[2];
async function createFile(dir, file, data) {
  const fsPromises = fs.promises;
  //console.log("Recieved data for file writtting : ", data);
  console.log("Going write data for file ", file);
  (async () => {
    await fsPromises
      .writeFile(dir + "/" + file, data)
      .then((res) => {
        if (res) {
          console.log(`Error occurred while writing ${file} ...`, res);
        }
        console.log(`${file} write completed.`);
      })
      .catch((err) => {
        console.log(`${file} write promise catch...`, err);
      });
  })();
}

try {
  if (!fs.existsSync("./api/functions/" + commandArg)) {
    fs.mkdirSync("./api/functions/" + commandArg, { recursive: true });
  }
  let client_file_data = ``;
  if (!commandArg2) {
    client_file_data = `module.exports = {
  client: (parent, grid, row, utils) => {
    return {
      //All data members you want to use in template script goes here
      //Enable utils to be accessible inside event bindings
      utils: utils,
      //Custom Function supports angular js , uncomment below properties to enable angular js for your custom function 
      //Angular source code should be written inside angularScript; and template's can be defined inside template.js
      //If you want to include any additional libraries you can pass path for the files inside angularJSDependacies list

      /** applicationType: 'angularjs',
          angularJSDependacies: [],
          angularScript: (context, utils) => {
                var app = angular.module("customFunApp", []);
                app.controller("customController", function($scope) {
                $scope.message = "Hello from Custom Function Controller";
                });
      },
      //DO NOT REMOVE BELOW METHOD; IT IS MANDATORY TO BOOTSTRAP YOUR ANGULARJS APPLICATION IF YOU ARE USING DEPENDANCY LIBRRARIES
      //YOU CAN ALWAYS CHANGE BOOTSTRAP SPECIFICATION TO INCLUDE OTHER DEPENDACIES
      angularBootstrapScript: (context, utils) => {
        angular.bootstrap($("#angular-shell"), [ "app" ]);
      },
      */
      // eventBindings : helps to bind event to your template's html dom elements
      /**
            * You can add dom element binding like below; add a property to eventBindings object with the selector
            * You can access client script's return data members
            * domElementSelector : {type:'eventType',event : (context,event)=>{}}
            *
            * 
            * Example you have defined a button in template script with id alertButtton 
            * Build event for this element as below :
            * eventBindings : {
            *   'alertButton' : {
            *                       type: 'click',
            *                       event: (context,event) => { alert(1); }
            *                   }
            * }
            * 
            */
      eventBindings: {},
      /**
             * Life Cycle Event; It will work as a script tag after template is attached to DOM this event will be fired
             * 
             * @param {*} context refers to this > return object from client script
             * @param {*} utils available utils object 
             */
      templateScript: (context, utils) => {
        $(document).ready(function() {
          var btn = $("#backToTop");
          $(
            "#angular-shell"
          )[0].parentElement.parentElement.parentElement.addEventListener(
            "scroll",
            function() {
              if (
                $("#angular-shell")[0].parentElement.parentElement.parentElement
                  .scrollTop > 300
              ) {
                btn.addClass("show");
              } else {
                btn.removeClass("show");
              }
            }
          );
          btn.on("click", function(e) {
            e.preventDefault();
            $("#angular-shell").get(0).scrollIntoView({ behavior: "smooth" });
          });
          $("#templateScriptABBR").on("click", function() {
            $("#templateScriptSection")
              .get(0)
              .scrollIntoView({ behavior: "smooth" });
          });
          $("#clientScriptABBR").on("click", function() {
            $("#clientScriptSection")
              .get(0)
              .scrollIntoView({ behavior: "smooth" });
          });
          $("#serverScriptABBR").on("click", function() {
            $("#serverScriptSection")
              .get(0)
              .scrollIntoView({ behavior: "smooth" });
          });
          $("#example1ABBR").on("click", function() {
            $("#exampleScriptSection")
              .get(0)
              .scrollIntoView({ behavior: "smooth" });
          });

          $("#example2ABBR").on("click", function() {
            $("#example2").get(0).scrollIntoView({ behavior: "smooth" });
          });
        });
      },
      /**
             * Life Cycle Event; It will work as a script tag before template is attached to DOM this event will be fired
             * 
             * @param {*} context refers to this > return object from client script
             * @param {*} utils available utils object 
             */
      templateScriptBefore: (context, utils) => {},
    };
  },
};
`;
  } else if (commandArg2 == "--angular-js") {
    client_file_data = `module.exports = {
  client: (parent, grid, row, utils) => {
    return {
      //All data members you want to use in template script goes here
      //Enable utils to be accessible inside event bindings
      utils: utils,
      //Custom Function supports angular js , uncomment below properties to enable angular js for your custom function 
      //Angular source code should be written inside angularScript; and template's can be defined inside template.js
      //If you want to include any additional libraries you can pass path for the files inside angularJSDependacies list
      // Limitation : You can use angular js route as it is already configured with ANgular's route feature.
      applicationType: 'angularjs',
      //angularJSDependacies: [],
      angularScript: (context, utils) => {
         var app = angular.module("customFunApp", []);
         app.controller("customController", function($scope) {
          $scope.message = "Awsome!, You have successfully created a custom function with Angular JS.";
           $(document).ready(function() {
          var btn = $("#backToTop");
          $(
            "#angular-shell"
          )[0].parentElement.parentElement.parentElement.addEventListener(
            "scroll",
            function() {
              if (
                $("#angular-shell")[0].parentElement.parentElement.parentElement
                  .scrollTop > 300
              ) {
                btn.addClass("show");
              } else {
                btn.removeClass("show");
              }
            }
          );
          btn.on("click", function(e) {
            e.preventDefault();
            $("#angular-shell").get(0).scrollIntoView({ behavior: "smooth" });
          });
          $("#templateScriptABBR").on("click", function() {
            $("#templateScriptSection")
              .get(0)
              .scrollIntoView({ behavior: "smooth" });
          });
          $("#clientScriptABBR").on("click", function() {
            $("#clientScriptSection")
              .get(0)
              .scrollIntoView({ behavior: "smooth" });
          });
          $("#serverScriptABBR").on("click", function() {
            $("#serverScriptSection")
              .get(0)
              .scrollIntoView({ behavior: "smooth" });
          });
          $("#example1ABBR").on("click", function() {
            $("#exampleScriptSection")
              .get(0)
              .scrollIntoView({ behavior: "smooth" });
          });

          $("#example2ABBR").on("click", function() {
            $("#example2").get(0).scrollIntoView({ behavior: "smooth" });
          });
        });
        });
      },
      //DO NOT REMOVE BELOW METHOD; IT IS MANDATORY TO BOOTSTRAP YOUR ANGULARJS APPLICATION IF YOU ARE USING DEPENDANCY LIBRRARIES
      //YOU CAN ALWAYS CHANGE BOOTSTRAP SPECIFICATION TO INCLUDE OTHER DEPENDACIES
      angularBootstrapScript: (context, utils) => {
        angular.bootstrap($("#angular-shell"), [ "customFunApp" ]);
      },
      // eventBindings : helps to bind event to your template's html dom elements
      /**
            * You can add dom element binding like below; add a property to eventBindings object with the selector
            * You can access client script's return data members
            * domElementSelector : {type:'eventType',event : (context,event)=>{}}
            *
            * 
            * Example you have defined a button in template script with id alertButtton 
            * Build event for this element as below :
            * eventBindings : {
            *   'alertButton' : {
            *                       type: 'click',
            *                       event: (context,event) => { alert(1); }
            *                   }
            * }
            * 
            */
      eventBindings: {},
      /**
             * Life Cycle Event; It will work as a script tag after template is attached to DOM this event will be fired
             * 
             * @param {*} context refers to this > return object from client script
             * @param {*} utils available utils object 
             */
      templateScript: (context, utils) => {},
      /**
             * Life Cycle Event; It will work as a script tag before template is attached to DOM this event will be fired
             * 
             * @param {*} context refers to this > return object from client script
             * @param {*} utils available utils object 
             */
      templateScriptBefore: (context, utils) => {},
    };
  },
};
`;
  } else if (commandArg2 == "--default-template") {
    client_file_data = `module.exports = {
  client: (parent, grid, row, utils) => {
    return {
      //All data members you want to use in template script goes here
      //Enable utils to be accessible inside event bindings
      utils: utils,
      //Custom Function supports angular js , uncomment below properties to enable angular js for your custom function 
      //Angular source code should be written inside angularScript; and template's can be defined inside template.js
      //If you want to include any additional libraries you can pass path for the files inside angularJSDependacies list
      //Limitation : You can use angular js route as it is already configured with ANgular's route feature.
      /*applicationType: 'angularjs',
      angularJSDependacies: [],
      angularScript: (context, utils) => {},
      //DO NOT REMOVE BELOW METHOD; IT IS MANDATORY TO BOOTSTRAP YOUR ANGULARJS APPLICATION IF YOU ARE USING DEPENDANCY LIBRRARIES
      //YOU CAN ALWAYS CHANGE BOOTSTRAP SPECIFICATION TO INCLUDE OTHER DEPENDACIES
      //CHANGE ANGULAR JS MODULE NAME BEFORE USING IT
      angularBootstrapScript: (context, utils) => {
        angular.bootstrap($("#angular-shell"), [ "app" ]);
      },*/
      // eventBindings : helps to bind event to your template's html dom elements
      /**
            * You can add dom element binding like below; add a property to eventBindings object with the selector
            * You can access client script's return data members
            * domElementSelector : {type:'eventType',event : (context,event)=>{}}
            *
            * 
            * Example you have defined a button in template script with id alertButtton 
            * Build event for this element as below :
            * eventBindings : {
            *   'alertButton' : {
            *                       type: 'click',
            *                       event: (context,event) => { alert(1); }
            *                   }
            * }
            * 
            */
      eventBindings: {},
      /**
             * Life Cycle Event; It will work as a script tag after template is attached to DOM this event will be fired
             * 
             * @param {*} context refers to this > return object from client script
             * @param {*} utils available utils object 
             */
      templateScript: (context, utils) => {},
      /**
             * Life Cycle Event; It will work as a script tag before template is attached to DOM this event will be fired
             * 
             * @param {*} context refers to this > return object from client script
             * @param {*} utils available utils object 
             */
      templateScriptBefore: (context, utils) => {},
    };
  },
};
`;
  } else {
    console.log(
      fn +
        "- Invalid tamplate name " +
        `
    VM PORTAL APP CLI:
        USAGES :
            --add-function functionName --angular-js
    `
    );
    process.exit(1);
  }

  let template_js_data = "";
  if (!commandArg2 || commandArg2 == "--angular-js") {
    template_js_data =
      "module.exports = {" +
      "template: (context, grid, row) => {" +
      "let domContent = `  <style>" +
      `.bg-white{
background-color:#fff;
}
.bg-mui-primary{
background-color:var(--mui-btn-primary-background-color);
}
.bg-mui-secondary{
background-color:var(--mui-btn-secondary-background-color);
}
.portal-text{
color : var(--mui-btn-primary-text-color) ;
}
.portal-text-secondary{
color : var(--mui-btn-secondary-text-color) ;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
.rotate {
  animation: rotation 2s infinite linear;
}
.hide {
display:none !important;
}
.height-max-content{
height: max-content !important;
}
.border-radius-8{
border-radius:8px;
}
.code-color{
color: #e83e8c !important;
}
.back-to-top {
    position: fixed;
    bottom: -40px;
    right: 40px;
    display: block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    background: var(--mui-btn-primary-background-color-hover);
    color: #fff;
    text-align: center;
    text-decoration: none;
    border-radius: 50%;
    opacity: 0;
    -webkit-transform: scale(0.3);
    -ms-transform: scale(0.3);
    transform: scale(0.3);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 9;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}
.back-to-top:focus {
    color: #fff;
}
.back-to-top.show {
    bottom: 40px;
    right: 40px;
    opacity: 1;
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
}
.back-to-top.show:hover {
    color: #fff;
    bottom: 30px;
    opacity: 1;
}
.arrow {
    background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHN0eWxlPi5zdDB7ZmlsbDojZmZmfTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTMxOS4xIDIxN2MyMC4yIDIwLjIgMTkuOSA1My4yLS42IDczLjdzLTUzLjUgMjAuOC03My43LjZsLTE5MC0xOTBjLTIwLjEtMjAuMi0xOS44LTUzLjIuNy03My43UzEwOSA2LjggMTI5LjEgMjdsMTkwIDE5MHoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzE5LjEgMjkwLjVjMjAuMi0yMC4yIDE5LjktNTMuMi0uNi03My43cy01My41LTIwLjgtNzMuNy0uNmwtMTkwIDE5MGMtMjAuMiAyMC4yLTE5LjkgNTMuMi42IDczLjdzNTMuNSAyMC44IDczLjcuNmwxOTAtMTkweiIvPjwvc3ZnPg==);
    position: absolute; width: 12px; height: 12px; background-size: contain;
    transform: rotate(-90deg);
    top: 30%;
    left: 40%;
}
.arrow:nth-child(2){
    top: 42%;
}

@keyframes bounceAlpha {
    0% {opacity: 1; transform: rotate(-90deg) translateX(0px) scale(1);}
    25%{opacity: 0; transform: rotate(-90deg) translateX(10px) scale(0.9);}
    26%{opacity: 0; transform: rotate(-90deg) translateX(-10px) scale(0.9);}
    55% {opacity: 1; transform: rotate(-90deg) translateX(0px) scale(1);}
}

.back-to-top:hover .arrow{
    animation-name: bounceAlpha;
    animation-duration:1.4s;
    animation-iteration-count:infinite;
    animation-timing-function:linear;
}
.back-to-top:hover .arrow:nth-child(2){
    animation-name: bounceAlpha;
    animation-duration:1.4s;
    animation-delay:0.2s;
    animation-iteration-count:infinite;
    animation-timing-function:linear;
}

@media only screen and (max-width: 575px) {
    .back-to-top {
        width: 40px;
        height: 40px;
        line-height: 40px;
    }
    .back-to-top.show {
        bottom: 10px;
        right: 10px;
    }
    .back-to-top.show:hover {
        bottom: 10px;
    }
    .arrow {
        top: 27%;
        left: 37%;
    }
}
</style>
<div ${commandArg2 && commandArg2 == "--angular-js"
        ? `ng-app="customFunApp"`
        : ""} ${commandArg2 && commandArg2 == "--angular-js"
        ? `ng-controller="customController"`
        : ""}>
<a href="javascript:void(0);" id="backToTop" class="back-to-top">
    <i class="arrow"></i><i class="arrow"></i>
</a>
<div  class="shadow-sm  jumbotron d-flex align-items-center justify-content-center text-center bg-mui-secondary portal-text-secondary mt-1">
<i class="fa fa-5x fa-cog rotate"></i>
<h3 class="font-italic ms-5"> ${commandArg2 && commandArg2 == "--angular-js"
        ? "{{message}}"
        : "Awsome!, You have successfully created a custom function."}</3>
</div>
<div class="shadow-sm jumbotron p-2 mt-4 bg-mui-primary d-flex align-items-center portal-text">
<p class="h3">Quick Start<br>
<abbr id="templateScriptABBR" class="font-italic" style="font-size: 12px;color: #888;font-weight: bold;cursor: pointer;">Template Script</abbr> 
<abbr class="font-italic" style="font-size: 12px;color: #888;font-weight: bold;cursor: none;">|</abbr>
<abbr id="clientScriptABBR" class="font-italic" style="font-size: 12px;color: #888;font-weight: bold;cursor: pointer;">Client Script</abbr>
<abbr class="font-italic" style="font-size: 12px;color: #888;font-weight: bold;cursor: none;">|</abbr>
<abbr id="serverScriptABBR" class="font-italic" style="font-size: 12px;color: #888;font-weight: bold;cursor: pointer;">Server Script</abbr>
<abbr class="font-italic" style="font-size: 12px;color: #888;font-weight: bold;cursor: none;">|</abbr>
<abbr id="example1ABBR" class="font-italic" style="font-size: 12px;color: #888;font-weight: bold;cursor: pointer;">Example-1</abbr>
<abbr class="font-italic" style="font-size: 12px;color: #888;font-weight: bold;cursor: none;">|</abbr>
<abbr id="example2ABBR" class="font-italic" style="font-size: 12px;color: #888;font-weight: bold;cursor: pointer;">Example-2</abbr>

</p>
</div>
<div class="p-2 m-2">
<div id="templateScriptSection" class="mt-1">
<h2>Template Script</h2>
<p> Template script will help you to process and generate dynamic HTML content for your function; It must always return static HTML and CSS styles that will be render in UI.</p>
<code>
<b class="font-italic">template.js</b> <br>
module.exports = {<br>
 &emsp;&emsp;&emsp;&emsp;template : (context,grid,row) =>{<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;return 'Hello to my new custom function';<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;}
<br>}

</code> 
</p>
<p>Parameters <code>context :</code> <mark>Return object from client script</mark>, <code>grid:</code><mark>Database table data as an array</mark> , <code>row:</code><mark>Selected row; if function has invoked from Row Action menu.</mark>  will be bind to the template script.
For more information about client script <a href="#">click here</a>. </p>
</div>
<div id="clientScriptSection" class="mt-5">
<h2>Client Script</h2>
<p>Client script helps you to process your business logic and enables you to make your function page/result dynamic. Client script will always invoked first before invoking template script. For more information about template script <a href="#">click here</a>. 
</p>
<code>
<b class="font-italic">client.js</b> <br>
<pre class="code-color">module.exports = {
  client: (parent, grid, row, utils) => {
    return {
      //All data members you want to use in template script goes here
      //Enable utils to be accessible inside event bindings
      utils: utils,
      //Custom Function supports angular js , uncomment below properties to enable angular js for your custom function 
      //Angular source code should be written inside angularScript; and template's can be defined inside template.js
      //If you want to include any additional libraries you can pass path for the files inside angularJSDependacies list
      //Limitation : You can use angular js route as it is already configured with ANgular's route feature.
      //applicationType: 'angularjs',
      //angularJSDependacies: [],
      //angularScript: (context, utils) => {},
      // eventBindings : helps to bind event to your template's html dom elements
      /**
            * You can add dom element binding like below; add a property to eventBindings object with the selector
            * You can access client script's return data members
            * domElementSelector : {type:'eventType',event : (context,event)=>{}}
            *
            * 
            * Example you have defined a button in template script with id alertButtton 
            * Build event for this element as below :
            * eventBindings : {
            *   'alertButton' : {
            *                       type: 'click',
            *                       event: (context,event) => { alert(1); }
            *                   }
            * }
            * 
            */
      eventBindings: {},
      /**
             * Life Cycle Event; It will work as a script tag after template is attached to DOM this event will be fired
             * 
             * @param {*} context refers to this > return object from client script
             * @param {*} utils available utils object 
             */
      templateScript: (context, utils) => {},
      /**
             * Life Cycle Event; It will work as a script tag before template is attached to DOM this event will be fired
             * 
             * @param {*} context refers to this > return object from client script
             * @param {*} utils available utils object 
             */
      templateScriptBefore: (context, utils) => {},
    };
  },
};
</pre>
</code> 
<p>Parameters <code>parent:</code> <mark>Angular component class object</mark>, <code>grid:</code><mark>Database table data as an array</mark> , <code>row:</code><mark>Selected row; if function has invoked from Row Action menu.</mark> ,<code>utils:</code><mark>Contains number of utility methods to allow client script to interact with Angular Services/Components</mark>  will be bind to the client script.
For more information about client script <a href="#">click here</a>. </p>
</div>
<div id="serverScriptSection" class="mt-5">
<h2>Server Script</h2>
<p> Server scripts helps to take your custom function to a whole new level by allowing user to add server side logic inside server.js file. It will automatically bind the express app to the server function ;
Eg. Your Function name is TESTFUN; <br>
<code>
<b class="font-italic">server.js</b> <br>
<pre class="code-color">
module.exports = {
  server: (app) => {
    function handleTESTFUNAPI(req, res, app) {
      return res
        .status(200)
        .send(
          "Awsome! Custom API is listening for user defined function TESTFUN..."
        );
    }
    function handleTESTFUNAPIPOST(req, res, app) {
      return res
        .status(200)
        .json(
          {
            text:"Awsome! Custom API is listening for user defined function TESTFUN...",
            body: req.body.params
          }
        );
    }
    app.get("/api/dynamicobjects/userDefinedFunctions/TESTFUN/server/get", handleTESTFUNAPI);
    app.post("/api/dynamicobjects/userDefinedFunctions/TESTFUN/server/post", handleTESTFUNAPIPOST);
  },
};

</pre>
</code>

</div>
<div id="exampleScriptSection" class="mt-5">
<h2>Example-1</h2>
<label for="reqtext" class="badge bg-primary">Requirement :</label>
<span name="reqtext" >We have a employee Dynamic Object Table with three columns FIRSTNAME, MIDDLENAME, LASTNAME.<br>
<ul><li> 1. Create a custom function to generate full name's of employee and show it in a table.</li><li> 2. Add a action button in each row of the table called <code>&#96</code>Click Me<code>&#96</code>. On click it will show an alert with selected employee's full name. <li><li>3. Add a button before the table called angular dialog; On click use Angular InputDialog Component to ask user Age and Profession. On user's submit alert user details in below format.<br>
E.g Age: 25, Profession: Software Engineer <br>
Dialog will show <code>&#96</code>Employee is 25 years old and is a Software Engineer by profession.</ul></span>

<label for="analysistext" class="badge bg-warning">Analysis :</label>
<p class="ms-3"> <label class="badge bg-primary">1</label>For first requirement it can be achieved by two ways, 1. processing all tables data iniside client script and accessing it inside template script while building the dom content . 2 As grid object is also available to template script you can generate full name inisde template script itself, but in case of large operation it is recomended to client script to add your logic. As we already have the data and it's a small operation lets do it inside template script.</p>
<label for="success-1" class="badge bg-success ms-3">SOLUTION REQUIREMENT-1</label><br>
<code class="ms-5">
<b class="font-italic">template.js</b> <br>
<pre class="code-color ms-5">
module.exports = {
  template: (context, grid, row, utils) =&gt; {
    //You can use context or grid or row to build the html dynamically
    domContent = <code>&#96</code>
    &lt;style&gt;
    .table-fixed{
        table-layout: fixed;
        word-wrap: break-word;
        display: table;
    }
    .table-sm tr td {
        text-align:center !important;
    }
    .table thead th {
        border: 1px solid #dee2e6 !important;
    }
    .table tbody tr,.table tbody td{
        border: 1px solid #dee2e6 !important;
    }
    &lt;/style&gt;
    
&lt;div class="container-fluid-lg p-3 my-3"&gt;
    &lt;div id="abc" class="row"&gt;
        &lt;div class="col-xs-6 "&gt;
            &lt;h3 class="page-title ms-3"&gt;
                 Full Name Example
                &lt;hr&gt;
            &lt;/h3&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="row p-3"&gt;

    &lt;table id="data_table" class="table table-responsive table-sm"&gt;
               &lt;thead&gt;
                  &lt;tr&gt;
                     &lt;th &gt;&lt;center&gt;First Name&lt;/center&gt;&lt;/th&gt;
                     &lt;th &gt;&lt;center&gt;Middle Name&lt;/center&gt;&lt;/th&gt;
                     &lt;th &gt;&lt;center&gt;Last Name&lt;/center&gt;&lt;/th&gt;
		     &lt;th &gt;&lt;center&gt;Full Name&lt;/center&gt;&lt;/th&gt;
                     &lt;th &gt; Actions &lt;/th&gt;
                  &lt;/tr&gt;
                 
               &lt;/thead&gt;
               &lt;tbody&gt;<code>&#96</code>;
    if (grid.length == 0) {
      domContent += <code>&#96</code>&lt;tr &gt;&lt;td colspan="5"&gt; There is nothing to show ... &lt;/td&gt;&lt;/tr&gt;<code>&#96</code>;
    }
    for (var item of grid) {
      domContent += <code>&#96</code>
                    &lt;tr&gt;
                        &lt;td&gt;&#36;{item.FIRSTNAME}&lt;/td&gt;
                        &lt;td&gt;&#36;{item.MIDDLENAME}&lt;/td&gt;
			&lt;td&gt;&#36;{item.LASTNAME}&lt;/td&gt;
                        &lt;td&gt;&#36;{item.FIRSTNAME +
                          " " +
                          item.MIDDLENAME +
                          " " +
                          item.LASTNAME}&lt;/td&gt;
                        &lt;td&gt;&lt;/td&gt;
                    &lt;/tr&gt;
                <code>&#96</code>;
    }
    domContent += <code>&#96</code>
               &lt;/tbody&gt;
            &lt;/table&gt;&lt;/div&gt;<code>&#96</code>;
    return domContent;
  },
};
</pre>
</code>
<label for="success-1-res" class="badge bg-success ms-3">Result:</label><br>
<img class="w-50 ms-5" src="data:image/png;base64,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">

</pre>
</code>
<p class="ms-3"> <label class="badge bg-primary">2</label>
Further to resolve requirement two , first we need to add a button inside template script table for loop. You can add below line inside last td of the dynamic table;<br>
<code>
 &lt;span id="openAlert">  &lt;i  meta=&#36;{JSON.stringify(
                          item
                        )}' class="fa fa-envelope-open-o btn btn-primary">&lt;/i>&lt;/span>
</code><br>
Now we need to bind event to these buttons, to do this we have two option we we know id's of each button we can use eventBindings object to add event but here buttons are getting generated dynamically so to handle this we can exploit the use of JQuery inside templateScript life cycle event inside client.js .
Add below JQuery event handler to client.js templateScript event.
<code>
<pre class="code-color ms-3">
$("#data_table tbody tr").find("#alertName").each(function() {
          $this = $(this);
          $this.on("click", (event) => {
            const targetRow = JSON.parse(event.target.attributes["meta"].value);
            window.alert(
              targetRow.FIRSTNAME +
                " " +
                targetRow.MIDDLENAME +
                " " +
                targetRow.LASTNAME
            );
          });
        });
</pre>
</code>
<label for="success-1-res" class="badge bg-success ml-">Result:</label><br>
<img class="w-50 ms-5 mb-5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABUMAAAJJCAYAAACAmSZ+AAAgAElEQVR4Xuzdi5cU9Z3//9f0zDCAXIZBLnJTQBBUFEEUUSKieCGieIuJMRqWGE3i12M22d/uyR+Qk918d+Pxa7xEWa/RGO/xrkhUUFHECyoiiMj9DsOAw8BM9/w+NdPd011d3V3dXd1d3f2c892z35Xqqk89Pu+urn71pz6fqnvuvrdd/CGAAAIIIIAAAggggAACCCCAAAIIIIAAAmUuUEUYWuY9zOkhgAACCCCAAAIIIIAAAggggAACCCCAQIcAYSiFgAACCCCAAAIIIIAAAggggAACCCCAAAIVIUAYWhHdzEkigAACCCCAAAIIIIAAAggggAACCCCAAGEoNYAAAggggAACCCCAAAIIIIAAAggggAACFSFAGFoR3cxJIoAAAggggAACCCCAAAIIIIAAAggggABhKDWAAAIIIIAAAggggAACCCCAAAIIIIAAAhUhQBhaEd3MSSKAAAIIIIAAAggggAACCCCAAAIIIIAAYSg1gAACCCCAAAIIIIAAAggggAACCCCAAAIVIUAYWhHdzEkigAACCCCAAAIIIIAAAggggAACCCCAAGEoNYAAAggggAACCCCAAAIIIIAAAggggAACFSFAGFoR3cxJIoAAAggggAACCCCAAAIIIIAAAggggABhKDWAAAIIIIAAAggggAACCCCAAAIIIIAAAhUhQBhaEd3MSSKAAAIIIIAAAggggAACCCCAAAIIIIAAYSg1gAACCCCAAAIIIIAAAggggAACCCCAAAIVIUAYWhHdzEkigAACCCCAAAIIIIAAAggggAACCCCAAGEoNYAAAggggAACCCCAAAIIIIAAAggggAACFSFAGFoR3cxJIoAAAggggAACCCCAAAIIIIAAAggggABhKDWAAAIIIIAAAggggAACCCCAAAIIIIAAAhUhQBhaEd3MSSKAAAIIIIAAAggggAACCCCAAAIIIIAAYSg1gAACCCCAAAIIIIAAAggggAACCCCAAAIVIUAYWhHdzEkigAACCCCAAAIIIIAAAggggAACCCCAAGEoNYAAAggggAACCCCAAAIIIIAAAggggAACFSFAGFoR3cxJIoAAAggggAACCCCAAAIIIIAAAggggABhKDWAAAIIIIAAAggggAACCCCAAAIIIIAAAhUhQBhaEd3MSSKAAAIIIIAAAggggAACCCCAAAIIIIAAYSg1gAACCCCAAAIIIIAAAggggAACCCCAAAIVIUAYWhHdzEkigAACCCCAAAIIIIAAAggggAACCCCAAGEoNYAAAggggAACCCCAAAIIIIAAAggggAACFSFAGFoR3cxJIoAAAggggAACCCCAAAIIIIAAAggggABhKDWAAAIIIIAAAggggAACCCCAAAIIIIAAAhUhQBhaEd3MSSKAAAIIIIAAAggggAACCCCAAAIIIIAAYSg1gAACCCCAAAIIIIAAAggggAACCCCAAAIVIUAYWhHdzEkigAACCCCAAAIIIIAAAggggAACCCCAAGEoNYAAAggggAACCCCAAAIIIIAAAggggAACFSFAGFoR3cxJIoAAAggggAACCCCAAAIIIIAAAggggABhKDWAAAIIIIAAAggggAACCCCAAAIIIIAAAhUhQBhq6+bPVh7S8432vq/S1AndNLN3zH/f36Y7PwsqYdP6av3u+JqKKB5OEoHKE2jT4+8GtdZ+4nXVmj+5RoMqD4QzRgABBBBAAAEEEEAAAQQQQKCkBAhDCUNLqmBpLALFFSAMLa4/R0cAAQQQQAABBBBAAAEEEEAgN4GChaHb1x3Wgq3tWbY2oDnTajUhy1dn8rJijwx1Pr51BlU67cRandenyt3pbGvV778JJWw7elSdrh7sbhdslZtA8r50sV9GGrpAKsYmhKHFUOeYCCCAAAIIIIAAAggggAACCHglQBhqk/RvGGoaagKyeafU6KiAi+4nDHWBlN9NCEPz61ucvROGFsedoyKAAAIIIIAAAggggAACCCDgjQBhaCmFoaatDUNqddMxLtJQwlBv3iE57IUwNAc8376UMNS3XUPDEEAAAQQQQAABBBBAAAEEEHAhQBhaYmGoqgKaMbFW03qk6V3CUBfln99NCEPz61ucvROGFsedoyKAAAIIIIAAAggggAACCCDgjUDRw9BAdZW6px3oWKULp9RqnDfnnHIvvn5MPtzyQM9q3TixRv1SnQlhaAGqJfUhkoWh1TVVqks39WtdQNeeVKMji34WNCBegDCUikAAAQQQQAABBBBAAAEEEECglAWKHobWH1WrX45Mm4YWzLgUwlALY9jRtbpuaAo3wtCC1UyyAyULQ1nEquhdk0MDCENzwOOlCCCAAAIIIIAAAggggAACCBRdgDDU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">

<div class="ms-3">

<p><label class="badge bg-primary">3</label> For third requirement, we can use Angular dialog service that is already included inside utils object. To know more about utils <a href>click here</a> . </p>
<p> Add a button to the UI 
<code>
&lt;button class="btn btn-portal mb-2" id="openDialog">Open Dialog &lt;/button>
</code>
</p>
<br>
<p> For the same button id add an entry to eventBindings object inside client.js. With current design you can get input for a single field from user using dialog.openInputDialog service.</p>
<code>
<pre class="code-color">
openDialog: {
          type: "click",
          event: (context, event) => {
            const dialogService = context.utils.getApplicationService("dialog");
            dialogService.openInputDialog(
              {
                title: "Question 1",
                label: "What is your age ?",
                isText: true,
                titleIcon: true,
                iconClass: "",
              },
              (res) => {
                if (res.dataCtrl) {
                  dialogService.openInputDialog(
                    {
                      title: "Question 2",
                      label: "What is profession ?",
                      isText: true,
                      titleIcon: true,
                      iconClass: "",
                    },
                    (res2) => {
                      if (res2.dataCtrl) {
                        window.alert(
                          "Employee age is " +
                            res.dataCtrl +
                            " and is a " +
                            res2.dataCtrl +
                            " by profession."
                        );
                      }
                    }
                  );
                }
              }
            );
          },
</pre>
</code>
<div id="example2">
<h2>Example-2</h2>
<label for="reqtext" class="badge bg-primary">Requirement :</label>
<span> How to call custom function's APIs from client script. For eg your function name is TESTFUN and you have two api's defined in server.js; One is get and one is post.
Se below client.js how you can initiate HTTP GET and HTTP POST to node js using nodeclient service.
</span>
<br>
<code>
<b class="font-italic">client.js</b> <br>
<pre class="code-color">
module.exports = {
  client: (parent, grid, row, utils) => {
    var nodeclient = utils.getApplicationService("nodeclient");
    console.log("nodeclient", nodeclient);
    console.log("nodeclient", nodeclient.get);
    const httpOptions = {
      headers: {
        Accept: "text/html, application/xhtml+xml, */*",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      responseType: "text",
    };

    nodeclient
      .get(
        "api/dynamicobjects/userDefinedFunctions/TESTFUN/server/get",
        httpOptions
      )
      .then((res) => {
        alert(res);
      })
      .catch((err) => {
        alert(JSON.stringify(err));
        console.log("nodeclient", err);
      });
    const reqBody = { ip: "ip", user: "user" };
    const httpOptionsPost = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    nodeclient
      .postToCustomAPI(
        "api/dynamicobjects/userDefinedFunctions/TESTFUN/server/post",
        reqBody,
        httpOptionsPost
      )
      .then((res) => {
        alert(JSON.stringify(res));
      })
      .catch((err) => {
        alert(JSON.stringify(err));
        console.log("nodeclient", err);
      });

    return {
      //All data members you want to use in template script goes here
      //Enable utils to be accessible inside event bindings
      utils: utils,
      // eventBindings : helps to bind event to your template's html dom elements
      /**
            * You can add dom element binding like below; add a property to eventBindings object with the selector
            * You can access client script's return data members
            * domElementSelector : {type:'eventType',event : (context,event)=>{}}
            *
            * 
            * Example you have defined a button in template script with id alertButtton 
            * Build event for this element as below :
            * eventBindings : {
            *   'alertButton' : {
            *                       type: 'click',
            *                       event: (context,event) => { alert(1); }
            *                   }
            * }
            * 
            */
      eventBindings: {},
      /**
             * Life Cycle Event; It will work as a script tag after template is attached to DOM this event will be fired
             * 
             * @param {*} context refers to this > return object from client script
             * @param {*} utils available utils object 
             */
      templateScript: (context, utils) => {},
      /**
             * Life Cycle Event; It will work as a script tag before template is attached to DOM this event will be fired
             * 
             * @param {*} context refers to this > return object from client script
             * @param {*} utils available utils object 
             */
      templateScriptBefore: (context, utils) => {},
    };
  },
};
</pre>
</code>
</div>
</div>
</div>
</div>
</div>` +
      "`;" +
      `

    return domContent;
  },
};
`;
  } else {
    template_js_data =
      `module.exports = {
  template: (context, grid, row, utils) => {` +
      "domContent= `Awsome! You have successfully created a custom function.`;" +
      `
      return domContent;
  },
};`;
  }
  const server_js_content = `module.exports = {
  server: (app) => {
    function handle${commandArg}API(req, res, app) {
      return res
        .status(200)
        .send(
          "Awsome! Custom API is listening for user defined function ${commandArg}..."
        );
    }
    function handle${commandArg}APIPOST(req, res, app) {
      return res
        .status(200)
        .json(
          {
            text:"Awsome! Custom API is listening for user defined function ${commandArg}...",
            body: req.body
          }
        );
    }
    app.get("/api/dynamicobjects/userDefinedFunctions/${commandArg}/server/get", handle${commandArg}API);
    app.post("/api/dynamicobjects/userDefinedFunctions/${commandArg}/server/post", handle${commandArg}APIPOST);
    const express = require("express");
    app.use("/functions/${commandArg}/", express.static(__dirname + "/assets"));
  },
};

`;

  createFile("./api/functions/" + commandArg, "client.js", client_file_data);
  createFile("./api/functions/" + commandArg, "template.js", template_js_data);
  createFile("./api/functions/" + commandArg, "server.js", server_js_content);
  console.log(
    "Successfully created custom function " +
      commandArg +
      ".To use this function please include this in config.js > userDefinedFunctions list."
  );
} catch (e) {
  console.log(fn + `- Error occurred!`, e);
}
