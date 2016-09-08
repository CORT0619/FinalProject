app.controller('homeCtrl', ['$scope','$http', 'loginService', function($scope, $http, loginService){

	$scope.userExists = loginService.func2();

	console.log("userExists? ", $scope.userExists);

	if($scope.userExists){
		$scope.loggedIn = true;
	} else {
		$scope.loggedIn = false;
	}

}]);