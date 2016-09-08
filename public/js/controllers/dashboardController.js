app.controller('dashCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location){

	$scope.userExists = loginService.func2();

	console.log("userExists? ", $scope.userExists);

	if($scope.userExists){
		$location.path('/dash');
	} else {
		$location.path('/');
	}

}]);