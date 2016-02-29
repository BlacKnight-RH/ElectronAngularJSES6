/*eslint no-undef: 0*/

import angular from 'angular';
import uirouter from 'angular-ui-router';

import HomeController from './home/homeController';

angular.module('app', [uirouter])
    .config(config)
    .controller('HomeController', HomeController);

config.$inject = ['$stateProvider', '$urlRouterProvider'];
function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/home/homeView.html',
            controller: 'HomeController as vm'
        });
}
