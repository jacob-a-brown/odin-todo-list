const PROJECTS = [];

class ProjectItem {
    constructor(name) {
        this._id = crypto.randomUUID();
        this.name = name;
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
            throw new Error(`The project ${value} already exists. There can't be two projects with the same name.`)
        }
        this._name = value;
    }

    // STATIC METHODS
    static create(name){
        return new this(name);
    }
}

const addProject = function(name) {
    PROJECTS.push(ProjectItem.create(name));
}

const getProject = function(name) {
    return PROJECTS.find((p) => p.name === name);
}

const projectExists = function(name) {
    return getProject(name) !== undefined;
}



export { ProjectItem, addProject, getProject, projectExists, PROJECTS }