 'use strict';
 angular.module('DJMobileApp.Config.Route', [
  ]).config(function($routeProvider) {
    $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
  });

