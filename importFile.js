const csvForm = document.getElementById("csv-upload-form");
const csvInput = document.getElementById("csv-file");
const updateButton = document.getElementById("updating");

function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    if (rows[rows.length - 1] === '') {
        rows.pop();
    }

    const arr = rows.map(row => row.split(delimiter));

    return [headers, ...arr];
}

function clearTable() {
    curriculumTable.innerHTML = "";
}

function createTableEntries(data) {
    headers = data[0];
    rows = data.slice(1);
    createHeaders(headers);
    createRows(rows);
    processKlasses();
    processTeacherNames();
}

function createHeaders(headers) {
    const tr = document.createElement('tr');
    headers.forEach(element => {
        const th = document.createElement('th');
        th.innerHTML = element;
        tr.appendChild(th);
    });
    curriculumTable.appendChild(tr);
}

function createRows(rows) {
    rows.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach((v, i) => {
            const td = document.createElement('td');
            if (i === NAME_INDEX) {
                td.className = "teacher-name";
            }
            if (KLASSE_INDICES.includes(i)) {
                td.className = "klasse-cell";
                if (i == KLASSE_INDICES[0]) {
                    td.className += " " + "home-class";
                }
                if (v !== '') {
                    const div = document.createElement('div');
                    div.className = `klasse ${getCategoryInDescription(v)} grade${getGradeInDescription(v) + 1}`;
                    div.innerHTML = v;
                    td.appendChild(div);
                }
            } else {
                td.innerHTML = v;
            }
            tr.appendChild(td);
        });
        curriculumTable.appendChild(tr);
    });
}

function processKlasses() {
    const draggables = Array.from(document.getElementsByClassName('klasse'));

    draggables.forEach(
        element => {
            centralize(element);
            makeDraggable(element);
        }
    );
}

function processTeacherNames() {
    const nameTds = Array.from(document.getElementsByClassName("teacher-name"));
    const rows = Array.from(curriculumTable.childNodes).slice(1);
    rows.forEach(row => {
        const nameTd = getNameTd(row);

        if (isChief(row)) {
            nameTd.style.backgroundColor = CHIEF_COLOR;
        } else {
            nameTd.style.backgroundColor = "";
        }

        nameTd.addEventListener("click", () => { setDefaultBackgroundColor(nameTds); nameTd.style.backgroundColor = CHIEF_COLOR; });
        nameTd.addEventListener("touchend", () => { setDefaultBackgroundColor(nameTds); nameTd.style.backgroundColor = CHIEF_COLOR; });
    });
}

function setDefaultBackgroundColor(tags) {
    tags.forEach(t => t.style.backgroundColor = "");
}
