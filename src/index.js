import "./style.css";
import * as toDo from "./dependencies/todo.js";
import * as project from "./dependencies/project.js";
import * as dom from "./dependencies/dom.js";

toDo.addToDo("title 0", "description 0", "dueDate 0", 0, false, null);
project.addProject("Project 1", [101, 255, 0]);
project.addProject("Project 2", [58, 66, 205]);
toDo.addToDo("title 1", "description 1", "dueDate 1", 1, true, "Project 1");
toDo.addToDo("title 2", "description 2", "dueDate 2", 2, true, "Project 2");

dom.populateProjects.display();