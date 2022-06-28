class Curriculum {
    constructor() {
        this._curriculum = {};
    }
    
    get teachers() {
        return Object.keys(this._curriculum);
    }
    
    get klasses() {
        const klasses = new Set();
        this.teachers.forEach(t => klasses.union(this._curriculum[t]));
        return klasses;
    }
    
    addKlasses(teacher, klasses) {
        if (!this._curriculum.hasOwnProperty(teacher)) {
            this._curriculum[teacher] = new Set();
        }
        Array.from(klasses).forEach(k => this._curriculum[teacher].add(k));
    }

    getKlasses(teacher) {
        return this._curriculum[teacher];
    }
}

class Teacher {
    static basicHour = 16;
    static dropHourDueToHomeroom = 4;
    
    constructor(name, homeroom = false) {
        this.name = name;
        this.homeroom = homeroom;
    }
    
    get minHour() {
        const dropHour = this.homeroom
        ? this.constructor.dropHourDueToHomeroom
        : 0;
        
        return this.constructor.basicHour - dropHour;
    }
}

class klasse {
    // grade = 0 means 3rd grade.
    constructor(name, grade, category, credit) {
        this.name = name;
        this.grade = grade;
        this.category = category;
        this.credit = credit;
    }
}

const Category = Object.freeze({ buisness: "buisness", engineer: "engineer" });

Set.prototype.union = function (s) {
    Array.from(s).forEach(e => this.add(e));
}

const curriculum = new Curriculum();