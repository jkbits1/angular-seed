/**
 * Created by jk on 16/01/15.
 */

'use strict';

var chooseModule = angular.module('myApp.viewChooseProgramme', ['ngRoute']);

chooseModule.config(['$routeProvider', function ($routeProvider) {

  $routeProvider.when('/chooseProgramme', {

    // NOTE: using a fn rather than a string to look
    //       at params for learning purposes.
    templateUrl: function(params){

      return 'viewChooseProgramme/viewChooseProgramme.html';
    }
    //templateUrl: 'viewChooseProgramme/viewChooseProgramme.html'
    ,
    controller: 'chooseProgrammeCtrl'
  });

}]);

chooseModule.controller('chooseProgrammeCtrl', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http){

  $scope.changeProgramme = function() {

    $rootScope.progId = $scope.selectedProgramme.id;
  };

  $http.get('http://localhost:3030/folders')
    .success(function (data, status, headers, config) {
      $scope.paths = data.paths;

    }).error(function(data, status, headers, config) {

    });
}]);
