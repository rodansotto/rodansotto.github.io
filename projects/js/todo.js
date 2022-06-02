//var ToDoItem = function (description, dueDate, notes) {
//    this.description = description;
//    this.dueDate = dueDate;
//    this.notes = notes;
//}

//var ToDoList = function () {
//    this.items = [];
//}

//ToDoList.prototype.addItem = function (toDoItem) {
//    this.items[this.items.length + 1] = toDoItem;
//}


var $ = function (id) { return document.getElementById(id); }

var toDoList = new ToDoList();

var saveNewEditToDo = function (evt) {
    if (!evt) {
        evt = window.event;
    }

    if (evt.srcElement.name == "saveNew") {
        var description = $("description").value;
        var dueDate = $("dueDate").value;
        var notes = $("notes").value;

        var toDoItem = new ToDoItem(description, dueDate, notes);
        toDoList.addItem(toDoItem);
    }
    else {
        var i = getSelectedItemIndex();
        if (i > -1) {
            toDoList.items[i].description = $("description").value;
            toDoList.items[i].dueDate = $("dueDate").value;
            toDoList.items[i].notes = $("notes").value;
        }
        else {
            return;
        }
    }

    updateToDoListTable();
    cancel();
}

var updateToDoListTable = function () {
    var table = $("tableList");

    // clear table first
    // but don't delete the header row
    while (table.rows.length > 1) {
        // delete last row
        table.deleteRow(-1);
    }

    // then populate
    for (var i = 0; i < toDoList.items.length; i++) {
        var row = table.insertRow(-1);

        // select first row by default
        if (i == 0) {
            row.className = "selectRow";
        }

        // need to call a helper function that will assign a function to handle the <tr> onclick event
        // this event handler will select the clicked row as indicated by the passed parameter i, while unselecting the rest
        // if the event handler is assigned here using the loop variable i, following the javascript closure, the value of i
        //  will always be the last value of i assigned to it when this function exits, and that's the last row in the list
        //selectRow(row, i);        
        row.onclick = (function (rowNo) {
            return function () {
                var table = $("tableList");
                for (var i = 1; i < table.rows.length; i++) {
                    var row = table.rows[i];
                    if (i == rowNo + 1) {
                        row.className = "selectRow";
                    }
                    else {
                        row.className = "unselectRow";
                    }
                }
            }           
        })(i);
        
        var cell = row.insertCell(-1);
        cell.innerHTML = toDoList.items[i].description;

        cell = row.insertCell(-1);
        cell.innerHTML = toDoList.items[i].dueDate;

        cell = row.insertCell(-1);
        cell.innerHTML = toDoList.items[i].notes;
    }
}

var selectRow = function (row, rowNo) {
    row.onclick = function () {
        var table = $("tableList");
        for (var i = 1; i < table.rows.length; i++) {
            var row = table.rows[i];
            if (i == rowNo + 1) {
                row.className = "selectRow";
            }
            else {
                row.className = "unselectRow";
            }
        }
    }
}

var showNewEditToDo = function (evt) {
    if (!evt) {
        evt = window.event;
    }

    if (evt.srcElement.name == "new") {
        $("h2NewEdit").textContent = "New To Do";
        $("save").name = "saveNew";

        $("description").value = "";
        $("dueDate").value = "";
        $("notes").value = "";
    }
    else {
        var i = getSelectedItemIndex();
        if (i > -1) {
            $("h2NewEdit").textContent = "Edit To Do";
            $("save").name = "saveEdit";

            $("description").value = toDoList.items[i].description;
            $("dueDate").value = toDoList.items[i].dueDate;
            $("notes").value = toDoList.items[i].notes;
        }
        else {
            return;
        }
    }

    $("divList").className = "hide";
    $("divNewEdit").className = "show";
}

var getSelectedItemIndex = function () {
    var table = $("tableList");
    // don't include the header row
    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        if (row.className == "selectRow") {
            return i - 1;
        }
    }
    return -1;
}

var cancel = function () {
    $("divList").className = "show";
    $("divNewEdit").className = "hide";
}

window.onload = function () {
    $("new").onclick = showNewEditToDo;
    $("edit").onclick = showNewEditToDo;
    $("save").onclick = saveNewEditToDo;
    $("cancel").onclick = cancel;
}
