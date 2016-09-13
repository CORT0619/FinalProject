app.directive('compareTo', function($interpolate, $parse){
	return {
		require: 'ngModel',
		link: function(scope, elem, attr, ngModelCtrl){
			var pwdToMatch = $parse(attr.confirmPwd);
			var pwdFn = $interpolate(attr.confirmPwd)(scope);

			$scope.$watch(pwdFn, function(newVal){
				ngModelCtrl.$setValidity('password', ngModelCtrl.$viewValue == newVal);
			});

			ngModelCtrl.$validators.password = function(modelValue, viewValue){
				var value = modelValue || viewValue;
				return value == pwdToMatch(scope);
			};
		}
	};
});


// var compareTo = function(){
// 	return {
// 		require: "ngModel",
// 		scope: {
// 			otherModelValue: "=compareTo"
// 		},
// 		link: function(scope, element, attributes, ngModel){

// 			ngModel.$validators.compareTo = function(modelValue){
// 				return modelValue == scope.otherModelValue;
// 			}

// 			scope.$watch("otherModelValue", function(){
// 				ngModel.$validate();
// 			});
// 		}
// 	};
// };

// app.directive("compareTo", compareTo);

