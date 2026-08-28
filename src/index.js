import * as toDo from "./dependencies/todo.js";
import * as project from "./dependencies/project.js";

const nullToDo = toDo.createToDoItem("title", "description", "dueDate", 1, true, null);
project.createProjectItem("hurry")
const hurryToDo = toDo.createToDoItem("title 2", "description 2", "dueDate 2", 2, true, "hurry")

console.log(nullToDo);
console.log(project.PROJECTS);
console.log(hurryToDo);

const fakeToDo = toDo.createToDoItem("title 3", "description 3", "dueDate 3", 3, false, "fake");
console.log(fakeToDo);