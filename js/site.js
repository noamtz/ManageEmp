   var DEBUG = false;	
   var crudServiceBaseUrl = "http://79.183.175.6/ManageEmp/"
   
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}
   
function formatDate(date, sep){
	return twoDigits(date.getFullYear() + sep + twoDigits(date.getMonth()+1) + sep + twoDigits(date.getDate()) );
}   
   
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
        var dataSource = new kendo.data.DataSource({
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
                       height: 800,
					   edit: function(e) {
							var userId = $(e.container).find("input[name='Email']").val();
							var userRoles = new kendo.data.DataSource({
								transport: {
									read: {
										url: crudServiceBaseUrl + 'get_user_roles.php?userId=' + userId,
										dataType: "jsonp"
									}
								}
							});
							userRoles.read();
							userRoles.fetch(function(){
								console.log('USER-ID: ');
								var data = userRoles.data();
								var arr=[];
								for(var i=0;i<data.length;i++){
									arr.push(data[i]['idRoles']);
								}
								var msroles = $("#uroleMS").data("kendoMultiSelect");
								msroles.value(arr);
							});
								
					   },
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
									console.log("Log: ");
									if (operation !== "read" && options.models) {
										for(var i=0;i<options.models.length;i++){
											var start = new Date(options.models[i]['start']);
											var end = new Date(options.models[i]['end']);
											options.models[i]['start'] = formatDate(start,"-");
											options.models[i]['end'] = formatDate(end,"-");
											
											console.log("START: " + formatDate(start,","));
											console.log("END: " + formatDate(end,"-"));
										}
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
                        dataSource: datasource,
						change: onShiftsChange,
						selectable: "multiple",
                        height: 800,
                        sortable: true,
                        pageable: true,	
						navigatable: true,
                        detailInit: detailInitShifts,
						toolbar: ["create","save","cancel"],
                        columns: [
							{ 
								field:"start", 
								title:"Start", 
								format: "{0:dd/MM/yyyy}", 
								editor: dateTimeEditor
							},
							{
								field:"end", 
								title:"End", 
								format: "{0:dd/MM/yyyy}" ,
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
							format: 'yyyy-MM-dd',
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
                                   url:  crudServiceBaseUrl + "update_shiftpart.php?shiftId=" + idShift,
                                   dataType: "jsonp"
                               },
                               destroy: {
                                   url: crudServiceBaseUrl + "asdad.php" ,
                                   dataType: "jsonp"
                               },
                               create: {
                                   url: crudServiceBaseUrl + 'create_shiftpart.php?shiftId=' + idShift,
                                   dataType: "jsonp"
                               },
								parameterMap: function(options, operation) {
                                   if (operation !== "read" && options.models) {
								   
											var users = $("#userDdl").data("kendoDropDownList");
											var roles = $("#roleDdl").data("kendoDropDownList");
											
											
											options.models[0]["idShifts"] = idShift;
											options.models[0]["idRoles"] = roles.dataItem()['RoleID'];
											options.models[0]["idUsers"] = users.dataItem()['idUsers'];
											
											console.log("UPDATE PARTS: ");
											console.log(roles.dataItem()['RoleID']);
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
									idRoles:{},
									shiftPartId:{}
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
				}
				
				$(document).ready(function() {
                    $("#products").kendoDropDownList({
                        dataTextField: "RoleName",
                        dataValueField: "RoleID",
                        dataSource: {
                            transport: {
                                read: {
                                    dataType: "jsonp",
                                    url: crudServiceBaseUrl + "get_roles.php",
                                }
                            }
                        }
                    });
                });
