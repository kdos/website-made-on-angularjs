'use strict';

describe('myApp.view2 module', function() {

  beforeEach(module('myApp.view2'));

   beforeEach(inject(function(_$controller_,_$http_){
        $controller = _$controller_;
        $http = _$http_;
    }));

  describe('view2 controller', function(){

    it('should get', function() {
      //spec body
      var $scope = {},
      $http = {};
      var view2Ctrl = $controller('View2Ctrl',{$scope: $scope, $http: $http});
      expect(view2Ctrl).toBeDefined();
    });

  });
});