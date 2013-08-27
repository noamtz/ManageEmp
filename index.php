<?php
session_start();
if(!isset($_SESSION['username']) ){
	header("location:login.html");
}
?>

<!DOCTYPE html>
<html>
<head>
   <title>Manage Guards</title>

   <link href="kendoui/examples/content/shared/styles/examples-offline.css" rel="stylesheet">
   <link href="kendoui/styles/kendo.common.min.css" rel="stylesheet">
   <link href="kendoui/styles/kendo.default.min.css" rel="stylesheet">
	
  <!-- <script src="kendoui/js/jquery.min.js"></script> -->
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
   <script src="kendoui/js/kendo.web.min.js"></script>
   <script src="kendoui/examples/content/shared/js/console.js"></script>
   
   <!-- Custom Style & Scripts-->
   <link href="style/site.css" rel="stylesheet">
   
   <script src="js/site.js"></script>

</head>
<body>

   <div id="content_wrapper">
   
		<div id="header">
			<span><?php echo $_SESSION['username']; ?> <span>
			<a href='login.php?q=logout'>logout</a>
			
		</div>

		<div id="left-pane">
			<h2 class="head-line"> Navigation </h2>

			<ul>
				<li><a class="k-button nav-button" href="javascript:void(0)" onclick="showGrid('users')">Users</a></li>
				<li><a class="k-button nav-button" href="javascript:void(0)" onclick="showGrid('shifts')">Shifts</a></li>
				<li><a class="k-button nav-button" href="#">Contact</a></li>
			</ul>
		</div>

		<div id="central-pane"></div>
	
		<div id="footer">
			
		</div>
		
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
