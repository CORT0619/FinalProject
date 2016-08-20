$(document).ready(function(){

	/*$('#loginContainer').on('mouseover', function(){

		$('#loginBox').css('display', 'block');
	});

	$('#loginContainer').on('mouseout', function(){

		$('#loginBox').css('display', 'none');
	});*/

	$('#loginContainer').on('mouseover', function(){

		if($('#loginBox').is(":hidden")){

			$('#loginBox').slideDown();
			
		} else {
			$('#loginBox').hide("slow");
		}
	});

});