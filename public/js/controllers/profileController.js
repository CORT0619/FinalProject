app.controller('profileCtrl', ['$scope', 'loginService','$http', '$location', '$sessionStorage', '$localStorage', function($scope, loginService, $http, $location, $sessionStorage, $localStorage){

	$scope.userExists = loginService.func2();

	console.log("userExists? ", $scope.userExists);

	$scope.user = $localStorage.userData;

	console.log("user here is ", $scope.user);

	$scope.name = $scope.user.name;
	$scope.school = $scope.user.school;
	$scope.email = $scope.user.email;
	$scope.username = $scope.user.username;	


	if($scope.userExists){
		$scope.loggedIn = true;
		$location.path('/profile');
	} else {
		$scope.loggedIn = false;
		$location.path('/');
	}	

	}]);

