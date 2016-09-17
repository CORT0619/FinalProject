app.directive('dropzone', function(){
	return {
		restrict: 'C',
		link: function(scope, element, attrs){
			var config = {
				url: '/uploads', // or localhost:3000/upload http://localhost:3000/#/uploadIt
				maxFilesize: 100,
				paramName: "file",
				maxThumbnailFilesize: 10,
				parallelUploads: 1,
				autoProcessQueue: true,
				previewsContainer: '#dropzone'
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
					console.log("file ", file);
					console.log("response ", response)

					var elm = document.getElementsByClassName("dz-progress");
					elm[0].parentNode.removeChild(elm[0]);


					file.previewElement.appendChild(file._downloadLink);
					//var newDiv = document.createElement('div');
					//newDiv.innerHTML = "Link goes here";					
					//file.previewElement.appendChild(newDiv);

					//file.previewElement.appendChild(document.createTextNode(response)); 
					
					//alert("File uploaded")
					return file.previewElement.classList.add("dz-success");
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