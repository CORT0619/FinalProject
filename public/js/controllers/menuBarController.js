app.controller('menubarCtrl', ['$scope', '$http', '$window', '$location', '$state', function($scope, $http, $window, $location, $state){

	$scope.$state = $state;

	$scope.showLogin = false;
	$scope.isLoggedIn;

	$scope.toggle = function(){
		$scope.showLogin = !$scope.showLogin;
	}

	$scope.logMeIn = function(username, password/*, $q, $timeout, $http, $location, $rootScope*/){
		$scope.isLoggedIn = false;
		var data = $.param({
			user: username,
			pass: password
		});

		//var deferred = $q.defer();

		$http({
			method: 'POST',
			url: '/login',
			data: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}

		})/*.success(function(user){
			if(user !== '0')
				deferred.resolve();
			else {
				$rootScope.message = 'Please login.';
				deferred.reject();
				$location.url('/');
			}

		});*/

		//return deferred.promise;
		.then(function(results){

			console.log("results.url ", results.data.url);

			///$window.location.href= results.data.url;
			$location.path(results.data.url);
			$scope.isLoggedIn = true;
			console.log($scope.isLoggedIn);
		});
	}

	}]);

app.service('logMeIn', function(){

});

