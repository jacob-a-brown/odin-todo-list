# odin-todo-list
This project is based off of the [Odin Project's](https://www.theodinproject.com/) [todo list assignment](https://www.theodinproject.com/lessons/node-path-javascript-todo-list).

# Storage

Both `Projects` and `Todos` are stored in `localStorage`. They are identified by their unique `id`. Upon startup of the application the `Projects` are first loaded and then the `Todos`. They are stored in arrays. It may be a little slower, but when an object is altered in the array (CRUD), it will also be altered in `localStorage`.