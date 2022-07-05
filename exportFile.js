function showDownloadButtons() {
    const downloadDiv = document.getElementById("download");
    downloadDiv.style.display = "";
}

(function () {
    const csvLink = document.getElementById("csv-download");
    csvLink.addEventListener("click", () => {
        downloadCurriculumCSV();
    });
})();

(function () {
    const pngLink = document.getElementById("png-download");
    pngLink.addEventListener("click", () => {
        downloadCurriculumPNG();
    });
})();

function downloadCurriculumCSV() {
    const csvContent = getCurriculumCSV();
    const uri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", uri);
    link.setAttribute("download", "curriculum_next.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function getCurriculumCSV() {
    const data = getCurriculumArray();
    const csvFileHead = "data:text/csv;charset=utf-8,";

    return csvFileHead + data.map(r => r.join(',')).join('\n');
}

function getCurriculumArray() {
    const headArray = getHeadArray(curriculumTable);
    const rowArrays = getCurriculumRowArrays();
    return [headArray].concat(rowArrays);
}

function getHeadArray(table) {
    const head = Array.from(table.childNodes[0].childNodes);
    return head.map(th => th.innerHTML);
}

function getCurriculumRowArrays() {
    const rows = Array.from(curriculumTable.childNodes).slice(1);
    return rows.map(r => getCurriculumDataFromRow(r));
}

function getCurriculumDataFromRow(row) {
    return Array.from(row.childNodes).map((td, idx) => {
        if (KLASSE_INDICES.includes(idx)) {
            if (Array.from(td.childNodes).length === 0) {
                return "";
            } else {
                return td.childNodes[0].innerHTML;
            }
        }
        return td.innerHTML;
    });
}

function downloadCurriculumPNG() {
    html2canvas(curriculumTable).then(function (canvas) {
        const link = document.createElement("a");
        link.setAttribute("href", canvas.toDataURL(("image/png")));
        link.setAttribute("download", "curriculum_next.png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
