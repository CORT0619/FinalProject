app.controller('registerCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){

	$scope.showModal = false;
	// $scope.toggleModal = function(){
	// 	$scope.showModal = true;
	// }

	$scope.registerMe = function() {

		console.log($scope.username);

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

			if(results)
				$scope.showModal = true;
			//$window.location.href = '/';

		})

	}

}]);