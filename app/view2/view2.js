'use strict';

angular.module('myApp.view2', ['ngRoute', 'infinite-scroll'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
    });
}])

.controller('View2Ctrl', ['$scope', '$http', function($scope, $http) {
        $scope.isLoading = true; //condition for preloader
        $http({
                method: 'GET',
                url: 'http://104.236.150.55/api/activity/list/?format=json'
            })
            .success(function(response) {
                $scope.names = response.results;
                $scope.isLoading = false;
            })
            .error(function(data, status) {
                $scope.names = status;
                $scope.isLoading = true;
            });
        $scope.loadMore = function() {
                var last = $scope.names[$scope.names.length - 1];
                for (var i = 1; i <= 8; i++) {
                    $scope.names.push(last + i);
                }
            }
            /*
            $scope.currentPage = 0;
            $scope.pageSize = 3;
            $scope.numberOfPages = function(){
                return Math.ceil($scope.names.length/$scope.pageSize);
            }*/
            /* settings for 'materialize' objects*/
        $(".button-collapse").sideNav({
            menuWidth: 400, // Default is 240
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        });
        $('.materialboxed').materialbox();
        $('ul.tabs').tabs();

    }])
    /*
    .filter('startFrom',[function(){
        return function(input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    }])
    */
;
