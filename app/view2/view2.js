'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
    });
}])

.controller('View2Ctrl', ['$scope', '$http', function($scope, $http) {
    $http({
            method: 'GET',
            url: 'http://104.236.150.55/api/activity/list/?format=json'
        })
        .success(function(response) {
            $scope.names = response.results;
            //$scope.name = response.count;
        })
        .error(function(data, status) {
            //$scope.name = status;
        });
    $(".button-collapse").sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    $('.materialboxed').materialbox();
    $('ul.tabs').tabs()
}]);
