app.controller('registerCtrl', ['$scope', '$http', function($scope, $http){

	$scope.registerMe = function() {

		var data = $.param({
			name: $scope.firstName + ' ' + $scope.lastName,
			user: $scope.username,
			pass: $scope.pass,
			email: $scope.email,
			school: $scope.school,
			accType: $scope.accType 
		});

		$http({
			method: 'POST',
			url: '/register',
			data: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(results){

			console.log("results ", results);
		})

	}

}]);