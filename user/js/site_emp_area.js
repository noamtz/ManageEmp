var gridSize = 365;

function showShiftsGrid(params) {
    var get_params = "";
    if (params != null) {
        get_params = "?from=" + params[0] + "&to=" + params[1];
    }
    $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: crudServiceBaseUrl + "get_shifts.php" + get_params,
                    dataType: "jsonp"

                },
                update: {
                    url: crudServiceBaseUrl + "sdfsdf.php",
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
            batch: true,
            requestEnd: shiftGridReqEnd,
            pageSize: 20,
            schema: {
                model: {
                    id: "idShifts",
                    fields: {
                        idShifts: {
                            editable: false
                        },
                        part: {
                            type: "bool"
                        }
                    }
                }
            }
        });
        dataSource.bind("error", shiftDataSourceError);

        $("#grid").kendoGrid({
            dataSource: dataSource,
            editable: "inline",
            navigatable: true,
            pageable: true,
            height: 630,
            sortable: true,
            toolbar: ["save", "cancel"],
            columns: [{
                field: "start",
                title: "Start",
                format: "{0:dd/MM/yyyy}"
            }, {
                field: "end",
                title: "End",
                format: "{0:dd/MM/yyyy}"
            }, {
                field: "part",
                title: "Participate",
                width: 100,
                template: "<input name='part' class='ob-paid' type='checkbox' data-bind='checked: part' #= part ? checked='checked' : '' #/>",
            }],
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

        grid.bind("save", grid_save);

        function grid_save(e) {

        }
    });
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

    });
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
        '<div id="cap-view" class="demo-section">' + '<div id="cap" class="black-cap"></div>' + '<div id="options">' + '<h3>Select Date Range</h3>' + '<label for="monthpicker-from">From: </label>' + '<input id="monthpicker-from" value="January 2013" style="width:150px" />' + '<label for="monthpicker-to">To: </label>' + '<input id="monthpicker-to" value="December 2013" style="width:150px" />' + '<button class="k-button" onclick="selectRange()">Choose</button>' + '</div>' + '</div>';


    if ($("#options").length == 0) {
        $("#central-pane").append("<div id='options-place'></div>");
        $("#central-pane").append("<div id='grid-place'></div>");
        $("#options-place").append(options);
        initDatesPicker();
    }
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