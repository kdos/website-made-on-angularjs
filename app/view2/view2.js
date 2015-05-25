'use strict';

angular.module('myApp.view2', ['ngRoute', 'infinite-scroll', 'satellizer'])

.config(['$routeProvider', '$locationProvider', '$authProvider', function($routeProvider, $locationProvider, $authProvider) {
    $routeProvider

    //for Landing page
        .when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        })
        .when('/activity', {
            templateUrl: 'view2/activity.html',
            controller: 'ActivityCtrl'
        })
        .when('/signup', {
            templateUrl: 'view2/signup.html',
            controller: 'UserCtrl'
        });

    $authProvider.facebook({
        clientId: '1579596005622373'
    });
    $authProvider.google({
        clientId: '142948201950-lha090ep16tqf3mk0pva9r0nh0da27vh.apps.googleusercontent.com',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
        scopeDelimiter: ' ',
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        display: 'popup',
        type: '2.0',
        popupOptions: {
            width: 580,
            height: 400
        }
    });


    $authProvider.twitter({
        url: '/auth/twitter',
        responseType: 'token'
    });

    $authProvider.baseUrl = null;
    $authProvider.signupUrl = "http://104.236.150.55/auth/register";

}])

.filter('startFrom', function() {
        return function(input, start) {
            if (!input || !input.length) {
                return;
            }
            return input.slice(start);
        };
    })
    .filter('getById', function() {
        return function(input, id) {
            if (!input || !input.length) {
                return;
            }
            var i = 0,
                len = input.length;
            for (; i < len; i++) {
                if (input[i].name == id) {
                    return input[i];
                }
            }
        }
    })
    .factory('myService', function() {
        var savedData = {},
            TrackId = "";

        function set(data) {
            savedData = data;
        }

        function get() {
            return savedData;
        }

        function getId() {
            return TrackId;
        }

        return {
            set: set,
            get: get
        }

    })
    .factory('myId', function() {
        var TrackId = "";

        function set(data) {
            TrackId = data;
        }

        function get() {
            return TrackId;
        }

        return {
            set: set,
            get: get
        }

    })
    .controller('View2Ctrl', ['$scope', '$http', '$filter', '$location', 'myService', 'myId', function($scope, $http, $filter, $location, myService, myId) {
        $scope.isLoading = true; //condition for preloader
        $scope.start = 0;
        $scope.stop = false;
        $scope.limit = 3; //Number of activities at a time
        $scope.count = 0; // Total number of activities
        $scope.fullResult = "";
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
                myService.set($scope.fullResult);
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


        $scope.go = function(path, activity) {
            $location.path(path);
            myId.set(activity);
            console.log(activity);
        };

        $(".button-collapse").sideNav({
            menuWidth: 200, // Default is 240
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        });
        $('.materialboxed').materialbox();
        $('ul.tabs').tabs();

    }])
    .controller('ActivityCtrl', ['$scope', '$filter', '$location', 'myService', 'myId', function($scope, $filter, $location, myService, myId) {
        $scope.names = myService.get();
        $scope.val = myId.get();
        $scope.nm = $filter('getById')($scope.names, $scope.val);
        $scope.go = function(path) {
            $location.path(path);
        };
    }])
    .controller('UserCtrl', ['$scope', '$http', '$auth', function($scope, $http, $auth) {
        $scope.formData = {};

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider)
                .catch(function(response) {
                    console.log(response.data);
                });
        };

        $scope.signup = function() {

            var user = {
                email: $scope.email,
                password: $scope.password
            };

            $auth.signup(user)
                .catch(function(response) {
                    console.log(response.data);
                });
        }
         $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    }]);
