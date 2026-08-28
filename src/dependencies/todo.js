import { projectExists } from "./project.js";

class toDoItem {
    constructor(title, description, dueDate, priority, checked = false, project = null) {
        this.id = crypto.randomUUID();
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._checked = checked;
        this._project = project;
    }

    // GETTERS / SETTERS
    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        this._dueDate = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }

    get checked() {
        return this._checked;
    }

    set checked(value) {
        if (typeof value !== "boolean") {
            throw new Error(`Checked must be either true or false. Received ${value}.`);
        }
        this._checked = value;
    }

    get project() {
        return this._project;
    }

    set project(value) {
        console.log(value);
        if (value !== null && !projectExists(value) ){
            throw new Error(`Project ${value} does not exist.`)
        }
        this._project = value;
    }

    // METHODS
    switchChecked() {
        this.checked = !this.checked;
    }
}

const createToDoItem = function(title, description, dueDate, priority, checked = false, project = null) {
    return new toDoItem(title, description, dueDate, priority, checked, project);
}

export { toDoItem, createToDoItem }