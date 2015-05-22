'use strict';

angular.module('myApp.view2', ['ngRoute', 'infinite-scroll'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider

        //for Landing page
        .when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        })
        ;
}])

.filter('startFrom', function() {
        return function(input, start) {
            if (!input || !input.length) {
                return;
            }
            return input.slice(start);
        };
    })
    .controller('View2Ctrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
        $scope.isLoading = true; //condition for preloader
        $scope.start = 0;
        $scope.stop = false;
        $scope.limit = 3;       //Number of activities at a time
        $scope.count = 0;       // Total number of activities
        $scope.names = "";
        $http({
                method: 'GET',
                url: 'http://104.236.150.55/api/activity/list/?format=json'
            })
            .success(function(response) {
                $scope.fullResult = response.results;
                $scope.count = response.count;
                $scope.names = $filter('limitTo')($scope.fullResult, $scope.limit);
                $scope.start += $scope.limit;
                $scope.isLoading = false;
            })
            .error(function(data, status) {
                $scope.names = status;
                $scope.isLoading = true;
            });


        $scope.loadMore = function() {
            $http({
                    method: 'GET',
                    url: 'http://104.236.150.55/api/activity/list/?format=json'
                })
                .success(function(response) {
                    if ($scope.count > $scope.start) $scope.stop = true;
                    for (var i = 0; i < $scope.limit; i++) {
                        $scope.temp = $filter('startFrom')(response.results, $scope.start);
                        $scope.temp = $filter('limitTo')($scope.temp, 1);
                        $scope.start += 1;

                        $scope.names.push($scope.temp[0]);
                    };

                })
                .error(function(data, status) {
                    $scope.names = status;
                });
        }
        $(".button-collapse").sideNav({
            menuWidth: 200, // Default is 240
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        });
        $('.materialboxed').materialbox();
        $('ul.tabs').tabs();

    }])

;
