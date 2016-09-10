var app = angular.module('app', [
		'ui.router', 'ngStorage'
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
				controller: 'dashCtrl'
			})
			.state('profile', {
				// url: '/profile/:username',
				url: '/profile',
				// params: {
				// 	username: null
				// },
				// resolve: {
				// 	user: function($stateParams){
				// 		return $scope.username;
				// 	}
				// },
				templateUrl: 'views/profile.html',
				controller: 'profileCtrl'
			})
			.state('students', {
				url: '/students',
				templateUrl: 'views/students.html'
			})
			.state('uploads', {
				url: '/uploads',
				templateUrl: 'views/uploads.html'
			});

	}]);
