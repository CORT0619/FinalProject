app.controller('uploadsCtrl', ['$scope', function($scope){

		$scope.partialDownloadLink = 'http://localhost:3000/#/download?filename=';
		$scope.filename= '';

		$scope.uploadFile = function(){
			$scope.processDropzone();
		}

		$scope.reset = function(){
			$scope.resetDropzone();
		}
	
}]);