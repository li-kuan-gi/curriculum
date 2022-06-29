const csvForm = document.getElementById("csv-upload-form");
const csvInput = document.getElementById("csv-file");
const table = document.getElementById("curriculum");

csvForm.addEventListener("submit", event => {
    event.preventDefault();
    const csvFile = csvInput.files[0];
    if (csvFile) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const text = event.target.result;
            const data = csvToArray(text);
            createTableEntries(data);
            syncData();
        };
        reader.readAsText(csvFile);
    }
    csvInput.value = "";
});

function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    if (rows[rows.length - 1] === '') {
        rows.pop();
    }

    const arr = rows.map(row => row.split(delimiter));

    return [headers, ...arr];
}

function createTableEntries(data) {
    headers = data[0];
    rows = data.slice(1);
    createHeaders(headers);
    createRows(rows);
    processKlasses();
    // processTeacherNames();
}

function createHeaders(headers) {
    const tr = document.createElement('tr');
    headers.forEach(element => {
        const th = document.createElement('th');
        th.innerHTML = element;
        tr.appendChild(th);
    });
    table.appendChild(tr);
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
                    div.className = "klasse";
                    div.innerHTML = v;
                    td.appendChild(div);
                }
            } else {
                td.innerHTML = v;
            }
            tr.appendChild(td);
        });
        table.appendChild(tr);
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
    nameTds.forEach(t => {
        t.addEventListener("click", () => { setDefaultBackgroundColor(nameTds); t.style.backgroundColor = "yellow"; });
        t.addEventListener("touchend", () => { setDefaultBackgroundColor(nameTds); t.style.backgroundColor = "yellos"; });
    });
}

function setDefaultBackgroundColor(tags) {
    tags.forEach(t => t.style.backgroundColor = "");
}
