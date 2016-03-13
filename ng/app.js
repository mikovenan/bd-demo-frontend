var bddApp = angular.module('bddApp', ['ngRoute']);

// Prototype code.
// bddApp.API_BASE_URL = "http://104.155.77.182:8080";
bddApp.API_BASE_URL = "http://localhost:8080";
bddApp.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../views/auth.html',
      controller: 'authController'
    })
    .when('/docs', {
      templateUrl: '../views/docs.html',
      controller: 'docsController'
    })
    .when('/upload', {
      templateUrl: '../views/upload.html',
      controller: 'uploadController'
    })
    .when('/preview/:id', {
      templateUrl: '../views/preview.html',
      controller: 'previewController'
    })
    .when('/error', {
      templateUrl: '../views/error.html'
    })
    .otherwise({redirectTo: '/'});

    $httpProvider.interceptors.push('authInterceptorService');
});

bddApp.directive('embedSrc', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var current = element;
      scope.$watch(function() { return attrs.embedSrc; }, function () {
        var clone = element.clone().attr('src', attrs.embedSrc);
        current.replaceWith(clone);
        current = clone;
      });
    }
  };
});

bddApp.filter('secondsToDateTime', function() {
    return function(seconds) {
        var d = new Date(0,0,0,0,0,0,0);
        d.setSeconds(seconds);
        return d;
    };
});