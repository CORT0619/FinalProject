app.controller('uploadsCtrl', ['$scope', 'loginService', '$location', '$sessionStorage', '$localStorage', function($scope, loginService, $location, $sessionStorage, $localStorage){

		$scope.partialDownloadLink = 'http://localhost:3000/#/download?filename=';
		$scope.filename= '';

		$scope.uploadFile = function(){
			$scope.processDropzone();
		}

		$scope.reset = function(){
			$scope.resetDropzone();
		}

		$scope.userExists = loginService.func2();

		console.log("userExists? ", $scope.userExists);

			console.log("session storage ", $sessionStorage.name);

			console.log("localStorage ", $localStorage.name);
			console.log("localstorage role ", $localStorage.role);

		if($scope.userExists){
			$scope.loggedIn = true;
			//$location.path('/uploads/'+ );
		} else {
			$scope.loggedIn = false;
			$location.path('/');
		}	

}]);