bddApp.controller('authController', ['$scope', '$location', 'authService',
	function ($scope, $location, authService) {

	$scope.login = function() {
		// Fixme: input validation.

		$scope.resetFlags();

		var leScope = $scope;
		authService.login($scope.authFields.email, $scope.authFields.password).then(
			function(succeded) {
				leScope.loginFailed = !succeded;
				leScope.resetFields();
	
				if (succeded)
					leScope.postLoginAction();
			}
		);
	};

	$scope.signup = function() {
		// Fixme: input validation.

		$scope.resetFlags();

		var leScope = $scope;
		authService.signup($scope.authFields.email, $scope.authFields.password).then(
			function(succeded) {
				leScope.signupFailed = !succeded;
				leScope.resetFields();
	
				if (succeded)
					leScope.postLoginAction();
			}
		);
	};

	$scope.postLoginAction = function() {
		var docIdToView = localStorage.getItem('BddDocIdToView');
		if (!docIdToView) {
			$location.path("/docs");
			return;
		}

		$location.path("/preview/" + docIdToView);
	}

	$scope.$on('$viewContentLoaded', function(event) {
		if (authService.getToken()) {
			$location.path( "/docs" );
		}
	});

	$scope.authFields = {
		email: "",
		password: ""
	};

	$scope.loginFailed = false;
	$scope.signupFailed = false;

	$scope.resetFlags = function() {
		$scope.loginFailed = false;
		$scope.signupFailed = false;
	};

	$scope.resetFields = function() {
		$scope.authFields.email = "";
		$scope.authFields.password = "";
	};

}]);