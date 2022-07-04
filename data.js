const DROPHOUR_DUE_TO_HOMEROOM = 4;
const DROPHOUR_DUE_TO_CHIEF = 2;

const CHIEF_COLOR = "orange";
const isChief = (row) => {
    const hour = parseInt(getBasicTd(row).innerHTML);
    return hour % 4 !== 0;
};

const NAME_INDEX = 0;
const BASIC_INDEX = 1;
const HOMEROOM_INDEX = 2;
const HOME_CLASS_INDEX = 3;
const KLASSE_INDICES = new Array(6).fill().map((_, i) => 3 + i);
const ENGINEER_INDEX = 9;
const BUISNESS_INDEX = 10;
const TOTAL_INDEX = 11;
const EXCESS_index = 12;

const BUISNESS_CATEGORY = ["貿", "資", "商", "應"];
const ENGINEER_CATEGORY = ["圖", "汽", "模", "機", "板"];
const PHYSICAL_CATEGORY = ["體"];

const GRADE_CHAR = ["一", "二", "三"];

const curriculumTable = document.getElementById("curriculum");

function getNameTd(row) {
    return row.childNodes[NAME_INDEX];
}

function getBasicTd(row) {
    return row.childNodes[BASIC_INDEX];
}

function getHomeroomTd(row) {
    return row.childNodes[HOMEROOM_INDEX];
}

function getHomeClassTd(row) {
    return row.childNodes[HOME_CLASS_INDEX];
}

function getKlasseTds(row) {
    const possibleTds = KLASSE_INDICES.map(v => row.childNodes[v]);
    return possibleTds.filter(td => td.childNodes.length > 0);
}

function getEngineerTd(row) {
    return row.childNodes[ENGINEER_INDEX];
}

function getBusinessTd(row) {
    return row.childNodes[BUISNESS_INDEX];
}

function getTotalTd(row) {
    return row.childNodes[TOTAL_INDEX];
}

function getExcessTd(row) {
    return row.childNodes[EXCESS_index];
}

function getHour(td) {
    if (td.childNodes.length === 0) {
        return 0;
    }
    const description = td.childNodes[0].innerHTML;
    return parseInt(description.match(/\d+/)[0]);
}

function getCateg(td) {
    if (td.childNodes.length === 0) {
        return null;
    }
    const description = td.childNodes[0].innerHTML;
    return getCategoryInDescription(description);
}

function getGrade(td) {
    if (td.childNodes.length === 0) {
        return null;
    }
    const description = td.childNodes[0].innerHTML;
    return getGradeInDescription(description);
}

function getCategoryInDescription(description) {
    if (BUISNESS_CATEGORY.find(char => description.includes(char))) { return "business"; }
    if (ENGINEER_CATEGORY.find(char => description.includes(char))) { return "engineer"; }
    if (PHYSICAL_CATEGORY.find(char => description.includes(char))) { return "physical"; }
    throw "can not find category";
}

function getGradeInDescription(description) {
    return GRADE_CHAR.findIndex(char => description.includes(char));
}
