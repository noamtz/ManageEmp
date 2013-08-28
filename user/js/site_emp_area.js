var crudServiceBaseUrl = "http://localhost/ManageEmp/";
var gridSize = 365;
			function showShiftSelection(){
				$( "#grid-place" ).append
			}

			function showGrid(type,params){
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
						showShiftsGrid(params);
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
					   height: gridSize,
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

			function showShiftsGrid(params){
				var get_params = "";
				if(params != null){
					get_params = "?from=" + params[0] + "&to=" + params[1];
				}
					
				 $(document).ready(function () {					
                    var dataSource = new kendo.data.DataSource({
                           transport: {
                               read:  {
                                   url: crudServiceBaseUrl + "get_shifts.php" + get_params,
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
                                       end: {	type: "date", format: "{0:yyyy-MM-dd}",  validation: { required: true} },
									   part: { type: "boolean" }
                                   }
                               }
                           }
                       });

                   $("#grid").kendoGrid({
                       dataSource: dataSource,
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
								template: "<input type=\"checkbox\" />",
								editable: true
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
						$("#options-place").append(options);
						initDatesPicker();
					}
				}