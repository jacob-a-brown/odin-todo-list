// module to manipulate the DOM
import { TODOS, addToDo, deleteToDo } from "./todo.js";
import { PROJECTS, addProject, getAllProjectNames, getProjectByName, projectExists, colorExists } from "./project.js";

function createAddEditFormLine(_textContent, _id, _defaultValue, _type="text") {
        const addEditLabel = document.createElement("label");
        addEditLabel.textContent = `${_textContent}: `;
        
        const addEditInput = document.createElement("input");
        addEditInput.id = _id;
        addEditInput.type = _type;
        addEditInput.value = _defaultValue;
        addEditLabel.appendChild(addEditInput);

        return addEditLabel;
    }

const todoContainer = document.querySelector(".todo-container");
const projectContainer = document.querySelector(".project-container");

const populateToDos = (function () {
    const clearDisplay = function() {
        todoContainer.replaceChildren();
    }

    function createSVGIcon(path, className) {
        const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgIcon.setAttribute("viewBox", "0 0 24 24");
        svgIcon.setAttribute("class", className);

        const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        svgPath.setAttribute("d", path);
        
        svgIcon.appendChild(svgPath);

        return svgIcon;
    }

    const createAddEditDialog = function(
        defaultTitle = "",
        defaultDescription = "",
        defaultDueDate = "",
        defaultChecked = false,
        defaultProject = "",
        item = null,
        filterParam = null,
        filterValue = null) {

        // create new dialog with form to submit new information
        // information should be pre-populated
        const dialogDiv = document.createElement("div");
        dialogDiv.className = "add-edit-dialog";

        const addEditForm = document.createElement("form");
        addEditForm.id = `add-edit-form`;
        
        const addEditHeader = document.createElement("h4");

        if (defaultTitle === ""){
            addEditHeader.textContent = "Create a new todo";
        } else {
            addEditHeader.textContent = `Edit ${item.title}`;
        }
        addEditForm.appendChild(addEditHeader);

        const titleLine = createAddEditFormLine("Title", "add-edit-title", defaultTitle)
        const descriptionLine = createAddEditFormLine("Description", "add-edit-description", defaultDescription);
        const dueDateLine = createAddEditFormLine("Due Date", "add-edit-due-date", defaultDueDate);
        
        const addEditCheckedLabel = document.createElement("label");
        addEditCheckedLabel.textContent = "Done: ";
        const addEditChecked = document.createElement("input");
        addEditChecked.type = "checkbox";
        addEditChecked.checked = defaultChecked;
        addEditChecked.id = "add-edit-checked";
        addEditCheckedLabel.appendChild(addEditChecked);


        const projectAddEditLabel = document.createElement("label");
        const projectAddEditSelect = document.createElement("select");
        projectAddEditLabel.textContent = "Project: "
        projectAddEditSelect.id = "add-edit-project";

        // add a null option for projects
        const nullOption = document.createElement("option");
        nullOption.value = "null";
        nullOption.text = "None";
        projectAddEditSelect.appendChild(nullOption);

        const projectOptions = getAllProjectNames();
        projectOptions.forEach(p => {
            const option = document.createElement("option");
            option.value = p;
            option.text = p;
            projectAddEditSelect.appendChild(option);
        })
        projectAddEditLabel.appendChild(projectAddEditSelect);

        addEditForm.appendChild(titleLine);
        addEditForm.appendChild(descriptionLine);
        addEditForm.appendChild(dueDateLine);
        addEditForm.appendChild(addEditCheckedLabel);
        addEditForm.appendChild(projectAddEditLabel);

        const buttonDiv = document.createElement("div");
        buttonDiv.className = "button-div";

        // create submit button
        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.type = "submit";
        submitButton.setAttribute("form", addEditForm.id);
        buttonDiv.appendChild(submitButton);

        addEditForm.addEventListener("submit", function(e){
            e.preventDefault();

            const titleInput = document.getElementById("add-edit-title");
            const descriptionInput = document.getElementById("add-edit-description");
            const dueDateInput = document.getElementById("add-edit-due-date");
            const checkedInput = document.getElementById("add-edit-checked");
            const projectInput = document.getElementById("add-edit-project");

            if (item === null){
                addToDo(titleInput.value, descriptionInput.value, dueDateInput.value, 0, checkedInput.checked, projectInput.value === "null" ? null : projectInput.value);
            } else {
                item.title = titleInput.value;
                item.description = descriptionInput.value;
                item.dueDate = dueDateInput.value;
                item.checked = checkedInput.checked;
                item.project = projectInput.value === "null" ? null : projectInput.value;
            }
            

            dialogDiv.remove();
            displayByFilter(filterParam, filterValue);
        })

        // Create close button
        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Close";
        closeBtn.type = "button";
        buttonDiv.appendChild(closeBtn);

        closeBtn.addEventListener("click", function() {
            dialogDiv.remove();
        });

        // Close dialog on Escape key
        const escapeHandler = function(e) {
            if (e.key === "Escape") {
                dialogDiv.remove();
                document.removeEventListener("keydown", escapeHandler);
            }
        };
        document.addEventListener("keydown", escapeHandler);

        addEditForm.append(buttonDiv);
        dialogDiv.appendChild(addEditForm);

        return dialogDiv;
    }

    const displayByFilter = function(filterParam = "all", filterValue = null) {
        clearDisplay()
        const todoTitle = document.createElement("h1");
        todoTitle.textContent = "Todos";
        todoContainer.appendChild(todoTitle);

        const addTodoButton = document.createElement("button");
        addTodoButton.className = "add-todo-button";
        addTodoButton.textContent = "Create Todo";
        todoContainer.appendChild(addTodoButton);

        addTodoButton.addEventListener("click", function(){
            const addDialog = createAddEditDialog("", "", "", false, "", null, filterParam, filterValue);
            todoContainer.appendChild(addDialog);
        });

        let filteredToDos;

        if (filterParam === "all") {
            filteredToDos = TODOS;
        } else if (filterParam === "project"){
            filteredToDos = TODOS.filter((elem) => elem.project === filterValue);
        }

        filteredToDos.forEach((item) => {
            const toDoDiv = document.createElement("div");
            toDoDiv.className = "todo-div";
            toDoDiv.id = `todo-div-${item.id}`;

            const todoProjectIndicator = document.createElement("div");
            todoProjectIndicator.className = "todo-project-indicator";

            if (item.project === null){
                todoProjectIndicator.style.backgroundColor = "white";
            } else {
                const correspondingProject = getProjectByName(item.project);
                const projectRgb = correspondingProject.rgb;
                todoProjectIndicator.style.backgroundColor = `rgba(${projectRgb[0]}, ${projectRgb[1]}, ${projectRgb[2]}, 0.4)`
            }
            toDoDiv.appendChild(todoProjectIndicator);

            const checkedButton = document.createElement("input");
            checkedButton.type = "checkbox";
            checkedButton.className = "todo-checkbox";
            checkedButton.id = `todo-checkbox-${item.id}`;
            checkedButton.name = item.id;
            checkedButton.checked = item.checked;

            const todoTextDiv = document.createElement("div");
            todoTextDiv.className = "todo-text-div"

            const todoTitle = document.createElement("h3");
            todoTitle.className = "todo-title";
            todoTitle.textContent = item.title;

            const todoDescription = document.createElement("p");
            todoDescription.className = "todo-description";
            todoDescription.textContent = item.description;

            const todoDate = document.createElement("p");
            todoDate.className = "todo-date";
            todoDate.textContent = item.dueDate;

            todoTextDiv.appendChild(todoTitle);
            todoTextDiv.appendChild(todoDescription);
            todoTextDiv.appendChild(todoDate);

            const todoEdit = createSVGIcon("M10 20H6V4H13V9H18V12.1L20 10.1V8L14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20M20.2 13C20.3 13 20.5 13.1 20.6 13.2L21.9 14.5C22.1 14.7 22.1 15.1 21.9 15.3L20.9 16.3L18.8 14.2L19.8 13.2C19.9 13.1 20 13 20.2 13M20.2 16.9L14.1 23H12V20.9L18.1 14.8L20.2 16.9Z", "todo-edit");
            const todoDelete = createSVGIcon("M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z", "todo-delete")

            checkedButton.addEventListener("click", function(){
                item.checked = !item.checked;
                checkedButton.checked = item.checked;
            })

            // the following event listeners alter the state of the item so need to refresh the display
            todoEdit.addEventListener("click", function() {
                // create new dialog with form to submit new information
                // information should be pre-populated
                const editDialog = createAddEditDialog(item.title, item.description, item.dueDate, item.checked, item.project, item, filterParam, filterValue)
                document.body.appendChild(editDialog);
            });


            todoDelete.addEventListener("click", function() {
                deleteToDo(item.id);
                displayByFilter(filterParam, filterValue);
            });

            toDoDiv.appendChild(checkedButton);
            toDoDiv.appendChild(todoTextDiv);
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

    const clearDisplay = function () {
        projectContainer.replaceChildren();
    }

    const createAddDialog = function() {
        const dialogDiv = document.createElement("div");
        dialogDiv.className = "add-edit-dialog";

        const addEditForm = document.createElement("form");
        addEditForm.id = `add-edit-form`;

        const addEditHeader = document.createElement("h4");
        addEditHeader.textContent = "Create a new project";
        addEditForm.appendChild(addEditHeader);

        const nameLine = createAddEditFormLine("Name", "add-edit-name", "", "text");
        const redLine = createAddEditFormLine("Red", "add-edit-red", "", "number");
        const greenLine = createAddEditFormLine("Green", "add-edit-green", "", "number");
        const blueLine = createAddEditFormLine("Blue", "add-edit-blue", "", "number");

        addEditForm.appendChild(nameLine);
        addEditForm.appendChild(redLine);
        addEditForm.appendChild(greenLine);
        addEditForm.appendChild(blueLine);

        const buttonDiv = document.createElement("div");
        buttonDiv.className = "button-div";

        // create submit button
        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.type = "submit";
        submitButton.setAttribute("form", addEditForm.id);
        buttonDiv.appendChild(submitButton);

        addEditForm.addEventListener("submit", function(e){
            e.preventDefault();

            const nameInput = document.getElementById("add-edit-name");
            const redInput = document.getElementById("add-edit-red");
            const greenInput = document.getElementById("add-edit-green");
            const blueInput = document.getElementById("add-edit-blue");

            if (projectExists(nameInput.value)){
                nameInput.setCustomValidity(`Project ${nameInput.value} already exists. Choose a new name.`);
                nameInput.reportValidity();
            if (colorExists([redInput.value, greenInput.value, blueInput.value])){
                redInput.setCustomValidity(`RGB [${redInput}, ${greenInput}, ${blueInput}] already exists. Choose another rgb.`)
                greenInput.setCustomValidity(`RGB [${redInput}, ${greenInput}, ${blueInput}] already exists. Choose another rgb.`)
                blueInput.setCustomValidity(`RGB [${redInput}, ${greenInput}, ${blueInput}] already exists. Choose another rgb.`)
            }
            } else {
                nameInput.setCustomValidity("");
                redInput.setCustomValidity("");
                greenInput.setCustomValidity("");
                blueInput.setCustomValidity("");
                try{
                    addProject(nameInput.value, [Number(redInput.value), Number(greenInput.value), Number(blueInput.value)]);
                    dialogDiv.remove();
                    display();
                } catch(error) {
                    let errorMsg = document.createElement("p");
                    errorMsg.textContent = error.message;
                    errorMsg.style.color = "red";
                    addEditForm.appendChild(errorMsg);

                }
            }

            
        });

        // Create close button
        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Close";
        closeBtn.type = "button";
        buttonDiv.appendChild(closeBtn);

        closeBtn.addEventListener("click", function() {
            dialogDiv.remove();
        });

        // Close dialog on Escape key
        const escapeHandler = function(e) {
            if (e.key === "Escape") {
                dialogDiv.remove();
                document.removeEventListener("keydown", escapeHandler);
            }
        };
        document.addEventListener("keydown", escapeHandler);

        addEditForm.append(buttonDiv);
        dialogDiv.appendChild(addEditForm);

        return dialogDiv;

    }

    const display = function() {
        clearDisplay();
        const projectTitle = document.createElement("h1");
        projectTitle.textContent = "Projects";
        projectContainer.appendChild(projectTitle);

        // have an option to display all projects
        const allProjectDiv = document.createElement("div");
        allProjectDiv.className = "project-div";

        const addProjectButton = document.createElement("button");
        addProjectButton.textContent = "Create Project";
        projectContainer.appendChild(addProjectButton);

        addProjectButton.addEventListener("click", function(){
            const addProjectDialog = createAddDialog();
            document.body.appendChild(addProjectDialog);
        })

        const allRadioButton = document.createElement("input");
        allRadioButton.type = "radio";
        allRadioButton.name = "project";
        allRadioButton.value = "";
        allRadioButton.id = "radio-all";
        allRadioButton.checked = true;
        
        const allProjects = document.createElement("label");
        allProjects.className = "project-item";
        allProjects.id = "all-projects";
        allProjects.textContent = "All";
        allProjects.htmlFor = "radio-all";

        allRadioButton.addEventListener("change", function(event) {
            populateToDos.displayAll();
        })

        allProjectDiv.appendChild(allRadioButton);
        allProjectDiv.appendChild(allProjects);
        projectContainer.appendChild(allProjectDiv);

        // const nullProjectDiv = document.createElement("div");
        // nullProjectDiv.className = "project-div";

        // const nullRadioButton = document.createElement("input");
        // nullRadioButton.type = "radio";
        // nullRadioButton.name = "project";
        // nullRadioButton.value = "";
        // nullRadioButton.id = "radio-none";
        // nullRadioButton.checked = false;
        
        // const nullProjects = document.createElement("label");
        // nullProjects.className = "project-item";
        // nullProjects.id = "null-projects";
        // nullProjects.textContent = "None";
        // nullProjects.htmlFor = "radio-none";

        // nullRadioButton.addEventListener("change", function(event) {
        //     populateToDos.displayByProject(null);
        // })

        // nullProjectDiv.appendChild(nullRadioButton);
        // nullProjectDiv.appendChild(nullProjects);
        // projectContainer.appendChild(nullProjectDiv);

        // start by displaying all
        populateToDos.displayAll();

        // show each project
        PROJECTS.forEach(function(item) {
            const projectDiv = document.createElement("div");
            projectDiv.className = "project-div";
            projectDiv.style.backgroundColor = `rgba(${item.rgb[0]}, ${item.rgb[1]}, ${item.rgb[2]}, 0.4)`;

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