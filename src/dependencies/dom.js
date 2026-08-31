// module to manipulate the DOM
import { TODOS } from "./todo.js";
import { PROJECTS } from "./project.js";

const todoContainer = document.querySelector(".todo-container");
const projectContainer = document.querySelector(".project-container");

const populateToDos = (function () {
    const clearDisplay = function() {
        todoContainer.replaceChildren();
        const todoHeader = document.createElement("h1");
        todoHeader.textContent = "Todos";
        todoContainer.appendChild(todoHeader);
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

            const toDoNode = document.createElement("p");
            toDoNode.className = "to-do-item";
            toDoNode.id = item.id;
            toDoNode.textContent = `${item.title} and project is ${item.project} checked is ${item.checked}`;

            checkedButton.addEventListener("click", function(){
                item.checked = !item.checked;
                checkedButton.checked = item.checked;
                toDoNode.textContent = `${item.title} and project is ${item.project} checked is ${item.checked}`;
            })

            toDoDiv.appendChild(checkedButton);
            toDoDiv.appendChild(toDoNode);
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