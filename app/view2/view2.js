'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', function($scope, $http) {

    $http.get('http://localhost:3030')
      .success(function (data, status, headers, config) {
        $scope.files = data.files;

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

    $scope.getDateAsString = function(date) {

      var fileDate = new Date(date);

      return fileDate.toDateString();
    };

    $scope.getProgramName = function() {

      if ($scope.files === undefined) {

        return "";
      }

      return $scope.files[0].fileName;
    };

    $scope.getFirstEpisodeDate = function() {

      if ($scope.files === undefined) {

        return "";
      }

      return new Date($scope.files[0].date).toDateString();
    };

    $scope.getLastEpisodeDate = function() {

      if ($scope.files === undefined) {

        return "";
      }

      var lastEpisodeIndex = $scope.files.length - 1;

      return new Date($scope.files[lastEpisodeIndex].date).toDateString();
    };

    $scope.getEpisodeCount = function() {

      if ($scope.files === undefined) {

        return 0;
      }

      return $scope.files.length;
    };


  }]);

function fileParser(file) {

  this.getDate = function(){

    var regexFileName = /[a-zA-Z\s]*/;

    var fileDate = getFileInfo(file, regexFileName);
  }

  function getFileInfo(fileName, regex) {

    var items = fileName.match(regex);
    var itemInfo = undefined;

    items.forEach(function (item) {

      //console.log("matches:", item);

      itemInfo = item;
    });

    return itemInfo;
  }
}

