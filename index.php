<?php
session_start();

$redirect = "location:login/login.php";
$valid = false;

if(array_key_exists('username',$_SESSION))
	if(array_key_exists('role',$_SESSION))
		if($_SESSION['role'] == 'admin')
			$valid = true;
if($valid == false)
	header($redirect);
?>



<!DOCTYPE html>
<html>

<head>
   <title>Admin</title>

   <link href="kendoui/examples/content/shared/styles/examples-offline.css" rel="stylesheet">
   <link href="kendoui/styles/kendo.common.min.css" rel="stylesheet">
   <link href="kendoui/styles/kendo.default.min.css" rel="stylesheet">
	
  <!-- <script src="kendoui/js/jquery.min.js"></script> -->
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
   <script src="kendoui/js/kendo.web.min.js"></script>
   <script src="kendoui/examples/content/shared/js/console.js"></script>
   
   <!-- Custom Style & Scripts-->
   <link href="style/site.css" rel="stylesheet">
   
   <script src="js/config.js"></script> <!-- HAS TO BE FIRST (becuase the global varialbe) -->
   <script src="js/site.js"></script>
   <script src="js/utils.js"></script>

</head>

<body>

    <div id="content_wrapper" class="background">

        <div id="header">
			<div id="insetBgd">
				<h1 class="insetType">Manage Employees</h1>
			</div>
			
			<div id="name-area">
				<span class="sfont"><?php echo $_SESSION['username']; ?> </span>
				<a href='authentication.php?q=logout' class="k-button">logout</a>
			</div>

		</div>

		<div id="left-pane">
			<h2 class="head-line"> Navigation </h2>

			<ul>
				<li><a class="k-button nav-button" href="javascript:void(0)" onclick="manageUsers()">Users</a></li>
				<li><a class="k-button nav-button" href="javascript:void(0)" onclick="manageShifts()">Shifts</a></li>
				<li><a class="k-button nav-button" href="javascript:void(0)" onclick="notImpl()">Training</a></li>
				<li><a class="k-button nav-button" href="javascript:void(0)" onclick="notImpl()">Contact</a></li>
			</ul>
		</div>

		<div id="central-pane"></div>
	
		<div id="footer">
			<h4 class="insetType">All Rights Preserved To Noam Tzumie, Alpha Version</h4>
		</div>
		
		<div id="window"></div>
		
	</div>
	
		<script id="popup_editor_users" type="text/x-kendo-template">		
			<div class="k-edit-form-container">

			<div class="k-edit-label">
				<label for="email">Email: </label>
			</div>
			<div data-container-for="email" class="k-edit-field">
			<input type="email" class="k-input k-textbox" name="Email" data-bind="value:email" required>
			</div>
			
			<div class="k-edit-label">
				<label for="firstname">First Name: </label>
			</div>
			<div data-container-for="firstname" class="k-edit-field">
			<input type="text" class="k-input k-textbox" name="firstname" data-bind="value:firstname" required>
			</div>
			<div class="k-edit-label">
				<label for="lastname">Last Name: </label>
			</div>
			<div data-container-for="lastname" class="k-edit-field">
			<input type="text" class="k-input k-textbox" name="lastname" data-bind="value:lastname" required>
			</div>
			<div class="k-edit-label">
				<label for="phone">Phone: </label>
			</div>
			<div data-container-for="lastname" class="k-edit-field">
			<input type="phone" class="k-input k-textbox" name="phone" data-bind="value:phone">
			</div>
			<div class="k-edit-label">
				<label for="roles">Roles: </label>
			</div>	
			<!-- drop down list editor for field: "roles" -->
			<div data-container-for="role" class="k-edit-field">
			<input name="role" id="uroleMS"
				data-bind="value:RoleName" 
				data-value-field="RoleID" 
				data-text-field="RoleName" 
				data-source="dropDownDataSource" 
				data-role="multiselect"/>
			</div>
			</div>
		</script>
		
		<script id="popup_editor_shifts" type="text/x-kendo-template">		
			<div class="k-edit-form-container">
				<div class="k-edit-label">
					<label for="roles">Employee Name: </label>
				</div>	
				<!-- drop down list editor for field: "roles" -->
				<div data-container-for="name" class="k-edit-field">
				<input name="name" id="userDdl"
					data-bind="value:uname" 
					data-value-field="name" 
					data-text-field="name"
					data-option-label="Select Employee..."
					data-value-primitive="true" 	
					data-source="autoComplete" 
					data-role="dropdownlist"/>
				</div>
				
				<div class="k-edit-label">
					<label for="roles">Roles: </label>
				</div>	
				<!-- drop down list editor for field: "roles" -->
				<div data-container-for="role" class="k-edit-field">
				<input name="role" id="roleDdl"
					data-bind="value: urole" 
					data-value-field="RoleName" 
					data-text-field="RoleName"
					data-option-label="Select Role..."
					data-value-primitive="true" 						
					data-source="dropDownDataSource" 
					data-role="dropdownlist"
					/>
					
				</div>
				<div data-container-for="idemp" class="k-edit-field">
				<input name="idemp" id="userID" type="hidden"
					data-bind="value: idemp" 
					data-value-field="idemp"
					data-text-field="idemp"
					/>
					</div>
				<div data-container-for="idrole" class="k-edit-field">	
				<input name="idrole" id="roleID" type="hidden"
					data-bind="value: idrole" 
					data-value-field="idrole" />
				</div>
				
			</div>
		</script>

</body>
</html>
