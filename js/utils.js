//GENERAL

function clearCenter() {
    $("#central-pane").empty();
}

//DATES

function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

function formatDate(date, sep) {
    return twoDigits(date.getFullYear() + sep + twoDigits(date.getMonth() + 1) + sep + twoDigits(date.getDate()));
}


//DATA SOURCE

function doesDataSourceHaveChanges(ds) {
    var dirty = false;

    $.each(ds._data, function () {
        if (this.dirty == true) {
            dirty = true;
        }
    });

    if (ds._destroyed.length > 0) dirty = true;

    return dirty;
}

function shiftDataSourceError(e) {
    messageBox(e.errorThrown, "Error Dialog");
    console.log(e.errorThrown); // displays "error"
    //If there any changes cancel them. 
    e.sender.cancelChanges();
}

function shiftGridReqEnd(e) {
    var ds = e.sender;
    if (doesDataSourceHaveChanges(ds)) {

    }
    if (e.type == "update" && e.response.Errors) {
        alert("Failed to update changes");
        console.log(e.response.Errors);
    }

    if (e.type == "create" && e.response.Errors) {
        alert("Failed to create changes");
        console.log(e.response.Errors);
    }
}

// ALERTS

function messageBox(msg, title) {
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

function log(msg) {
    console.log(msg);
}

function notImpl(){
	messageBox("Functionality of this button is not implemented yet" , "INFO");
}