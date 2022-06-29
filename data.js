const DROPHOUR_DUE_TO_HOMEROOM = 4;
const DROPHOUR_DUE_TO_CHIEF = 2;

const CHIEF_COLOR = "yellow";
const isChief = (row) => {
    const hour = parseInt(getBasicTd(row).innerHTML);
    return hour % 4 !== 0;
};

const NAME_INDEX = 0;
const BASIC_INDEX = 1;
const HOMEROOM_INDEX = 2;
const HOME_CLASS_INDEX = 3;
const KLASSE_INDICES = new Array(6).fill().map((_, i) => 3 + i);
const TOTAL_INDEX = 9;
const EXCESS_index = 10;


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
    return KLASSE_INDICES.map(v => row.childNodes[v]);
}

function getTotalTd(row) {
    return row.childNodes[TOTAL_INDEX];
}

function getExcessTd(row) {
    return row.childNodes[EXCESS_index];
}


function syncData() {
    rows = Array.from(curriculumTable.childNodes).slice(1);
    rows.forEach(row => {
        syncBasic(row);
        syncHomeroom(row);
        syncTotal(row);
        syncExcess(row);
    });
}

function syncBasic(row) {
    const basicTd = getBasicTd(row);

    const homeroomTd = getHomeroomTd(row);
    const homeroomOb = new MutationObserver(() => {
        if (homeroomTd.innerHTML !== "") {
            basicTd.innerHTML = parseInt(basicTd.innerHTML) - DROPHOUR_DUE_TO_HOMEROOM;
        } else {
            basicTd.innerHTML = parseInt(basicTd.innerHTML) + DROPHOUR_DUE_TO_HOMEROOM;
        }
    });
    homeroomOb.observe(homeroomTd, { childList: true });

    const nameTd = getNameTd(row);
    const nameOb = new MutationObserver(() => {
        if (nameTd.style.backgroundColor !== "") {
            basicTd.innerHTML = parseInt(basicTd.innerHTML) - DROPHOUR_DUE_TO_CHIEF;
        } else {
            basicTd.innerHTML = parseInt(basicTd.innerHTML) + DROPHOUR_DUE_TO_CHIEF;
        }
    });
    nameOb.observe(nameTd, { attributes: true });
}

function syncHomeroom(row) {
    const homeroomTd = getHomeroomTd(row);
    const homeClassTd = getHomeClassTd(row);
    const homeroomOb = new MutationObserver(() => {
        if (homeClassTd.innerHTML !== '') {
            homeroomTd.innerHTML = 1;
        } else {
            homeroomTd.innerHTML = "";
        }
    });
    homeroomOb.observe(homeClassTd, { childList: true, subtree: true });
}

function syncTotal(row) {
    const klasseTds = getKlasseTds(row);
    const homeroomTd = getHomeroomTd(row);
    const totalTd = getTotalTd(row);

    const totalOb = new MutationObserver(() => {
        const homeroomHour = homeroomTd.innerHTML === '' ? 0 : 1;
        const klassesHour = klasseTds.reduce((p, c) => p + getHour(c), 0);
        totalTd.innerHTML = homeroomHour + klassesHour;
    });

    totalOb.observe(homeroomTd, { childList: true });
    klasseTds.forEach((td) => {
        totalOb.observe(td, { childList: true });
    });
}

function getHour(td) {
    if (td.childNodes.length === 0) {
        return 0;
    }
    const description = td.childNodes[0].innerHTML;
    return parseInt(description.match(/\d+/)[0]);
}

function syncExcess(row) {
    const basicTd = getBasicTd(row);
    const totalTd = getTotalTd(row);
    const excessTd = getExcessTd(row);

    const excessOb = new MutationObserver(() => {
        excessTd.innerHTML = parseInt(totalTd.innerHTML) - parseInt(basicTd.innerHTML);
    });

    excessOb.observe(basicTd, { childList: true });
    excessOb.observe(totalTd, { childList: true });
}
