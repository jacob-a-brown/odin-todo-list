// module to manipulate the DOM
import { TODOS } from "./todo.js";
import { PROJECTS } from "./project.js";

const todoContainer = document.querySelector(".todo-container");
const projectContainer = document.querySelector(".project-container");

const populateToDos = (function () {
    const clearDisplay = function() {
        todoContainer.replaceChildren();
    }

    const displayAll = function () {
        clearDisplay();

        TODOS.forEach((item) => {
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
            toDoNode.textContent = `${item.title} and checked is ${item.checked}`;

            checkedButton.addEventListener("click", function(){
                item.checked = !item.checked;
                checkedButton.checked = item.checked;
                toDoNode.textContent = `${item.title} and checked is ${item.checked}`;
            })

            toDoDiv.appendChild(checkedButton);
            toDoDiv.appendChild(toDoNode);
            todoContainer.appendChild(toDoDiv);
        })    
    }

    const displayByProject = function (projectName) {
        clearDisplay()

        const projectToDos = TODOS.filter((elem) => elem.project === projectName);

        projectToDos.forEach((item) => {
            const toDoNode = document.createElement("p");
            toDoNode.className = "to-do-item";
            toDoNode.id = item.id;
            toDoNode.textContent = item.title;
            todoContainer.appendChild(toDoNode);
        })
    }    

    return {
        displayAll,
        displayByProject
    }
})();

const populateProjects = (function() {

    const displayAll = function() {
        PROJECTS.forEach(function(item) {
            const projectNode = document.createElement("p");
            projectNode.className = "project-item";
            projectNode.id = item.id;
            projectNode.textContent = item.name;
            projectContainer.appendChild(projectNode);
        })
    }

    return {
        displayAll
    }

})();

export { populateToDos, populateProjects }