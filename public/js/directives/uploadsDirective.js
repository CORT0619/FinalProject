app.directive('dropzone', function(){
	return {
		restrict: 'C',
		link: function(scope, element, attrs){
			var config = {
				url: '/uploads', // or localhost:3000/upload http://localhost:3000/#/uploadIt
				maxFilesize: 100,
				paramName: "uploadfile",
				maxThumbnailFilesize: 10,
				parallelUploads: 1,
				autoProcessQueue: true
			};

			var eventHandlers = {
				'addedfile': function(file){
					scope.file = file;
					if(this.files[1]!= null){
						this.removeFile(this.files[0]);
					}
					scope.$apply(function(){
						scope.fileAdded = true;
					});
				},
				'success': function(file, response){
					// return file.previewElement.classList.add("dz-success");
					console.log('success');
				}
			};

			dropzone = new Dropzone(element[0], config);

			angular.forEach(eventHandlers, function(handler, event){
				dropzone.on(event, handler);
			});

			scope.processDropzone = function(){
				dropzone.processQueue();
			};

			scope.resetDropzone = function(){
				dropzone.removeAllFiles();
				dropzone.emptyfiles();
			}
		}
	}
});