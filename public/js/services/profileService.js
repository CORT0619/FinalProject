app.factory('profileService', ['$http', '$q', function($http, $q){

		var updateProfile = function(username, pass){

			var data = $.param({
				username: username,
				password: pass
			});

			return $http({
				method: 'POST',
				url: '/profile',
				data: data,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}

			}).then(function success(results){
				console.log("success is ", results);
				return results;

			}, function error(results){
				console.log("err is ", results);
				return results;
			});

		};

		return {
			updateProfile: updateProfile
		}

return profileService;
	
}]);