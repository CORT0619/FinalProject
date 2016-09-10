<?php echo '<?xml version="1.0" encoding="UTF-8" ?>' ?>

<!DOCTYPE html PUBLIC "-//W3C/DTD XHTML 1.0 Strict //EN" "http://www.w3.org/TR/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>

	  <title>Student - Update Profile</title>
	  
	  <meta name="viewport" content="width=device-width, initial-scale=1"><!-- bootstrap --> 
	  	  
	  
	  <!-- jquery files -->
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	
	  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
	  
	  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
	  
	  
	  
	  <!-- Latest compiled and minified CSS -->
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

	  <!-- Optional theme -->
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

	  <!-- Latest compiled and minified JavaScript -->
	  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
	  
	  
	  
	  <!-- Custom CSS Sheets  -->
	  <link rel="stylesheet" type="text/css" href="../css/styles.css" />
	  <link rel="stylesheet" type="text/css" href="../css/sidebar.css" />

	  	  
</head>

<body>

<div id="wrapper">

	<div class="nav-bar navbar-fixed-top" style="background-color: #000">
		<div class="col-sm-12 topHeading">
			<!--<a href="#" class="btn btn-success" id="menu-toggle">Toggle Menu</a>-->
			<a href="#" id="menu-toggle"><button type="button" class="btn btn-defalt glyphicon glyphicon-menu-hamburger"></button></a>
			
			Logout
		</div>
	</div>

	<div class="container-fluid" id="centered">
		<div class="row">
			<div class="sidebar" id="sidebar-wrapper">
				<ul class="sidebar-nav">
					<li><a href="uploadTrans">Uploads</a></li>
					<li><a href="#">Update Profile</a></li>
					<li><a href="#">Change Password</a></li>
					<li><a href="#">Logout</a></li>
				</ul>
			</div>
	
		<div id="page-content-wrapper">
		  <div class="col-sm-12" id="content_wrapper">

			<h2>Football Recruit Info</h2>

			<p id="req">* = Required</p>
			
			<form role="form" action="updateProf" method="post">
			
			<div class="form-group"><label for="">* Name</label></div>
			<div class="form-group"><input type="text" id="first_name" name="first_name" placeholder="First Name" />&nbsp;<input type="text" id="last_name" name="last_name" placeholder="Last Name" /></div>
			
			<p><label for="">* Position</label></p>
			<table id="tblpos"><tr>
			<td><div class="checkbox"><input type="checkbox" id="pos" name="pos" />QB</div></td>
			<td><input type="checkbox" id="pos" name="pos" />RB</td>
			<td><input type="checkbox" id="pos" name="pos" />FB</td>
			<td><input type="checkbox" id="pos" name="pos" />WR</td>
			<td><input type="checkbox" id="pos" name="pos" />OL</td></tr>
			
			<tr><td><input type="checkbox" id="pos" name="pos" />DL</td>
			<td><input type="checkbox" id="pos" name="pos" />LB</td>
			<td><input type="checkbox" id="pos" name="pos" />DB</td>
			<td><input type="checkbox" id="pos" name="pos" />S</td>
			<td><input type="checkbox" id="pos" name="pos" />K/P</td></tr>
			</table>
			
			<p><label for="school_type">* High School, Juco, or Prep</label></p>
			<p><input type="radio" id="school_type" name="school_type" />HS
			<input type="radio" id="school_type" name="school_type" />JC
			<input type="radio" id="school_type" name="school_type" />Prep</p>
			
			<p><label for="">* State</label></p>
			<p><select name="" id="">	
			  <option value=""></option>	
			<?php 
			
				$states = array('AL'=>"Alabama",  
				'AK'=>"Alaska",  
				'AZ'=>"Arizona",  
				'AR'=>"Arkansas",  
				'CA'=>"California",  
				'CO'=>"Colorado",  
				'CT'=>"Connecticut",  
				'DE'=>"Delaware",  
				'DC'=>"District Of Columbia",  
				'FL'=>"Florida",  
				'GA'=>"Georgia",  
				'HI'=>"Hawaii",  
				'ID'=>"Idaho",  
				'IL'=>"Illinois",  
				'IN'=>"Indiana",  
				'IA'=>"Iowa",  
				'KS'=>"Kansas",  
				'KY'=>"Kentucky",  
				'LA'=>"Louisiana",  
				'ME'=>"Maine",  
				'MD'=>"Maryland",  
				'MA'=>"Massachusetts",  
				'MI'=>"Michigan",  
				'MN'=>"Minnesota",  
				'MS'=>"Mississippi",  
				'MO'=>"Missouri",  
				'MT'=>"Montana",
				'NE'=>"Nebraska",
				'NV'=>"Nevada",
				'NH'=>"New Hampshire",
				'NJ'=>"New Jersey",
				'NM'=>"New Mexico",
				'NY'=>"New York",
				'NC'=>"North Carolina",
				'ND'=>"North Dakota",
				'OH'=>"Ohio",  
				'OK'=>"Oklahoma",  
				'OR'=>"Oregon",  
				'PA'=>"Pennsylvania",  
				'RI'=>"Rhode Island",  
				'SC'=>"South Carolina",  
				'SD'=>"South Dakota",
				'TN'=>"Tennessee",  
				'TX'=>"Texas",  
				'UT'=>"Utah",  
				'VT'=>"Vermont",  
				'VA'=>"Virginia",  
				'WA'=>"Washington",  
				'WV'=>"West Virginia",  
				'WI'=>"Wisconsin",  
				'WY'=>"Wyoming");
				
				foreach($states as $abbrev => $name)
				{
					echo "<option value=\"$name\">$abbrev</option>";
					
				}
			
			?></select></p>
			
			<p><label for="">* Graduating Year</label></p>
			<p><input type="text" id="" name="" /></p>
			
			<p><label for="">GPA</label></p>
			<p><input type="text" id="" name="" /></p>
			
			<p><label for="sat">SAT</label></p>
			<p><input type="text" id="sat" name="sat" /></p>
			
			<p><label for="act">ACT</label></p>
			<p><input type="text" id="act" name="act" /></p>

			<p class="lbl"><label class="lblTextDesc" for="game_link">Highlights/Game Film</label></p>
			<p class="txtDesc">Insert YouTube/Hudl/etc. link below</p>
			<p><input type="text" id="game_link" name="game_link" /></p>
			
			<p><label for="phone">* Phone</label></p>
			<p><input type="text" id="phone" name="phone" /></p>
			
			<p class="lbl"><label class="lblTextDesc" for="fb">Facebook</label></p>
			<p class="txtDesc">Link to facebook profile</p>
			<p><input type="text" id="fb" name="fb" /></p>
			
			<p class="lbl"><label class="lblTextDesc" for="twitter">Twitter</label></p>
			<p class="txtDesc" style="margin-top:0">Link to twitter profile</p>
			<p><input type="text" id="twitter" name="twitter" /></p>
			
			<fieldset id="coach_info">
			   <legend id="leg_coachInfo">Coach Contact Info:</legend>
			   
			<p><label for="">Name</label></p>
			<p><input type="text" id="" name="" placeholder="First Name" />
			<input type="text" id="" name="" placeholder="Last Name" /></p>
			
			<p><label for="">Phone</label></p>
			<input type="text" id="" name="" /></p>
			
			<p><label for="coach_email">Email</label></p>
			<input type="text" id="coach_email" name="coach_email" /></p>
			</fieldset>
			
			<p><input type="submit" class="btn btn-default btnFootballInfo" id="btnFootballSubmit" name="btnFootballSubmit" tabindex="" value="Update" />
			
			<input type="reset" class="btnFootballInfo" id="btnFootballReset" name="btnFootballReset" tabindex="" value="Cancel" /></p>
			</form>
	      </div>
		</div>
	</div>	
</div>		

	<div class="container-fluid">
		<div class="row" style="background-color: #000">
			<div class="col-sm-12">
				<div class="footer" id="footer">
				
				This is text
					<?php include_once('../includes/copyright.php'); ?>
				</div>
			</div>
		</div>
	</div>	
</div>
	



	  <script>
		$("#menu-toggle").click(function(e){
			e.preventDefault();
			$("#wrapper").toggleClass("menuDisplayed");
		});
	  </script>

</body>

</html>