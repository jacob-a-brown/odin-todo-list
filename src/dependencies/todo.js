class toDoItem {
    constructor(title, description, dueDate, priority, checked) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
    }

    // GETTERS/SETTERS
    get title() {
        return this.title;
    }

    set title(value) {
        this.title = value;
    }

    get description() {
        return this.description;
    }

    set description(value) {
        this.description = value;
    }

    get dueDate() {
        return this.dueDate;
    }

    set dueDate(value) {
        this.dueDate = value;
    }

    get priority() {
        return this.priority;
    }

    set priority(value) {
        this.priority = value;
    }

    get checked() {
        return this.checked;
    }

    set checked(value) {
        if (value !== true || value !== false){
            throw new Error(`Checked must be either true or false. Received ${value}.`)
        }
        this.checked = value;
    }

    // METHODS
    switchChecked() {
        this.checked = false ? this.checked : true;
    }
}

const createToDoItem = function(title, description, dueDate, priority) {
    return new toDoItem(title, description, dueDate, priority);
}