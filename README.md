# Starter Kit - Electron AngularJS 1.x ES6 SASS/SCSS

Updated for Electron 1.2.5.

Starter Kit showing how to use JSPM to pre-compile your Electron, AngularJS 1.4.8, ES6, and SASS/SCSS.  Updated for Electron 1.2.5.

## Introduction
In case you don't know me, I have a **passion** for **Electron** and cross-platform line business applications.

I've shipped production manufacturing application using Electron to a customer and am currently working on another very complex Electron app.

The first time I saw Electron, I was amazed that I (anyone) can write high-octane, performant, LOB apps that run on OS X, Windows, and Linux; using HTML5, CSS3, and ES6 or TypeScript.

Going forward, I want to use ES6 for my Electron App Development and Node.js Server App Development.  This demo/starter project is the result of my research in figuring out how to use ES6 in my AngularJS 1.x apps that are hosted in Electron.

Originally, I went down the TypeScript route but kept running into issues around incomplete, unavailable, or outdated d.ts files.  Additionally I found a 15% development tax (overhead) when writing TypeScript apps when compared to ES5 or ES6 without much payback over ES6.

#### Development Goals
1.  Write ES6 JavaScript
2.  ES6 checked by linter
3.  Author styles using SASS/SCSS
4.  Blazing fast application start up time
5.  AngularJS 1.x (this app is 1.4.8)
6.  Cross-platform application building and deployment
7.  Great client debugging experience during development
8.  Author clean ES6 with very little or no framework goo code
9.  Be productive while coding
10. Testing (coming soon)

This demo/starter meets my goals.

I wrote this demo/starter to prove out all my scenarios for developing and building a production LOB Electron app.

#### Features
1. Uses SystemJS as the module loader, package manager, and external dependency resolver.
2. JavaScript is ES6
3. ES6 linted using ESLint
4. Uses gulp for its build system
5. Built using gulp-jspm which creates a single pre-compiled .js file from: app .js files, vendor .js files, and the system .js files.
6. Loads incredibly fast at runtime, especially when a production build is made, which minifies the .js.  I originally had a spinner that showed during loading, but removed it because the app loads so fast.
7. Uses SASS/SCSS and Compass for easy and fun app styling.
8. Three developer work flows or builds (dev, preCompileDevelop, preCompileProduction).

#### Helpful Links
- Learn about SystemJS plugins: https://github.com/systemjs/systemjs#plugins

- Learn about ESLint rules: http://eslint.org/docs/rules/

- Learn about HTMLHint: https://github.com/bezoerb/gulp-htmlhint

- Learn about HTMLHint rules: https://github.com/yaniswang/HTMLHint/wiki/Rules

- Learn about SASS/SCSS: http://sass-lang.com/guide

- Learn about Compass: http://compass-style.org/

- Learn about Electron: http://electron.atom.io/

- Learn about Electron Packager: https://github.com/electron-userland/electron-packager

- Learn about Gulp: http://gulpjs.com/

- This post was very helpful in understanding Electron, Angular, and ES6: https://www.xplatform.rocks/2015/05/04/writing-an-electron-atom-shell-app-using-angular-and-es6/

## Prerequisites
Before you can run this code locally on your system, you'll need to load the following software:

- Install node.js:  https://nodejs.org/en/  (**Mac users install using "brew"** not the download from node web site.)

- Install Ruby:  https://www.ruby-lang.org/en/documentation/installation/

- Install SASS/SCSS & Compass:  http://compass-style.org/install/

- Install Electron Prebuilt globally:
```shell
npm install -g electron-prebuilt
```

- Install Electron Packager globally:
```shell
npm install -g electron-packager
```

- Install Gulp globally
```shell
npm install -g gulp
```

- Install Gulp CLI globally
```shell
npm install -g gulp-cli
```

- Install JSPM globally
```shell
npm install -g jspm
```

#### Verify Node Packages
You can check your globally installed node packages by running the below command ( npm ls -g --depth=0 ).

Your results may be different than mine.  These version numbers were taken on 7 July 2016.

```shell
 $ npm ls -g --depth=0
/usr/local/lib
├── electron-packager@7.1.0
├── electron-prebuilt@1.2.5
├── gulp@3.9.1
├── gulp-cli@1.2.1
├── jspm@0.16.39
├── npm@3.9.5
```

## Run The App!

- Download or clone this repro.

- Open a terminal window at the root folder and run the following commands:
```shell
npm install
gulp
gulp run
```

The above commands:

1. "npm install" - Installs all app dependencies (node_modules and jspm_packages).

2. "gulp" - Runs the default gulp script that cleans all develop build folders, lints all ES6 code, runs compass, copies all development files except source JavaScript files, and creates a bundle file of all JavaScript.

3. "gulp run" - Starts the Electron App that has been publised to the build-publish folder.

## Gulp Tasks
I will write more about the gulp tasks soon.  (TBD)  For now, have a look at gulpfile.js.

#### Configure Workflow or Build
There is a buildMode configuration variable in gulpfile.js.  The value of this variable controls how the app is published and compiled.

After changing the mode, run the 'default' gulp task, this will clear out the build-publish folder and then re-publish and re-compile the app.

The modes are:

##### dev
- The default buildMode is dev
- This mode does not pre-compile the app
- When the app is running, it relies on SystemJS to transpile the ES6 at runtime

##### preCompileDevelop
- This mode pre-compiles the app into a single .js file and provides a source map.
- When the app is running, it has no dependencies on jspm_packages or SystemJS

##### preCompileDevelop
- This mode pre-compiles and minifies the app into a single .js file.
- When the app is running, it has no dependencies on jspm_packages or SystemJS

## Running The App
To run the app, run the 'run' gulp task.  This will launch the Electron app that has been published and compiled.

## Building
Please read the docs on Electron Packager (link above), as it explains building on different platforms.

Building is the act of creating a compile app for the selected platform.

## Tests
I will write about testing soon. (TBD)
