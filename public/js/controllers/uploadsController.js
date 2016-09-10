app.controller('uploadsCtrl', ['$scope', 'loginService', '$location', '$sessionStorage', '$localStorage', '$state', function($scope, loginService, $location, $sessionStorage, $localStorage, $state){

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

		$scope.user = $localStorage.userData;

		$scope.username = $scope.user.username;

		// $state.go("uploads", {username: $scope.user.username});

		if($scope.userExists){
			$scope.loggedIn = true;
			//$location.path('/uploads/'+ );
		} else {
			$scope.loggedIn = false;
			$location.path('/');
		}	

}]);