csvForm.addEventListener("submit", event => {
    event.preventDefault();
    const csvFile = csvInput.files[0];
    if (csvFile) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const text = event.target.result;
            const data = csvToArray(text);
            clearTable();
            createTableEntries(data);
            syncData();
            showUpdateButton();
            // showDownloadCSVButton();
            showDownloadButtons();
        };
        reader.readAsText(csvFile);
    }
    csvInput.value = "";
});
