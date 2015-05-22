'use strict';

describe('myApp.view2 module', function() {

  beforeEach(module('myApp.view2'));

  describe('view2 controller', function(){
    var scope;
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      $http = "";
      $controller("View2Ctrl", {
          $scope = scope,
          $http = $http
      })      
    }))

  });
});