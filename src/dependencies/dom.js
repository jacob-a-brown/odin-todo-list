// module to manipulate the DOM
import { TODOS, deleteToDo } from "./todo.js";
import { PROJECTS } from "./project.js";

function createSVGIcon(path, className) {
    const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("viewBox", "0 0 24 24");
    svgIcon.setAttribute("class", className);

    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", path);
    
    svgIcon.appendChild(svgPath);

    return svgIcon;
}

const todoContainer = document.querySelector(".todo-container");
const projectContainer = document.querySelector(".project-container");

const populateToDos = (function () {
    const clearDisplay = function() {
        todoContainer.replaceChildren();
        const todoTitle = document.createElement("h1");
        todoTitle.textContent = "Todos";
        todoContainer.appendChild(todoTitle);
    }

    const displayByFilter = function(filterParam = null, filterValue = null) {
        clearDisplay()
        let filteredToDos;

        if (filterParam === null) {
            filteredToDos = TODOS;
        } else if (filterParam === "project"){
            filteredToDos = TODOS.filter((elem) => elem.project === filterValue);
        }

        filteredToDos.forEach((item) => {
            const toDoDiv = document.createElement("div");
            toDoDiv.className = "todo-div";
            toDoDiv.id = `todo-div-${item.id}`;

            const checkedButton = document.createElement("input");
            checkedButton.type = "checkbox";
            checkedButton.className = "todo-checkbox";
            checkedButton.id = `todo-checkbox-${item.id}`;
            checkedButton.name = item.id;
            checkedButton.checked = item.checked;

            const todoTitle = document.createElement("h3");
            todoTitle.className = "todo-title";
            todoTitle.textContent = item.title;

            const todoDescription = document.createElement("p");
            todoDescription.className = "todo-description";
            todoDescription.textContent = item.description;

            const todoDate = document.createElement("p");
            todoDate.className = "todo-date";
            todoDate.textContent = item.dueDate;

            const todoEdit = createSVGIcon("M10 20H6V4H13V9H18V12.1L20 10.1V8L14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20M20.2 13C20.3 13 20.5 13.1 20.6 13.2L21.9 14.5C22.1 14.7 22.1 15.1 21.9 15.3L20.9 16.3L18.8 14.2L19.8 13.2C19.9 13.1 20 13 20.2 13M20.2 16.9L14.1 23H12V20.9L18.1 14.8L20.2 16.9Z", "todo-edit");
            const todoDelete = createSVGIcon("M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z", "todo-delete")

            checkedButton.addEventListener("click", function(){
                item.checked = !item.checked;
                checkedButton.checked = item.checked;
            })

            todoDelete.addEventListener("click", function() {
                deleteToDo(item.id);
                displayByFilter(filterParam, filterValue);
            })

            toDoDiv.appendChild(checkedButton);
            toDoDiv.appendChild(todoTitle);
            toDoDiv.appendChild(todoDescription);
            toDoDiv.appendChild(todoDate);
            toDoDiv.appendChild(todoEdit);
            toDoDiv.appendChild(todoDelete);
            todoContainer.appendChild(toDoDiv);
        })    
    }
    

    const displayAll = function () {
         displayByFilter();
    }

    const displayByProject = function (projectName) {
        displayByFilter("project", projectName)
    }    

    return {
        displayAll,
        displayByProject
    }
})();

const populateProjects = (function() {

    const display = function() {
        // have an option to display all projects
        const projectDiv = document.createElement("div");
        projectDiv.className = "project-div";

        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "project";
        radioButton.value = "";
        radioButton.id = "radio-none";
        radioButton.checked = true;
        
        const allProjects = document.createElement("label");
        allProjects.className = "project-item";
        allProjects.id = "all-projects";
        allProjects.textContent = "All";
        allProjects.htmlFor = "radio-none";

        radioButton.addEventListener("change", function(event) {
            populateToDos.displayAll();
        })

        projectDiv.appendChild(radioButton);
        projectDiv.appendChild(allProjects);
        projectContainer.appendChild(projectDiv);

        // start by displaying all
        populateToDos.displayAll();

        // show each project
        PROJECTS.forEach(function(item) {
            const projectDiv = document.createElement("div");
            projectDiv.className = "project-div";

            const radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = "project";
            radioButton.value = item.name;
            radioButton.id = item.id;

            const projectNode = document.createElement("label");
            projectNode.className = "project-item";
            projectNode.textContent = item.name;
            projectNode.htmlFor = item.id;

            radioButton.addEventListener("change", function(event) {
                populateToDos.displayByProject(event.target.value);
            })

            projectDiv.appendChild(radioButton);
            projectDiv.appendChild(projectNode);
            projectContainer.appendChild(projectDiv);
        })
    }

    return {
        display
    }

})();

export { populateToDos, populateProjects }