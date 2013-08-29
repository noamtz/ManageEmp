<?php
session_start();
if(!isset($_SESSION['username']) ){
	header("location:login.html");
}
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
   <script src="js/site_emp_area.js"></script>
   

</head>
<body>
   <div id="content_wrapper">
	<div id="header">
			<span><?php echo $_SESSION['username']; ?> <span>
			<a href='../login.php?q=logout'>logout</a>
	</div>

    <div id="left-pane">
	<h2 class="head-line"> Navigation </h2>

	<ul>
	    <li><a class="k-button nav-button" href="javascript:void(0)" onclick="">Edit Details</a></li>
  	    <li><a class="k-button nav-button" href="javascript:void(0)" onclick="manageShifts()">Manage Shifts</a></li>
    	<li><a class="k-button nav-button" href="browseShifts()">Browse Shifts</a></li>
	</ul>


	</div>

	<div id="central-pane"></div> <!-- end of central-pane --> 
	
	<div id="footer"></div>
	
	<div id="window"></div>
</div>

</body>
</html>
