bddApp.controller('previewController', ['$scope', '$location', '$routeParams', '$interval',
	'authService', 'documentService', 'utilService',
	function ($scope, $location, $routeParams, $interval, authService, documentService, utilService) {

	$scope.doc = null;
	$scope.interval = null;
	$scope.currentUrl = $location.absUrl();

	$scope.$on('$viewContentLoaded', function(event) {
		if (!authService.getToken()) {
			var resId = $routeParams.id;
			localStorage.setItem('BddDocIdToView', resId);
			
			$location.path( "/" );
			return;
		}

		if (localStorage.getItem('BddDocIdToView'))
			localStorage.removeItem('BddDocIdToView');

		$scope.doc = null;
		var resId = $routeParams.id;
		documentService.getDocById(resId).then(function(response) {
			$scope.doc = response.data;

			$scope.registerViewingQuota();
		},
		function(error) {
			console.log("Error getDocById: " + JSON.stringify(error));
			$location.path("/error");
		});
	});

	$scope.$on("$destroy",function(){
	    if (angular.isDefined($scope.interval))
	        $interval.cancel($scope.interval);
	});

	$scope.registerViewingQuota = function() {
		$scope.interval = $interval($scope.tick, 1000);
	}

	$scope.tick = function() {
		if (utilService.isPageHidden())
			return;

		documentService.sendUsageForResource($scope.doc.id, 1);
	}

}]);