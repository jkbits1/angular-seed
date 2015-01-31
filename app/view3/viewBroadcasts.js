/**
 * Created by jk on 08/01/15.
 */

'use strict';

var view3Module =

angular.module('myApp.view3', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/view3', {
        templateUrl: 'view3/view3.html',
        controller: 'View3Ctrl'
      })
      .when('/view3/:progId', {
        templateUrl: function(params){

          return 'view3/view3.html';
        },
        controller: 'View3Ctrl'
      });
  }]);

// revised to use factory call - maybe Angular upgrade has renamed calls
//app.service("filenameService", function () {
//
//  var t1 = "";
//  return {
//    getFileName: function(x){
//      return "123";
//    }
//  }
//});

view3Module.controller('View3Ctrl', ['$rootScope', '$scope', '$http', 'filenameService', function($rootScope, $scope, $http, filenameService) {

  var progIdUriSegment = "";

  if ($rootScope.progId !== undefined) {

    progIdUriSegment = "/" + $rootScope.progId;
  }

  $http.get('http://localhost:3030' + progIdUriSegment)
      .success(function (data, status, headers, config) {
        $scope.files = data.files;

        //var t1a = filenameService.getFileName("1");
        var getFileName = filenameService.getFileName;
        //var getFileName = filenameService;
        var t1a = getFileName("1");

        var monthYears = [];

        $scope.fileDates = $scope.files.map(function (file) {

          var dateWithoutWeekday = $scope.getDateAsString(file.date);
          var dateWithoutWeekdayLetters = dateWithoutWeekday.split('');

          var month = dateWithoutWeekdayLetters.splice(4, 3).join('');
          // remove space
          //dateWithoutWeekdayLetters.splice(0, 1);
          var day = dateWithoutWeekdayLetters.splice(5, 2).join('');
          var year = dateWithoutWeekdayLetters.splice(6, 4).join('');

          var monthInfo = "";

          if (monthYears[year + month] === undefined) {

            monthYears[year + month] = 1;

            //monthInfo = year + "&nbsp;&nbsp;&nbsp;&nbsp;" + month;
            monthInfo = year + "  " + month;
          }
          else {

            monthYears[year + month] += 1;
            //monthInfo = "&nbsp;";
            monthInfo = "";
            month = "";
            year = "";
          }

          return {
            monthYear: monthInfo,
            year: year,
            month: month,
            day: day
          }
        });

        //var parser = new fileParser($scope.files[0].fileName);

        $scope.fileName = $scope.getProgramName();
        //$scope.fileDate = $scope.files[0].date;

      }).error(function(data, status, headers, config) {

      });

    filenameService.setUpScope($scope);

    //$scope.getDateAsString = function(date) {
    //
    //  var fileDate = new Date(date);
    //
    //  return fileDate.toDateString();
    //};
    //
    //$scope.getProgramName = function() {
    //
    //  if ($scope.files === undefined) {
    //
    //    return "";
    //  }
    //
    //  return $scope.files[0].fileName;
    //};
    //
    //$scope.getFirstEpisodeDate = function() {
    //
    //  if ($scope.files === undefined) {
    //
    //    return "";
    //  }
    //
    //  return new Date($scope.files[0].date).toDateString();
    //};
    //
    //$scope.getLastEpisodeDate = function() {
    //
    //  if ($scope.files === undefined) {
    //
    //    return "";
    //  }
    //
    //  var lastEpisodeIndex = $scope.files.length - 1;
    //
    //  return new Date($scope.files[lastEpisodeIndex].date).toDateString();
    //};
    //
    //$scope.getEpisodeCount = function() {
    //
    //  if ($scope.files === undefined) {
    //
    //    return 0;
    //  }
    //
    //  return $scope.files.length;
    //};
  }]);

