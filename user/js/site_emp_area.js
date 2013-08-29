var crudServiceBaseUrl = "http://localhost:8088/ManageEmp";
var gridSize = 365;
			function showShiftSelection(){
				$( "#grid-place" ).append
			}
			
			function clearCenter(){
				$('#central-pane').empty();
			}

			function showShiftsGrid(params){
				var get_params = "";
				if(params != null){
					get_params = "?from=" + params[0] + "&to=" + params[1];
				}
					
				 $(document).ready(function () {					
                    var dataSource = new kendo.data.DataSource({
                           transport: {
                               read:  {
                                   url: crudServiceBaseUrl + "/get_shifts.php" + get_params,
								   dataType: "jsonp"

                               },
                               update: {
                                   url: crudServiceBaseUrl + "/sdfsdf.php",
                                   dataType: "jsonp"
                               },
                               parameterMap: function(options, operation) {
									console.log("MAP");
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
                                       idShifts: { editable: false},
									   part: { type: "bool" }
                                   }
                               }
                           }
                       });

                   $("#grid").kendoGrid({
                       dataSource: dataSource,
					   editable  :"inline",
                       navigatable: true,
                       pageable: true,
					   height: 630,
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
							,
							{
								field:"part", 
								title:"Participate",
								width: 100,
								template: "<input name='part' class='ob-paid' type='checkbox' data-bind='checked: part' #= part ? checked='checked' : '' #/>",
							}
                        ],
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
				   
				//Shift participate check box listener
				var grid = $("#grid").data("kendoGrid");
					grid.tbody.on("change", ".ob-paid", function (e) {
					var row = $(e.target).closest("tr");
					var item = grid.dataItem(row);
					item.set("part", $(e.target).is(":checked") ? true : false);
				});

               });
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
			
			function initDatesPicker(){
			 $(document).ready(function() {
				var dateToday = new Date();
				$("#monthpicker-from , #monthpicker-to").kendoDatePicker({
						// defines the start view
                	    start: "year",
						// defines when the calendar should return date
						depth: "year",
						// display month and year in the input
						format: "MMMM yyyy",
						minDate: dateToday,
						onSelect: function(selectedDate) {
							var option = this.id == "monthpicker-from" ? "minDate" : "maxDate",
							instance = $(this).data("datepicker"),
							date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
							dates.not(this).datepicker("option", option, date);
						}
        		 }).attr("readonly", true);
				 
			 });
			}
               
				
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
					if(to < from){
						messageBox("Please insert valid date range","Message");
					}else{
						from = formatDate(from,"-");
						to = formatDate(to,"-");

						var params=[from, to];
						showGrid('shifts',params);
					}
					
				}
				
				function twoDigits(d) {
					if(0 <= d && d < 10) return "0" + d.toString();
					if(-10 < d && d < 0) return "-0" + (-1*d).toString();
					return d.toString();
				}
   
				function formatDate(date, sep){
					return twoDigits(date.getFullYear() + sep + twoDigits(date.getMonth()+1) + sep + twoDigits(date.getDate()) );
				}   
				
				function manageShifts(){
					clearCenter();
					var options =
								  '<div id="cap-view" class="demo-section">'
								+ '<div id="cap" class="black-cap"></div>'
								+ '<div id="options">'
								+ '<h3>Select Date Range</h3>'
								+ '<label for="monthpicker-from">From: </label>'
								+ '<input id="monthpicker-from" value="January 2013" style="width:150px" />'
								+ '<label for="monthpicker-to">To: </label>'
								+ '<input id="monthpicker-to" value="December 2013" style="width:150px" />'
								+ '<button class="k-button" onclick="selectRange()">Choose</button>'
								+ '</div>'
								+ '</div>';
					
					
					if($("#options").length == 0){
						$("#central-pane").append("<div id='options-place'></div>");
						$("#central-pane").append("<div id='grid-place'></div>");
						$("#options-place").append(options);
						initDatesPicker();
					}
				}
	