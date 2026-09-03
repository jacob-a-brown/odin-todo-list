const PROJECTS = [];

class ProjectItem {
    constructor(name, rgb) {
        this._id = crypto.randomUUID();
        this.name = name;
        this.rgb = rgb;
    }

    // GETTERS/SETTERS
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (projectExists(value)) {
            throw new Error(`The project ${value} already exists. There can't be two projects with the same name.`);
        }
        this._name = value;
    }

    get rgb(){
        return this._rgb;
    }

    set rgb(value){
        if (!Array.isArray(value)) {
            throw new Error("rgb must be an array.");
        }
        
        if (value.length !== 3){
            throw new Error("rgb must be an array of length 3.");
        }
        
        value.forEach((item) => {
            if (!Number.isInteger(item)){
                throw new Error("every element of the rgb array must be an integer.")
            }

            if (item < 0 || item > 255) {
                throw new Error("every rgb value must be between 0 and 255 inclusive.")
            }
        });
        
        this._rgb = value;
    }

    // STATIC METHODS
    static createNew(name, rgb){
        return new this(name, rgb);
    }

    static createFromStorage(id, name, rgb){
        const project = new this(name, rgb);
        project._id = id;
        return project;
    }
}

const loadProjectsFromLocalStorage = function () {
    const storedProjects = localStorage.getItem("projects");
    const projects = storedProjects ? JSON.parse(storedProjects) : [];
    projects.forEach((item) => PROJECTS.push(ProjectItem.createFromStorage(item.id, item.name, item.rgb)));
    return projects;
}

const saveProjectsToStorage = function() {
    // saves projects in localStorage. To be called after projects are edited
    localStorage.setItem(
        "projects",
        JSON.stringify(PROJECTS.map((project) => ({
            id: project.id,
            name: project.name,
            rgb: project.rgb,
        })))
    );
}

const addProject = function(name, rgb) {
    const newProject = ProjectItem.createNew(name, rgb);
    PROJECTS.push(newProject);
    saveProjectsToStorage();
}

const getProjectByName = function(name) {
    return PROJECTS.find((p) => p.name === name);
}

const getAllProjectNames = function() {
    const allProjectNames = PROJECTS.map((p) => p.name);
    return allProjectNames;
}

const projectExists = function(name) {
    return getProjectByName(name) !== undefined;
}

const colorExists = function(rgb) {
    // returns true if the color array exists, else returns false
    const allColors = PROJECTS.map((item) => item.rgb);
    return allColors.some((item) => item[0] === rgb[0] && item[1] === rgb[1] && item[2] === rgb[2]);
}


export { ProjectItem, loadProjectsFromLocalStorage, addProject, saveProjectsToStorage, getProjectByName, getAllProjectNames, projectExists, colorExists, PROJECTS }