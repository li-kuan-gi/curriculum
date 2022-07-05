function syncData() {
    rows = Array.from(curriculumTable.childNodes).slice(1);
    rows.forEach(row => {
        syncBasic(row);
        syncHomeroom(row);
        syncTotal(row);
        syncExcess(row);
        syncCategTime(row);
    });
}

function syncBasic(row) {
    const basicTd = getBasicTd(row);

    const homeroomTd = getHomeroomTd(row);
    const homeroomOb = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
            if (m.addedNodes.length > 0) {
                basicTd.innerHTML = parseInt(basicTd.innerHTML) - DROPHOUR_DUE_TO_HOMEROOM;
            }
            if (m.removedNodes.length > 0) {
                basicTd.innerHTML = parseInt(basicTd.innerHTML) + DROPHOUR_DUE_TO_HOMEROOM;
            }
        });
    });
    homeroomOb.observe(homeroomTd, { childList: true, subtree: true });

    const nameTd = getNameTd(row);
    const nameOb = new MutationObserver((ms) => {
        if (ms.length === 1) {
            if (nameTd.style.backgroundColor !== "") {
                basicTd.innerHTML = parseInt(basicTd.innerHTML) - DROPHOUR_DUE_TO_CHIEF;
            } else {
                basicTd.innerHTML = parseInt(basicTd.innerHTML) + DROPHOUR_DUE_TO_CHIEF;
            }
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

function syncCategTime(row) {
    const klasseTds = getKlasseTds(row);
    const engineerTd = getEngineerTd(row);
    const businessTd = getBusinessTd(row);

    const engineerOb = new MutationObserver(() => {
        const engineerHour = klasseTds.reduce((p, c) => {
            return (getCateg(c) === "engineer") || (getCateg(c) === "physical")
                ? p + getHour(c)
                : p;
        }, 0);
        engineerTd.innerHTML = engineerHour;
    });
    const businessOb = new MutationObserver(() => {
        const businessHour = klasseTds.reduce((p, c) => {
            return getCateg(c) === "business" ? p + getHour(c) : p;
        }, 0);
        businessTd.innerHTML = businessHour;
    });

    klasseTds.forEach((td) => {
        engineerOb.observe(td, { childList: true, subtree: true });
        businessOb.observe(td, { childList: true, subtree: true });
    });
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

    totalOb.observe(homeroomTd, { childList: true, subtree: true });
    klasseTds.forEach((td) => {
        totalOb.observe(td, { childList: true, subtree: true });
    });
}

function syncExcess(row) {
    const basicTd = getBasicTd(row);
    const totalTd = getTotalTd(row);
    const excessTd = getExcessTd(row);

    const excessOb = new MutationObserver(() => {
        excessTd.innerHTML = parseInt(totalTd.innerHTML) - parseInt(basicTd.innerHTML);
    });

    excessOb.observe(basicTd, { childList: true, subtree: true });
    excessOb.observe(totalTd, { childList: true, subtree: true });
}
