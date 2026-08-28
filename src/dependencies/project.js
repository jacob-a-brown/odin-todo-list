const PROJECTS = [];

class ProjectItem {
    constructor(name) {
        this._name = name;
    }

    // GETTERS/SETTERS
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
}

const createProjectItem = function(name) {
    const pj = new ProjectItem(name);
    PROJECTS.push(pj);
}

const projectExists = function(name) {
    console.log(PROJECTS.find((p) => p.name === name));
    return PROJECTS.find((p) => p.name === name) !== undefined;
}

export { ProjectItem, createProjectItem, projectExists, PROJECTS }