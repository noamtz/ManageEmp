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
                    $("#monthpicker-from").kendoDatePicker({
						// defines the start view
                	    start: "year",
	
						// defines when the calendar should return date
						depth: "year",

						// display month and year in the input
						format: "MMMM yyyy"
        		 }).attr("readonly", true);
				 
				 $("#monthpicker-to").kendoDatePicker({
						// defines the start view
                	    start: "year",
	
						// defines when the calendar should return date
						depth: "year",

						// display month and year in the input
						format: "MMMM yyyy"
        		 }).attr("readonly", true);
				 
				 //Pop up messages
				 
				 //messageBox("This is my custom massege", "Message Dialog");
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
				
				function selectRange(){
					var from =  new Date($("#monthpicker-from").data("kendoDatePicker").value());
					var to =  new Date($("#monthpicker-to").data("kendoDatePicker").value());
					messageBox("from: " + from.getFullYear() + " to: " + to.getDate(),"");
				}
				function twoDigits(d) {
					if(0 <= d && d < 10) return "0" + d.toString();
					if(-10 < d && d < 0) return "-0" + (-1*d).toString();
					return d.toString();
				}
   
				function formatDate(date, sep){
					return twoDigits(date.getFullYear() + sep + twoDigits(date.getMonth()+1) + sep + twoDigits(date.getDate()) );
				}   