<?php
session_start();

$redirect = "location:../login/login.php";
$valid = false;

if(array_key_exists('username',$_SESSION))
	if(array_key_exists('role',$_SESSION))
		if($_SESSION['role'] == 'user')
			$valid = true;
if($valid == false)
	header($redirect);
?>

<!DOCTYPE html>
<html>
<head>
   <title>User</title>

   <link href="../kendoui/examples/content/shared/styles/examples-offline.css" rel="stylesheet">
   <link href="../kendoui/styles/kendo.common.min.css" rel="stylesheet">
   <link href="../kendoui/styles/kendo.default.min.css" rel="stylesheet">

   <script src="../kendoui/js/jquery.min.js"></script>
   <script src="../kendoui/js/kendo.web.min.js"></script>
   <script src="../kendoui/examples/content/shared/js/console.js"></script>
   
   <!-- Custom JS & CSS-->
   <link href="style/style_emp_area.css" rel="stylesheet">
   
   <script src="../js/config.js"></script> <!-- HAS TO BE FIRST (becuase the global varialbe) -->
   <script src="js/site_emp_area.js"></script>
   <script src="../js/utils.js"></script>
   

</head>
<body>
   <div id="content_wrapper">
	<div id="header">
			<div id="name-area">
				<input id="user-id" type="hidden" value="<?php echo $_SESSION['username']; ?>"/>
				<span class="sfont"><?php echo $_SESSION['username']; ?> </span>
				<a href='../authentication.php?q=logout' class="k-button">logout</a>
			</div>
	</div>

    <div id="left-pane">
	<h2 class="head-line"> Navigation </h2>

	<ul>
	    <li><a class="k-button nav-button" href="javascript:void(0)" onclick="editDetails()">Edit Details</a></li>
  	    <li><a class="k-button nav-button" href="javascript:void(0)" onclick="manageShifts()">Manage Shifts</a></li>
    	<li><a class="k-button nav-button" href="browseShifts()">Browse Shifts</a></li>
	</ul>


	</div>

	<div id="central-pane"></div> <!-- end of central-pane --> 
	
	<div id="footer"></div>
	
	<div id="window"></div>
</div>
<script>

	
		
</script>
</body>
</html>