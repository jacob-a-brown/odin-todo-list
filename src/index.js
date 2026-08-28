import * as toDo from "./dependencies/todo.js";
import * as project from "./dependencies/project.js";
import * as dom from "./dependencies/dom.js";

toDo.addToDo("title 1", "description 1", "dueDate 1", 1, true, null);
project.addProject("not false");
toDo.addToDo("title 2", "description 2", "dueDate 2", 2, true, "not false");

console.log(toDo.TODOS);
console.log(project.PROJECTS);
console.log(toDo.getToDoItemsByProject(null));