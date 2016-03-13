bddApp.controller('uploadController', ['$scope', '$location', 'authService', 'documentService',
	function ($scope, $location, authService, documentService) {

	$scope.fileNameChanged = function(inputElement) {
		documentService.uploadDocument(inputElement.files[0])
			.then(documentService.createDocument)
			.then(function(response) {
				$location.path('preview/' + response.data.id);
			}, function(error) {
				console.log("Error uploadDocument: " + JSON.stringify(error));
				$location.path("/error");
			});
	};

	$scope.$on('$viewContentLoaded', function(event) {
		if (!authService.getToken()) {
			$location.path( "/" );
		}
	});

}]);