// module to manipulate the DOM
import { TODOS } from "./todo.js";

const content = document.querySelector(".content");

const populateToDos = (function () {
    const displayAll = function () {
        TODOS.forEach((item) => {
            const toDoNode = document.createElement("p");
            toDoNode.className = "to-do-item";
            toDoNode.id = item.id;
            toDoNode.textContent = item.title;
            content.addChild(toDoNode);
        })
    }
})();

export { populateToDos }