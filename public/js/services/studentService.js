app.factory('studentService', ['$http', function($http){

		var getStudents = function(){

			return $http({
				method: 'GET',
				url: '/students',
				// data: data,
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
			getStudents: getStudents
		}

return studentService;
	
}]);