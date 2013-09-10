
var usersGridHeight = 752;
var shiftsGridHeight = 639;

//Initialize Globals
var dropDownDataSource = new kendo.data.DataSource({
    transport: {
        read: {
            url: crudServiceBaseUrl + 'get_roles.php',
            dataType: "jsonp"
        }
    }
});

var autoComplete = new kendo.data.DataSource({
    transport: {
        read: {
            url: crudServiceBaseUrl + 'users_names.php',
            dataType: "jsonp"
        }
    }
});

$(document).ready(function () {
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

function initGridArea() {
    $(document).ready(function () {
        if ($("#grid-wrapper").length > 0) {
            $("#grid-wrapper").remove();
        }
        $("#central-pane").append("<div id='grid-wrapper'><div id='grid'></div></div>");
    });
}

//USER AREA

function manageUsers(){
	clearCenter();
	initGridArea();
	showUsersGrid();
}

function showUsersGrid() {
    $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: crudServiceBaseUrl + 'get_users.php',
                    dataType: "jsonp"
                },
                update: {
                    url: crudServiceBaseUrl + 'update_users.php',
                    dataType: "jsonp"
                },
                create: {
                    url: crudServiceBaseUrl + 'create_users.php',
                    dataType: "jsonp"
                },
                parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                        return {
                            models: kendo.stringify(options.models)
                        };
                    }
                }
            },
            requestEnd: userGridReqEnd,
            batch: true,
            pageSize: 20,
            schema: {
                model: {
                    id: "idUsers",
                    fields: {
                        idUsers: {
                            editable: false,
                            nullable: true
                        },
                        email: {
                            validation: {
                                required: true
                            }
                        },
                        firstname: {
                            validation: {
                                required: true
                            }
                        },
                        lastname: {
                            validation: {
                                required: true
                            }
                        },
                        roles: {},
                        phone: {
                            type: "number"
                        }
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
            height: usersGridHeight,
            edit: function (e) {
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
                userRoles.fetch(function () {
                    var data = userRoles.data();
                    var arr = [];
                    for (var i = 0; i < data.length; i++) {
                        arr.push(data[i]['idRoles']);
                    }
                    var msroles = $("#uroleMS").data("kendoMultiSelect");
                    msroles.value(arr);
                });

            },
            sortable: true,
            toolbar: ["create"],
            columns: [{
                field: "email",
                title: "Email"
            }, {
                field: "firstname",
                title: "First Name",
                width: 110
            }, {
                field: "lastname",
                title: "Last Name",
                width: 110
            }, {
                field: "phone",
                title: "Phone",
                width: 110
            }, {
                command: ["edit"],
                title: "&nbsp;",
                width: "80px"
            }],
            editable: {
                mode: "popup",
                template: kendo.template($("#popup_editor_users").html())
            }
        });
    });
}

function userGridReqEnd(e) {
    if (e.type == "update" && !e.response.Errors) {
        alert("Update record is successfull");
    }

    if (e.type == "create" && !e.response.Errors) {
        alert("Create record is successfull");
    }
}

function onUsersChange(e) {
    var grid = e.sender;
    var currentDataItem = grid.dataItem(this.select());

    //assign values of the row selected 
    var email = currentDataItem.email;
    var firstname = currentDataItem.firstname;
    var lastname = currentDataItem.lastname;
    var phone = currentDataItem.phone;
    s
}

//SHIFTS AREA

function showShiftsGrid(params) {
	var get_params = "";
    if (params != null) {
        get_params = "?from=" + params[0] + "&to=" + params[1];
    }
    var datasource = new kendo.data.DataSource({
        transport: {
            read: {
                url: crudServiceBaseUrl + "get_shifts.php" + get_params,
                dataType: "jsonp"
            },
            update: {
                url: crudServiceBaseUrl + 'update_shifts.php',
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
            parameterMap: function (options, operation) {

                if (operation !== "read" && options.models) {
                    for (var i = 0; i < options.models.length; i++) {
                        var start = new Date(options.models[i]['start']);
                        var end = new Date(options.models[i]['end']);
                        options.models[i]['start'] = formatDate(start, "-");
                        options.models[i]['end'] = formatDate(end, "-");

                    }
                    return {
                        models: kendo.stringify(options.models)
                    };
                }
            }
        },
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                id: "idShifts",
                fields: {
                    idShifts: {
                        editable: false,
                        nullable: true
                    },
                    start: {
                        type: "date",
                        format: "{0:yyyy-MM-dd}",
                        validation: {
                            required: true
                        }
                    },
                    end: {
                        type: "date",
                        format: "{0:yyyy-MM-dd}",
                        validation: {
                            required: true
                        }
                    }
                }
            }
        }
    });

    $("#grid").kendoGrid({
        dataSource: datasource,
        change: onShiftsChange,
        selectable: "multiple",
        height: shiftsGridHeight,
        sortable: true,
        pageable: true,
        navigatable: true,
        detailInit: detailInitShifts,
        toolbar: ["create", "save", "cancel"],
        columns: [{
            field: "start",
            title: "Start",
            format: "{0:dd/MM/yyyy}",
            editor: dateTimeEditor
        }, {
            field: "end",
            title: "End",
            format: "{0:dd/MM/yyyy}",
            editor: dateTimeEditor
        }],
        editable: true
    });
}

