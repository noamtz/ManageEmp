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
<style>
#content_wrapper
{
    width: 1000px;
    height: auto;
    border: groove;
	margin: auto;
}

#header {
   width: auto;
   height: 50px;
   border: groove;
 }
#left-pane {
    width: 20%;
    height: 750px;
	float:left;
    border: groove;
 }
#central-pane {
    width: 78%;
    height: 750px;
    float:left;
    border: groove;
	margin-left:5px;
 }
#footer {
    width: auto;
    height: 50px;
    border: groove;
	clear: both;
 }
ul
{
    list-style-type: none;
}
li{
	margin:5px;
}

.nav-button{
	width: 100px;
}

.head-line{
	text-align: center;
}

#options-place{
	//display: none;
}

</style>

</head>
<body>
   <div id="content_wrapper">
	<div id="header">
			<span><?php echo $_SESSION['username']; ?> <span>
			<a href='../login.php?q=logout'>logout</a>
	</div>

    <div id="left-pane">
	<h2 class="head-line"> Options </h2>

	<ul>
	    <li><a class="k-button nav-button" href="javascript:void(0)" onclick="showGrid('users')">Edit Details</a></li>
  	    <li><a class="k-button nav-button" href="javascript:void(0)" onclick="showGrid('shifts')">Manage Shifts</a></li>
    	<li><a class="k-button nav-button" href="#">Contact</a></li>
	</ul>


	</div>

	<div id="central-pane">

	   <div id="options-place">
			
	       <div id="cap-view" class="demo-section">

	            <div id="cap" class="black-cap"></div>

	            <div id="options">
	            	<h3>Select Month</h3>
                    <input id="monthpicker" value="November 2011" style="width:150px" />
					<button class="k-button" id="get">Choose</button>
	         	 </div>			
	      </div>
	</div> <!-- end of option area --> 

	<div id="grid-place"></div>

	</div> <!-- end of central-pane --> 
	<div id="footer"></div>
	
	<div id="window"></div>
</div>
    <script>  
			var crudServiceBaseUrl = "http://localhost:8088/ManageEmp/"
			function showShiftSelection(){
				$( "#grid-place" ).append
			}

			function showGrid(type){
				$(document).ready(function () {
					if($("#grid-wrapper").length > 0){
						$("#grid-wrapper").remove();
					} 
					$( "#grid-place" ).append("<div id='grid-wrapper' class='k-content' style='width:auto;' ><div id='grid'></div></div>");
					if(type == 'users'){
						$('#options-place').toggle();
						showUsersGrid();
						$('#options-place').toggle();
					}else if(type == 'shifts'){
						showShiftsGrid();
					}
				});
			}
	
			function showUsersGrid(){
				$(document).ready(function () {					
                   var crudServiceBaseUrl = "http://localhost:8088/ManageEmp/",
                       dataSource = new kendo.data.DataSource({
                           transport: {
                               read:  {
                                   url: crudServiceBaseUrl + 'get_users.php',
								   dataType: "jsonp"

                               },
                               parameterMap: function(options, operation) {
                                   if (operation !== "read" && options.models) {
                                       return {models: kendo.stringify(options.models)};
                                   }
                               }
                           },
                           batch: true,
                           pageSize: 20,
                           schema: {
                               model: {
                                   id: "idUsers",
                                   fields: {
                                       idUsers: { editable: false, nullable: true },
                                       email: { validation: { required: true } },
                                       firstname: { validation: { required: true} },
                                       lastname: {  validation: { required: true}},
                                       phone: { type: "number"}
                                   }
                               }
                           }
                       });

                   $("#grid").kendoGrid({
                       dataSource: dataSource,
                       navigatable: true,
                       pageable: true,
					   height: 365,
					   sortable: true,
                       columns: [
                           { field: "email", title: "Email"},
                           { field: "firstname", title: "First Name", width: 110 },
                           { field: "lastname", title: "Last Name", width: 110 },
                           { field: "phone",  title: "Phone", width: 110 }],
					   dataBound: function () {
							//Get the number of Columns in the grid
							var colCount = $("#grid").find('.k-grid-header colgroup > col').length;

							//If There are no results place an indicator row
							if (dataSource._view.length == 0) {
								$("#grid").find('.k-grid-content tbody')
									.append('<tr class="kendo-data-row"><td colspan="' +
										colCount +
										'" style="text-align:center"><b>No Results Found!</b></td></tr>');
							}
						}
                   });
               });
			}	

			function showShiftsGrid(){
				 $(document).ready(function () {					
                    var dataSource = new kendo.data.DataSource({
                           transport: {
                               read:  {
                                   url: crudServiceBaseUrl + "get_shifts.php",
								   dataType: "jsonp"

                               },
                               update: {
                                   url: crudServiceBaseUrl,
                                   dataType: "jsonp"
                               },
                               parameterMap: function(options, operation) {
                                   if (operation !== "read" && options.models) {
                                       return {models: kendo.stringify(options.models)};
                                   }
                               }
                           },
                           batch: true,
                           pageSize: 20,
                           schema: {
                               model: {
                                   id: "idShifts",
                                   fields: {
                                       idShifts: { editable: false, nullable: true },
                                       start: { type: "date", format: "{0:yyyy-MM-dd}" ,validation: { required: true } },
                                       end: {	type: "date", format: "{0:yyyy-MM-dd}",  validation: { required: true} }
                                   }
                               }
                           }
                       });

                   $("#grid").kendoGrid({
                       dataSource: dataSource,
                       navigatable: true,
                       pageable: true,
					   height: 365,
					   sortable: true,
                       toolbar: ["save", "cancel"],
                        columns: [
							{ 
								field:"start", 
								title:"Start", 
								format: "{0:dd/MM/yyyy}"
							},
							{
								field:"end", 
								title:"End", 
								format: "{0:dd/MM/yyyy}"
							}
                        ],
                       editable: true,
					   dataBound: function () {
							//Get the number of Columns in the grid
							var colCount = $("#grid").find('.k-grid-header colgroup > col').length;

							//If There are no results place an indicator row
							if (dataSource._view.length == 0) {
								$("#grid").find('.k-grid-content tbody')
									.append('<tr class="kendo-data-row"><td colspan="' +
										colCount +
										'" style="text-align:center"><b>No Results Found!</b></td></tr>');
							}
						}
                   });
               });
			}	
			//Drop down list
			 $(document).ready(function() {
                    $("#monthpicker").kendoDatePicker({
                	   // defines the start view
                	    start: "year",
	
        		    // defines when the calendar should return date
        		    depth: "year",

                            // display month and year in the input
                	    format: "MMMM yyyy"
        		 }).attr("readonly", true);
				 
				 //Pop up messages
				 
				 messageBox("This is my custom massege", "Message Dialog");
                });
				
				function messageBox(msg, title){
					$("#window").kendoWindow({
                      actions: ["Close"],
					  draggable: true,
					  modal: true,
					  resizable: false,
					  visible: false,
					  width: "250px",
					  height: "100px",
					  title: "Confirm action",
                    });
					var window = $("#window").data("kendoWindow");
					window.title(title);
					window.center();
					window.content(msg);
					window.open();
				}
	</script>
</div>

</body>
</html>
