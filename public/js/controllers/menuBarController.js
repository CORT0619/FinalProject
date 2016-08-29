app.controller('menubarCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){

	$scope.showLogin = false;

	$scope.toggle = function(){
		$scope.showLogin = !$scope.showLogin;
	}

	$scope.logMeIn = function(username, password){

		var data = $.param({
			user: username,
			pass: password
		});

		$http({
			method: 'POST',
			url: '/login',
			data: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}

		}).then(function(results){

			console.log("results.url ", results.data.url);

			// $location.path(results.data.url);
			// $scope.$apply();

			$window.location.href= results.data.url;
		})
	}

	}]);

