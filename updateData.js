function showUpdateButton() {
    const klasseTds = Array.from(curriculumTable.childNodes).slice(1).reduce(
        (p, c) => p.concat(getKlasseTds(c)), []
    );
    const updateButton = document.getElementById("updating");

    updateButton.style.display = "";
    klasseTds.forEach((td) => {
        centralize(td.childNodes[0]);
    });
    let updated = false;
    updateButton.addEventListener('click', () => {
        if (!updated) {
            updateData(klasseTds);
            updated = true;
        }
    });
}

function updateData(klasseTds) {
    klasseTds.forEach((td) => {
        updateKlasseTd(td);
    });
}

function updateKlasseTd(td) {
    const categ = getCateg(td);
    switch (categ) {
        case "business":
            updateBusinessTd(td);
            break;
        case "engineer":
            updateEngineerTd(td);
            break;
        case "physical":
            updatePhysicalTd(td);
            break;
    }
}

function updateBusinessTd(td) {
    updateWithSomeGrades(td, 3);
}

function updateEngineerTd(td) {
    updateWithSomeGrades(td, 3);
    const div = td.childNodes[0];
    if (div.innerHTML.includes(GRADE_CHAR[2])) {
        div.innerHTML = div.innerHTML.replace(/4/, '3');
    } else {
        div.innerHTML = div.innerHTML.replace(/3/, "4");
    }
}

function updatePhysicalTd(td) {
    updateWithSomeGrades(td, 2);
}

function updateWithSomeGrades(td, n_grade) {
    const div = td.childNodes[0];
    for (let i = 0; i < n_grade; i++) {
        const oldGrade = GRADE_CHAR[i];
        const newGrade = GRADE_CHAR[(i + 1) % n_grade];
        const re = new RegExp(oldGrade, "g");

        const oldValue = div.innerHTML;
        const newValue = div.innerHTML.replace(re, newGrade);
        if (oldValue !== newValue) {
            div.innerHTML = newValue;
            break;
        }
    }
}
