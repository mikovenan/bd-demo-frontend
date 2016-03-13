bddApp.factory('authInterceptorService', [ function () {
  var _request = function (config) {
    config.headers = config.headers || {};

    var jwtToken = localStorage.getItem('bdd-token');
    if (!jwtToken) {
      return config;
    }

    // OK OK, there was supposed to be a Bearer here.
    // This is not the Bearer you're looking for. Move along now :D
    config.headers.Authorization = jwtToken;
    return config;
  };

  return {
    request: _request
  };
}]);
