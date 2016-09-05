var app = angular.module('app', [
		'ui.router'
	])
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'views/home.html'
			})
			.state('dash', {
				url: '/dash',
				templateUrl: 'views/dashboard.html',
				controller: 'dashCtrl'/*,
				resolve: {
					loggedin: logMeIn
				}*/
			})
			.state('profile', {
				url: '/profile',
				templateUrl: 'views/profile.html'
			})
			.state('students', {
				url: '/students',
				templateUrl: 'views/students.html'
			})
			.state('uploads', {
				url: '/uploads',
				templateUrl: 'views/uploads.html'
			});

	}])
	/*.config(function($httpProvider){
		$httpProvider.interceptors.push(function($q, $location){
			return {
				response: function(response){
					//$location.path(results.data.url);
					$location.path('/dash');
					return response;
				},
				responseError: function(response){
					if(response.status === 401)
						$location.url('/');
					return $q.reject(response);
				}
			};
		});

	});*/
