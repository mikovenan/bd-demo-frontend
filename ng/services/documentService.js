bddApp.factory('documentService', ['$http', '$q', 'utilService', function($http, $q, utilService) {

	var API_URL = bddApp.API_BASE_URL + "/documents";

	var s3 = null;

	var _createDocument = function(url) {

		var exchangeModel = {
			url: url
		};

		return $http.post(API_URL + "/create", exchangeModel);
	};

	var _sendUsageForResource = function(docId, quota) {
		var exchangeModel = {
			quota: quota
		};

		return $http.post(API_URL + "/" + docId + "/usage", exchangeModel);
	};

	var _getUsageForResources = function() {
		return $http.get(API_URL + "/usage");
	};

	var _getDocById = function(id) {
		return $http.get(API_URL + "/" + id + "/preview");
	};

	var _uploadDocument = function(data) {
	    var defer = $q.defer();
	    if (!s3)
	      _initS3();

	  	// FIXME: Generate a proper GUID.
	    var imageKey = utilService.newGuid();

	    s3.putObject({
	     Bucket: 'bdd-demo',
	     Key: imageKey,
	     ContentType: 'application/pdf',
	     ContentDisposition: 'inline',
	     Body: data,
	    }, function(error, data) {
	      if (error) {
	        defer.reject(error);
	      } else {
	        var url = "https://s3.eu-central-1.amazonaws.com/bdd-demo/" + imageKey;
	        defer.resolve(url);
	      }
	    });

	    return defer.promise;
	}

	// Please no abuse m8, this is prototype code, otherwise I wouldn't leave the secretkey in clear.
	var _initS3 = function() {
		s3 = new AWS.S3({
			region: 'eu-central-1',
			// Fill these in.
		});
	}

	return {
		createDocument: _createDocument,
		sendUsageForResource: _sendUsageForResource,
		getUsageForResources: _getUsageForResources,
		getDocById: _getDocById,
		uploadDocument: _uploadDocument
	};
}]);
