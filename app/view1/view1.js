'use strict';

angular.module('myApp.view1', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/view1', {

            templateUrl: 'view1/view1.html',

            controller: 'View1Ctrl'

        });

    }])



.controller('View1Ctrl', ['$scope','$http', function($scope,$http) {

    $scope.name = '';
    
    $http({method: 'GET', url: 'http://104.236.150.55/api/activity/list/?format=json'})
    .success(function(response){
        $scope.names = response.results;
        $scope.name = response.count;
    })
    .error(function(data,status){
        $scope.name = status;
    });

    $scope.addName = function() {

        $scope.names.push({
            'name': $scope.name
        });

        $scope.name = '';

    };

}]);
