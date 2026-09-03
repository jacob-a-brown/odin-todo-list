import { projectExists } from "./project.js";
import { format, isDate, parse, isValid } from "date-fns";

// temporary storage for TodoItems
const TODOS = []

class TodoItem {
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
    static createNew(title, description, dueDate, priority, checked = false, project = null) {
        return new this(title, description, dueDate, priority, checked, project);
    }

    static createFromStorage({id, title, description, dueDate, priority, checked = false, project = null}){
        const todo = new this(title, description, dueDate, priority, checked, project);
        todo._id = id;
        return todo;
    }
}

const loadTodosFromLocalStorage = function() {
    const storedTodos = localStorage.getItem("todos");
    const todos = storedTodos ? JSON.parse(storedTodos) : [];
    todos.forEach((item) => TODOS.push(TodoItem.createFromStorage(item)));
    return todos;
}

const saveTodosToStorage = function() {
    // saves todos in localStorage. To be called after TODOS is edited
    localStorage.setItem(
        "todos",
        JSON.stringify(TODOS.map((todo) => ({
            id: todo.id,
            title: todo.title,
            description: todo.description,
            dueDate: todo.dueDate,
            priority: todo.priority,
            checked: todo.checked,
            project: todo.project
        })))
    );
}

const addTodo = function(title, description, dueDate, priority, checked = false, project = null) {
    TODOS.push(TodoItem.createNew(title, description, dueDate, priority, checked, project));
    saveTodosToStorage();
}

const deleteTodo = function(id) {
    const todoInd = TODOS.findIndex((td) => td.id === id);
    TODOS.splice(todoInd, 1);
    saveTodosToStorage();
}

const editTodo = function(id, title, description, dueDate, checked, project){
    const todoInd = TODOS.findIndex((td) => td.id === id);
    TODOS[todoInd].title = title;
    TODOS[todoInd].description = description;
    TODOS[todoInd].dueDate = dueDate;
    TODOS[todoInd].checked = checked;
    TODOS[todoInd].project = project;
    saveTodosToStorage();
}

const getTodo = function(id) {
    return TODOS.find((td) => td.id === id);
}

const getTodoItemsByProject = function(name) {
    const todoItemsByProject = TODOS.filter((td) => td.project === name);
    return todoItemsByProject;
}

export { TodoItem, loadTodosFromLocalStorage, addTodo, deleteTodo, editTodo, getTodo, getTodoItemsByProject, TODOS }