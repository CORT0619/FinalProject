app.controller('profileCtrl', ['profileService', '$scope', 'loginService','$http', '$location', '$sessionStorage', '$localStorage', '$stateParams', function(profileService, $scope, loginService, $http, $location, $sessionStorage, $localStorage, $stateParams){

	$scope.userExists = loginService.func2();

	console.log("userExists? ", $scope.userExists);

	$scope.user = $localStorage.userData;

	$scope.name = $scope.user.name;
	$scope.school = $scope.user.school;
	$scope.email = $scope.user.email;
	$scope.username = $scope.user.username;

	var username = $scope.username;	

	$stateParams.username= $scope.username;

	$scope.showModal = false;

	$scope.changeProfInfo = function(confpass){

		if($scope.pass != $scope.confpass){
			$scope.passwordsMatch = true;
			$scope.pass = "";
			$scope.confpass = "";
			return false;
		}
			$scope.passwordsMatch = false;
			var results = profileService.updateProfile(username, confpass)
				.then(function(results){

				console.log("results ", results);

				if(results.status == 200)
					$scope.showModal = true;

				$scope.pass = "";
				$scope.confpass = "";

			});


	}


	if($scope.userExists){
		$scope.loggedIn = true;
		$location.path('/profile');
	} else {
		$scope.loggedIn = false;
		$location.path('/');
	}	

	}]);

