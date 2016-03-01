/*eslint no-undef: 0*/

/*
 app.js is the application bootstrapper;

 all modules are loaded and then angular is bootstrapped

 */

// jspm vendor modules
import angular from  'angular';
import 'angular-ui-router';

// application js files

// import your directives
// import your services
// import your routes   e.g. you can place all your routes in one file or load them by module, your choice. Probably depends on the app size.
// import your modules, e.g. app.sales, app.orders, etc.

import './app.module';  // for this sample app, app.modules does all of the above.

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app'], {strictDi: true});  // bootstrap angular now that all modules have been loaded
});