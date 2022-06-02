var ToDoItem = function (description, dueDate, notes) {
    this.description = description;
    this.dueDate = dueDate;
    this.notes = notes;
}

var ToDoList = function () {
    this.items = [];
}

ToDoList.prototype.addItem = function (toDoItem) {
    // add item to the end of the list
    this.items[this.items.length] = toDoItem;
}
