app.controller('menubarCtrl', ['$scope', 'loginService','$http', '$location', '$state', '$window', '$sessionStorage', '$localStorage', function($scope, loginService, $http, $location, $state, $window, $sessionStorage, $localStorage){

	$scope.$state = $state;
	$scope.$storage = $localStorage;

	$scope.showLogin = false;
	$scope.isLoggedIn;
	

	$scope.toggle = function(){
		$scope.showLogin = !$scope.showLogin;
	}


	$scope.logMeIn = function(username, password){
		$scope.isLoggedIn = false;

		loginService.func1(username, password)
			.then(function(res){

				$scope.userExists = loginService.func2();

				if($scope.userExists){
					$scope.isLoggedIn = true;

				 $scope.user = {
				 	username: res.data.passport.user.username,
					name: res.data.passport.user.name,
					email: res.data.passport.user.email,
					school: res.data.passport.user.school,
					id: res.data.passport.user._id,
					role: res.data.passport.user.role
				 }

				
				 console.log("$scope.user ", $scope.user);
				 $localStorage.userData = $scope.user; 

				 $scope.username = $scope.user.username;

					$location.path('/dash');
					$scope.showLogin = !$scope.showLogin;

					console.log("results ", res);

					return  $scope.user; 

				} else {
					$window.location.reload();
				}

			}).catch(function(){
				console.log("login failed");
				// $window.location.reload();
			});
	}


	/*if($scope.userExists){
	$scope.username = $localStorage.userData.username;

	console.log("$scope.username is now ", $scope.username);
	} else {
		$scope.loggedIn = false;
		$location.path('/');
	}*/


	}]);

