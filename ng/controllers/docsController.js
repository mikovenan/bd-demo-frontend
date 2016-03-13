bddApp.controller('docsController', ['$scope', '$location', 'authService', 'documentService',
	function ($scope, $location, authService, documentService) {

	$scope.noDocs = function() {
		if (!$scope.documentUsageQuotas)
			return true;

		return Object.keys($scope.documentUsageQuotas).length === 0;
	}

	documentService.getUsageForResources().then(function(data) {
		var documentUsageQuotas = data.data;

		var documentUsageQuotasMap = {};
		for (var i = 0; i < documentUsageQuotas.length; ++i) {
			documentUsageQuotas[i].url = '/#/preview/' + documentUsageQuotas[i].docId;

			if (!documentUsageQuotasMap[documentUsageQuotas[i].url])
				documentUsageQuotasMap[documentUsageQuotas[i].url] = [];

			documentUsageQuotasMap[documentUsageQuotas[i].url].push(documentUsageQuotas[i]);
		}

		$scope.documentUsageQuotas = documentUsageQuotasMap;
	}, function(error) {
		console.log("Error getUsageForResources: " + JSON.stringify(error));
		$location.path("/error");
	})

	$scope.$on('$viewContentLoaded', function(event) {
		if (!authService.getToken()) {
			$location.path( "/" );
		}
	});

	$scope.documentUsageQuotas = null;

}]);