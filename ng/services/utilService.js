bddApp.factory('utilService', [function() {

	var _newGuid = function() {
	    function s4() {
	    	return Math.floor((1 + Math.random()) * 0x10000)
		        .toString(16)
		        .substring(1);
	    }
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    	s4() + '-' + s4() + s4() + s4();
	};

	var _isPageHidden = function() {
		// Ideally, this should be combined with window show and blur to yield better results.
	    return document.hidden || document.msHidden || document.webkitHidden || document.mozHidden;
	};

	return {
		newGuid: _newGuid,
		isPageHidden: _isPageHidden
	};
}]);
