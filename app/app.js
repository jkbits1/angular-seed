'use strict';

// Declare app level module which depends on views, and components

var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.viewBroadcasts',
  'myApp.viewChooseProgramme',
  'myApp.version'
]);

myApp
  .config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
  //$routeProvider.otherwise({redirectTo: '/viewChooseProgramme'});
}]);

myApp
  .controller('indexCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

     applyBootstrapResources($scope, $sce, "mijlo");
//     applyBootstrapResources($scope, $sce, "mijlo2");
//      applyBootstrapResources($scope, $sce, "slate");


//     applyBootstrapResources($scope, $sce);
//     applyBootstrapResources($scope, $sce, "landing");
//     applyBootstrapResources($scope, $sce, "spacelab");
//    applyBootstrapResources($scope, $sce, "section");


//     applyAngularResources($scope);

    //$rootScope.progId = 1;

    $scope.bootstraps = [
      { name: 'Basic', url: 'cosmo' },
      { name: 'Slate', url: 'slate' }
    ];

    $scope.indexCss = "bootstrap";

    $scope.cssOptions = [
      { label: 'Bootstrap', value: 1 },
      { label: 'Angular', value: 2 }
    ];

    $scope.selectedCss = $scope.cssOptions[0];
        //var indexCss = 0;

    $scope.toggleCss = handleCssChange;

    function handleCssChange() {

      if ($scope.selectedCss.value === 1) {
        //indexCss = 1;

        applyBootstrapResources($scope, $sce);
      }
      else {
        //indexCss = 1;

        applyAngularResources($scope);
      }

    };
  }]);

function applyBootstrapResources($scope, $sce, theme) {

  ////////////////////
  // bootstrap - start

  //$scope.normalize_css = "bower_components/html5-boilerplate/css/normalize.css";
  $scope.normalize_css = "";

  //$scope.bower_main_css = "bower_components/html5-boilerplate/css/main.css";
  $scope.bower_main_css = "";

  if (theme !== undefined){

    //$scope.bootstrap_css = "bootstrap/bootstrap-slate.min.css";
    $scope.bootstrap_css = "bootstrap/bootstrap-" + theme + ".min.css";

    if (theme === "section" || theme === "landing"
        || theme === "mijlo" || theme === "mijlo2")
      $scope.bootstrap_extra_css = "bootstrap/styles-" + theme + ".css";
      $scope.bootstrap_external_css = "bootstrap/external-" + theme + ".css";
  }
  else {

    $scope.bootstrap_css = "bootstrap/bootstrap.css";
  }
  $scope.bootstrap_docs_css = "bootstrap/docs.css";

  $scope.html5shiv_js = $sce.trustAsResourceUrl("https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js");
  $scope.respond_js = $sce.trustAsResourceUrl("https://oss.maxcdn.com/respond/1.4.2/respond.min.js");

  //$scope.app_css = "app.css";
  $scope.app_css = "";
  //$scope.view2_css = "view2.css";
  $scope.view2_css = "";

  // bootstrap - end
  //////////////////
}

function applyAngularResources($scope) {

  ////////////////////
  // angular - start

  $scope.normalize_css = "bower_components/html5-boilerplate/css/normalize.css";
  //$scope.normalize_css = "";

  $scope.bower_main_css = "bower_components/html5-boilerplate/css/main.css";
  //$scope.bower_main_css = "";

  //$scope.bootstrap_css = "bootstrap/bootstrap.css";
  //$scope.bootstrap_docs_css = "bootstrap/docs.css";

  //$scope.html5shiv_js = $sce.trustAsResourceUrl("https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js");
  $scope.html5shiv_js = "";
  //$scope.respond_js = $sce.trustAsResourceUrl("https://oss.maxcdn.com/respond/1.4.2/respond.min.js");
  $scope.respond_js = "";

  $scope.app_css = "app.css";
  //$scope.app_css = "";
  $scope.view2_css = "view2.css";
  //$scope.view2_css = "";

  // angular - end
  //////////////////
}

//      applyBootstrapResources($scope, $sce, "fluc");
// applyBootstrapResources($scope, $sce, "leodis");
