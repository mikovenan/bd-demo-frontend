bddApp.factory('authService', ['$http', '$q', function($http, $q) {

	var API_URL = bddApp.API_BASE_URL + "/auth";

	var _login = function(email, password) {
		var defer = $q.defer();

		var transferModel = {
			email: email,
			password: password
		};

		// This is prototype code. I'm sending passwords in clear http.
		// Prod wise, have this over https.
		$http.post(API_URL + "/login", transferModel).then(
			function(token) {
				localStorage.setItem('bdd-token', token.data);
				defer.resolve(true);
			}, function(error) {
				defer.resolve(false);
			}
		);

		return defer.promise;
	};

	var _signup = function(email, password) {
		var defer = $q.defer();

		var transferModel = {
			email: email,
			password: password
		};

		// This is prototype code. I'm sending passwords in clear http.
		// Prodwise, have this over https.
		$http.post(API_URL + "/signup", transferModel).then(
			function(token) {
				localStorage.setItem('bdd-token', token.data);
				defer.resolve(true);
			}, function(error) {
				defer.resolve(false);
			}
		);

		return defer.promise;
	};

	var _getToken = function() {
		var token = localStorage.getItem('bdd-token');
		return token ? token : null;
	};

	return {
		login: _login,
		signup: _signup,
		getToken: _getToken
	};
}]);