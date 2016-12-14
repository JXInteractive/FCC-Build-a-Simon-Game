Quiz App: Getting Started
=========================================

This is a quiz app I developed in JavaScript — files output by Gulp task runner. Here's how to use it on your local client:

* Have NPM (https://www.npmjs.com/) and Gulp (http://gulpjs.com/) installed on your computer
* Download this Github repository (ZIP and extract if necessary)
* Mac/Unix users:
1. Click "build.sh" file to build "node_modules" and "build" folder (wait a couple of minutes)
* Windows users:
1. Open Command Prompt
2. Enter "npm install --only=dev" (wait a couple of minutes)
3. Enter "SET NODE_ENV=production"
4. Enter "gulp"
* Visit "localhost:3000" in your browser... et voila!


Configuration
=========================================

Change the JSON document (question set) source and UI labels by editing "source" -> "config.js".