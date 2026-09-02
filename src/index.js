import "./style.css";
import * as todo from "./dependencies/todo.js";
import * as project from "./dependencies/project.js";
import * as dom from "./dependencies/dom.js";

todo.addToDo("title 0", "description 0", "2000-01-01", 0, false, null);
project.addProject("Project 1", [101, 255, 0]);
project.addProject("Project 2", [58, 66, 205]);
todo.addToDo("title 1", "description 1", "2001-01-01", 1, true, "Project 1");
todo.addToDo("title 2", "description 2", "2002-01-01", 2, true, "Project 2");

dom.populateProjects.display();