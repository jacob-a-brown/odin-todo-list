import { projectExists } from "./project.js";
import { format, isDate, parse, isValid } from "date-fns";

// temporary storage for ToDoItems
const TODOS = []

class ToDoItem {
    constructor(title, description, dueDate, priority, checked = false, project = null) {
        this._id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
        this.project = project;
    }

    // GETTERS / SETTERS
    get id() {
        return this._id;
    }

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
        return format(this._dueDate, "yyyy-MM-dd");
    }

    set dueDate(value) {
        // parse as local calendar date instead of new Date(), which treats "yyyy-MM-dd" as UTC
        const formattedDueDate = isDate(value) ? value : parse(value, "yyyy-MM-dd", new Date());
        if (!isValid(formattedDueDate)){
            throw new Error("Due date must be a Date object or a yyyy-MM-dd formatted string.")
        }
        this._dueDate = formattedDueDate;
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
        if (value !== null && !projectExists(value) ){
            throw new Error(`Project ${value} does not exist.`)
        }
        this._project = value;
    }

    // CLASS METHODS
    switchChecked() {
        this.checked = !this.checked;
    }

    // STATIC METHODS
    static create(title, description, dueDate, priority, checked = false, project = null) {
        return new this(title, description, dueDate, priority, checked, project);
    }
}

const addToDo = function(title, description, dueDate, priority, checked = false, project = null) {
    TODOS.push(ToDoItem.create(title, description, dueDate, priority, checked, project));
}

const deleteToDo = function(id) {
    const todoInd = TODOS.findIndex((td) => td.id === id);
    TODOS.splice(todoInd, 1);
}

const getToDo = function(id) {
    return TODOS.find((td) => td.id === id);
}

const getToDoItemsByProject = function(name) {
    const todoItemsByProject = TODOS.filter((td) => td.project === name);
    return todoItemsByProject;
}

export { ToDoItem, addToDo, deleteToDo, getToDo, getToDoItemsByProject, TODOS }