function onShiftsChange(e) {
    var grid = e.sender;
    var currentDataItem = grid.dataItem(this.select());

    //assign values of the row selected 
    var start = currentDataItem.start;
    var end = currentDataItem.end;
}

function dateTimeEditor(container, options) {
    $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
        .appendTo(container)
        .kendoDatePicker({
            format: 'yyyy-MM-dd',
        });
}

function detailInitShifts(e) {
    var idShift = e["data"]["idShifts"];

    var datasource = new kendo.data.DataSource({
        transport: {
            read: {
                url: crudServiceBaseUrl + 'get_shitfpart.php?shiftId=' + idShift,
                dataType: "jsonp"
            },
            update: {
                url: crudServiceBaseUrl + "update_shiftpart.php?shiftId=" + idShift,
                dataType: "jsonp"
            },
            destroy: {
                url: crudServiceBaseUrl + "delete_shiftpart.php",
                dataType: "jsonp"
            },
            create: {
                url: crudServiceBaseUrl + 'create_shiftpart.php?shiftId=' + idShift,
                dataType: "jsonp"
            },
            parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
					if(operation !== "destroy"){
						var users = $("#userDdl").data("kendoDropDownList");
						var roles = $("#roleDdl").data("kendoDropDownList");


						options.models[0]["idShifts"] = idShift;
						options.models[0]["idRoles"] = roles.dataItem()['RoleID'];
						options.models[0]["idUsers"] = users.dataItem()['idUsers'];
					}

                    return {
                        models: kendo.stringify(options.models)
                    };
                }
            }
        },
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                id: "idShifts",
                fields: {
                    idUsers: {},
                    idRoles: {},
                    shiftPartId: {}
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
        edit: function (e) {
            $(e.container)
                .find("input[name='role']")
                .data("kendoDropDownList")
                .bind("change", function (e) {
                    var input = e.sender;
                    var currentDataItem = input.dataItem(this.select());
                    $(document).ready(function () {
                        $("#roleID").val(currentDataItem["RoleID"]);

                    });
                });

            $(e.container)
                .find("input[name='name']")
                .data("kendoDropDownList")
                .bind("change", function (e) {
                    var input = e.sender;
                    var currentDataItem = input.dataItem(this.select());
                    $("#userID").val(currentDataItem["idUsers"]);
                    document.getElementById('userID').value = currentDataItem["idUsers"];

                });

        },
        pageable: true,
        toolbar: ["create"],
        columns: [{
            field: "uname",
            title: "Employee Name",
            width: "110px"
        }, {
            field: "urole",
            title: "Role",
            width: "200px"
        }, {
            command: ["edit", "destroy"],
            title: "&nbsp;",
            width: "100px"
        }],
        editable: {
            mode: "popup",
            template: kendo.template($("#popup_editor_shifts").html())
        }
    });
}

function onShiftsPartChange(e) {
    var grid = e.sender;
    var currentDataItem = grid.dataItem(this.select());
}

function selectRange() {
    var from = new Date($("#monthpicker-from").data("kendoDatePicker").value());
    var to = new Date($("#monthpicker-to").data("kendoDatePicker").value());
    if (to < from) {
        messageBox("Please insert valid date range", "Message");
    } else {
        from = formatDate(from, "-");
        to = formatDate(to, "-");

        var params = [from, to];
        showShiftSelection(params);
    }
}

function manageShifts() {
    clearCenter();
    var options =
        '<div id="cap-view" class="demo-section">' + 
		'<div id="cap" class="black-cap"></div>' +
		'<div id="options">' + 
		'<h3>Select Date Range</h3>' + 
		'<label for="monthpicker-from">From: </label>' + 
		'<input id="monthpicker-from" value="January 2013" style="width:150px" />' + 
		'<label for="monthpicker-to">To: </label>' + 
		'<input id="monthpicker-to" value="December 2013" style="width:150px" />' + 
		'<button class="k-button" onclick="selectRange()">Choose</button>' + 
		'</div>' + 
		'</div>';


    if ($("#options").length == 0) {
        $("#central-pane").append("<div id='options-place'></div>");
        $("#central-pane").append("<div id='grid-wrapper'></div>");
        $("#options-place").append(options);
        initDatesPicker();
    }
	
	selectRange();
}

function showShiftSelection(params) {
    if ($("#grid-wrapper").length > 0) {
        $("#grid-wrapper").remove();
    }
    var grid = "<div id='grid-wrapper' class='k-content' style='width:auto;' >" +
        "<div id='grid'></div>" +
        "</div>";

    $("#central-pane").append(grid);
    showShiftsGrid(params);
}

function initDatesPicker() {
    $(document).ready(function () {
        var dateToday = new Date();
        $("#monthpicker-from , #monthpicker-to").kendoDatePicker({
            // defines the start view
            start: "year",
            // defines when the calendar should return date
            depth: "year",
            // display month and year in the input
            format: "MMMM yyyy",
            minDate: dateToday,
            onSelect: function (selectedDate) {
                var option = this.id == "monthpicker-from" ? "minDate" : "maxDate",
                    instance = $(this).data("datepicker"),
                    date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
                dates.not(this).datepicker("option", option, date);
            }
        }).attr("readonly", true);
		
		$("#monthpicker-to").data("kendoDatePicker").value(new Date(2013,11,1));
		$("#monthpicker-from").data("kendoDatePicker").value(new Date(2013,0,1));
    });
}
