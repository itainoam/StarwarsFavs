(function () {

    'use strict';
    var app = angular.module('app', ['data.service','swTable','ui.router','smart-table','ngStorage']);

        app.config(function ($urlRouterProvider, $stateProvider) {
            $stateProvider
                .state('people', {
                    url: "/people",
                    templateUrl: "views/people.html"
                })
                .state('films', {
                    url: "/films",
                    templateUrl: "views/films.html"
                })
                .state('planets', {
                    url: "/planets",
                    templateUrl: "views/planets.html"
                })
                .state('species', {
                    url: "/species",
                    templateUrl: "views/species.html"
                })
                .state('vehicles', {
                    url: "/vehicles",
                    templateUrl: "views/vehicles.html"
                }).state('starships', {
                    url: "/starships",
                    templateUrl: "views/starships.html"
                });
            

            $urlRouterProvider.otherwise('/people');
        })


})();


