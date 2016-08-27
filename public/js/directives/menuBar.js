
app.directive('menuBar', function(){
	
	return {
		restrict: 'E',
		templateUrl: 'js/directives/menuBar.html',
		// scope: true,
		scope: {},
		transclude: true,
		link: function(scope, element, attrs){

			// var userIcon = angular.element(element.children()[]), opened = false;

			// userIcon.bind('click', toggle);

			function toggle(){
				opened = !opened;
				// element.removeClass(opened ? 'closed' : 'opened');
				// element.addClass(opened ? 'opened' : 'closed');
			}

			toggle();

		}
	};
});