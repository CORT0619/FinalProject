app.controller('menubarCtrl', ['$rootScope', '$scope', 'loginService','$http', '$location', '$state', '$window', '$localStorage', function($rootScope, $scope, loginService, $http, $location, $state, $window, $localStorage){

	$scope.$state = $state;
	$scope.$storage = $localStorage;

	$scope.showLogin = false;
	$scope.isLoggedIn;

	// $scope.coach = false;
	// $scope.stud = false;


	$scope.loginWrong = false;
	$scope.login = "";
	$scope.password = "";
	$scope.isActive = false;

	$scope.toggle = function(){
		$scope.showLogin = !$scope.showLogin;
	}

	$scope.moveDown = function(){
		$scope.isActive = !$scope.isActive;
	}


	$scope.logMeIn = function(username, password){
		$scope.isLoggedIn = false;

		loginService.func1(username, password)
			.then(function(res){

				console.log("res is ", res);

				$scope.role = res.data.passport.user.role;

				if($scope.role == 'stud'){
					//show student links
					
					$rootScope.stud = true;
					//$scope.stud = true;
					
					//$scope.coach = false;
					console.log("stud ", $rootScope.stud);

				} else {

					//show coach links

					$rootScope.coach = true;
					$scope.coach = true;


					//$scope.stud = false;
				}

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
					$scope.role = $scope.user.role;

					console.log("role is ", $scope.role);


					// if($scope.role == 'stud'){

					// 	//show student links
					// 	$scope.stud = true;
					// 	//$scope.coach = false;

					// } else {

					// 	//show coach links
					// 	$scope.coach = true;
					// 	//$scope.stud = false;
					// }

					$location.path('/dash');
					$scope.showLogin = !$scope.showLogin;

					console.log("results ", res);

					return $scope.user; 

				} /*else /*{
					$scope.showModal = true;
					$window.location.reload();
				}*/

			}).catch(function(){
				$scope.loginWroncleg = true;
				$scope.login = "";
				$scope.password = "";

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

