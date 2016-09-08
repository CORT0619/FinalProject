app.controller('studentCtrl', ['$scope', 'studentService', '$location', '$localStorage',  'loginService', function($scope, studentService, $location, $localStorage, loginService){

		$scope.userExists = loginService.func2();

		console.log("userExists? ", $scope.userExists);

		if($scope.userExists){
			$scope.loggedIn = true;
			$location.path('/students');
		} else {
			$scope.loggedIn = false;
			$location.path('/');
		}

		studentService.getStudents()
			.then(function(results){
				console.log("results are ", results);

				$scope.students = results.data;
			});



}]);