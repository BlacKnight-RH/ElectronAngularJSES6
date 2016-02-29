# Electron AngularJS 1.x ES6 SASS/SCSS Starter

Demo/starter app showing Electron, AngularJS 1.4.8, ES6, and SASS/SCSS.

## Introduction
In case you don't know me, I have a **passion** for **Electron** and cross-platform line business applications.

I've shipped production manufacturing application using Electron to a customer and am currently working on another very complex Electron app.

The first time I saw Electron, I was amazed that I (anyone) can write high-octane, performant, LOB apps that run on OS X, Windows, and Linux; using HTML5, CSS3, ES6, or TypeScript.

Going forward, I want to use ES6 for my Electron App Development and Node.js Server App Development.  This demo/starter project is the result of my research in figuring out how to use ES6 in my AngularJS 1.x apps that are hosted in Electron.

Originally, I went down the TypeScript route but kept running into issues around incomplete, unavailable, or outdated d.ts files.  Additionally I found a 15% development tax (overhead) when writing TypeScript apps when compared to ES5 or ES6 without much payback over ES6.

#### Goals
1.  Write code using ES6
2.  ES6 checked by linter
3.  Write styles using SASS/SCSS
4.  Blazing fast application start up time
5.  AngularJS 1.x (this app is 1.4.8)
6.  Cross-platform application building
7.  Great client debugging experience during development
8.  Author clean ES6 with very little to no framework goo code
9.  Be productive while working
10. Testing (coming soon)

This demo/starter meets my goals.

I wrote this demo/starter to prove out all my scenarios for developing and building a production LOB Electron app.

#### Features
1. Uses SystemJS as the module loader, package manager, and external dependency resolver.
2. JavaScript is ES6
3. ES6 linted using ESLint
4. Uses gulp for its build system
5. Built using gulp-jspm which creates a single .js file from: app .js files, vendor .js files, and the system .js files.
6. Loads incredibly fast at runtime, especially when a production build is made, which minifies the .js.  I originally had a spinner that showed during loading, but removed it because the app loads so fast.
7. Uses SASS/SCSS and Compass for easy and fun app styling.

#### Helpful Links
- Learn about SystemJS plugins: https://github.com/systemjs/systemjs#plugins

- Learn about ESLint rules: http://eslint.org/docs/rules/

- Learn about SASS/SCSS: http://sass-lang.com/guide

- Learn about Compass: http://compass-style.org/

- Learn about Electron: http://electron.atom.io/

- Learn about Electron Packager: https://github.com/electron-userland/electron-packager

- Learn about Gulp: http://gulpjs.com/

## Prerequisites
Before you can run this code locally on your system, you'll need to load the following software:

- Install node.js:  https://nodejs.org/en/

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

Your results may be different than mine.  These version numbers were taken on 2 Feb 2016.

```shell
 $ npm ls -g --depth=0
/usr/local/lib
├── electron-packager@5.2.1
├── electron-prebuilt@0.36.9
├── gulp@3.9.1
├── gulp-cli@1.2.1
├── jspm@0.16.30
├── npm@2.14.7
```

## Run The App!

- Download or clone this repro.

- Open a terminal window at the root folder and run the following commands:
```shell
npm install
gulp
gulp run-dev
```

The above commands:

1. Install all app dependencies (node_modules and jspm_packages).

2. Runs the default gulp script that cleans all develop build folders, lints all ES6 code, runs compass, copies all development files except source JavaScript files, and creates a bundle file of all JavaScript.

3. Starts Electron App in the develop publish folder.

## Gulp Tasks
I will write about the gulp tasks soon.  (TBD)  For now, have a look at gulpfile.js.

## Building
Please read the docs on Electron Packager (link above), as it explains building on different platforms.

Building is the act of creating a compile app for the selected platform.

## Tests
I will write about testing soon. (TBD)
