	var DEBUG = false;	

function showGrid(type){
				$(document).ready(function () {
					if($("#grid-wrapper").length > 0){
						
						$("#grid-wrapper").remove();
					} 
					$( "#central-pane" ).append("<div id='grid-wrapper' class='k-content' style='width:auto;' ><div id='grid'></div></div>");
					if(type == 'users'){
						showUsersGrid();
					}else if(type == 'shifts'){
						showShiftsGrid();
					}
				});
			}
	
function showUsersGrid(){
	$(document).ready(function () {
        var crudServiceBaseUrl = "http://my.jce.ac.il/~noamtz/web/",
        dataSource = new kendo.data.DataSource({
			transport: {
						read:  {
								url: crudServiceBaseUrl + 'get_users.php',
								dataType: "jsonp"
                               },
                               update: {
                                   url:  crudServiceBaseUrl + 'update_users.php',
                                   dataType: "jsonp"
                               },
                               create: {
                                   url: crudServiceBaseUrl + 'create_users.php',
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
									   roles: {},
                                       phone: { type: "number"}
                                   }
                               }
                           }
                       });

                   $("#grid").kendoGrid({
                       dataSource: dataSource,
					   change: onUsersChange,
					   selectable: "row",
                       navigatable: true,
                       pageable: true,
                       height: 600,
					   sortable: true,
                       toolbar: ["create"],
                       columns: [
                           { field: "email", title: "Email"},
                           { field: "firstname", title: "First Name", width: 110 },
                           { field: "lastname", title: "Last Name", width: 110 },
                           { field: "phone",  title: "Phone", width: 110 },
						   { command: ["edit"], title: "&nbsp;", width: "80px" }],
                       editable: {
							mode: "popup",
							template: kendo.template($("#popup_editor_users").html())
					   }
                   });
               });
			}	
				
			function onUsersChange(e){
				    var grid = e.sender;
        			var currentDataItem = grid.dataItem(this.select());
        			    
        			//assign values of the row selected 
        			var email = currentDataItem.email;
        			var firstname = currentDataItem.firstname;
					var lastname = currentDataItem.lastname;
					var phone = currentDataItem.phone;
					if(DEBUG)
						console.log("Email:" + email + " , First Name:" + firstname + " , Last Name:" + lastname + " , Phone:" + phone);
			}

			function showShiftsGrid(){
				var crudServiceBaseUrl = "http://localhost/ManageEmp/";
				var datasource = new kendo.data.DataSource({
									transport: {
								read:  {
									url: crudServiceBaseUrl + 'get_shifts.php',
									dataType: "jsonp"
                               },
                               update: {
                                   url:  crudServiceBaseUrl + 'update_shifts.php',
                                   dataType: "jsonp"
                               },
                               destroy: {
                                   url: crudServiceBaseUrl + 'mock_create.php',
                                   dataType: "jsonp"
                               },
                               create: {
                                   url: crudServiceBaseUrl + 'create_shifts.php',
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
                                       start: { validation: { required: true } },
                                       end: { validation: { required: true} }
                                   }
                               }
                           }
					});
					
				 $("#grid").kendoGrid({
                        dataSource: datasource,
						change: onShiftsChange,
						selectable: "multiple",
                        height: 600,
                        sortable: true,
                        pageable: true,	
						navigatable: true,
                        detailInit: detailInitShifts,
						toolbar: ["create","save","cancel"],
                        columns: [
							{ 
								field:"start", 
								title:"Start", 
								format: "{0:MM-dd-yyyy}", 
								editor: dateTimeEditor
							},
							{
								field:"end", 
								title:"End", 
								format: "{0:MM-dd-yyyy}" ,
								editor: dateTimeEditor
							}
                        ],
						 editable: true
                    });
			}
			
			function dateTimeEditor(container, options) {
				    $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
			            .appendTo(container)
			            .kendoDatePicker({
							format: 'MM-dd-yyyy',
					});
			}

			function onShiftsChange(e){
				    var grid = e.sender;
        			var currentDataItem = grid.dataItem(this.select());
        			    
        			//assign values of the row selected 
        			var start = currentDataItem.start;
        			var end	= currentDataItem.end;
					console.log("From: " + start + " , To: " + end);
			}

            function detailInitShifts(e) {
					var crudServiceBaseUrl = "http://localhost/ManageEmp/";
					var idShift = e["data"]["idShifts"];
					if(DEBUG)
						console.log("Shift part of shift id: " + idShift + " is opened");

					var datasource = new kendo.data.DataSource({
							transport: {
								read:  {
									url: crudServiceBaseUrl + 'get_shitfpart.php?shiftId=' + idShift,
									dataType: "jsonp"
                               },
                               update: {
                                   url:  crudServiceBaseUrl + "asdasd.php",
                                   dataType: "jsonp"
                               },
                               destroy: {
                                   url: crudServiceBaseUrl ,
                                   dataType: "jsonp"
                               },
                               create: {
                                   url: crudServiceBaseUrl + 'create_shiftpart.php',
                                   dataType: "jsonp"
                               },
								parameterMap: function(options, operation) {
                                   if (operation !== "read" && options.models) {
											options.models[0]["idShifts"] = idShift;
											options.models[0]["idRoles"] = $("#roleID").val();
											options.models[0]["idUsers"] = $("#userID").val();
                                       return {models: kendo.stringify(options.models)};
                                   }
                               }							   
                           },
						    batch: true,
                            pageSize: 20,
                            schema: {
                               model: {
								   id: "idShifts",
								   fields:{
									idUsers:{},
									idRoles:{}
								   }
                               }
                           }
					});

                    $("<div/>").appendTo(e.detailCell).kendoGrid({
                        dataSource: datasource,
						change: onShiftsPartChange,
                        scrollable: false,
						selectable: "multiple",
                        sortable: true,
						edit: function(e) {
							$(e.container)
								.find("input[name='role']")
									.data("kendoDropDownList")
									.bind("change", function(e) {
										var input = e.sender;
										var currentDataItem = input.dataItem(this.select());
											console.log(currentDataItem);
										$(document).ready(function () {
										$("#roleID").val(currentDataItem["RoleID"]);
										
										});
									});
									
							$(e.container)
								.find("input[name='name']")
									.data("kendoDropDownList")
									.bind("change", function(e) {
										var input = e.sender;
										var currentDataItem = input.dataItem(this.select());
											console.log(currentDataItem);
										$("#userID").val(currentDataItem["idUsers"]);
										document.getElementById('userID').value = currentDataItem["idUsers"];
										
									});
									
						},
                        pageable: true,
                        toolbar: ["create"],
                        columns: [
                            { field: "uname", title:"Employee Name", width: "110px" },
							{ field: "urole", title: "Role", width: "200px"},
							{ command: ["edit", "destroy"], title: "&nbsp;", width: "172px" }
							],
                         editable: {
							mode: "popup",
							template: kendo.template($("#popup_editor_shifts").html())
						 }
                    });
                }
			
				
				function onShiftsPartChange(e){
				    var grid = e.sender;
        			var currentDataItem = grid.dataItem(this.select());
					if(DEBUG)
						console.log(currentDataItem);
        			//assign values of the row selected 
        			/*var start = currentDataItem.start;
        			var end	= currentDataItem.end;
					console.log("From: " + start + " , To: " + end);*/
				}
				
				$(document).ready(function() {
                    $("#products").kendoDropDownList({
                        dataTextField: "RoleName",
                        dataValueField: "RoleID",
                        dataSource: {
                            transport: {
                                read: {
                                    dataType: "jsonp",
                                    url: "http://my.jce.ac.il/~noamtz/web/get_roles.php",
                                }
                            }
                        }
                    });
                });
