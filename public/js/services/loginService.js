app.factory('loginService', ['$http', function($http){

	var user = null;

		var logMeIn = function(username, password){

			var data = $.param({
				user: username,
				pass: password
			});

			return $http({
				method: 'POST',
				url: '/login',
				data: data,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}

			}).then(function success(results){
				console.log("success is ", results);
				user = true;

				/*$scope.role = results.data.passport.user.role;

				if($scope.role == 'stud')
					$scope.stud = true;
				else
					$scope.coach = true;*/


				return results;


			}, function error(results){
				user = false;
				console.log("err is ", results);
				return results;

			});

		};

		var checkLoggedIn = function(){
			if(user){
				return true;
			} else {
				return false;
			}
		};

		return {
			func1: logMeIn,
			func2: checkLoggedIn
		}

return loginService;
	
}]);