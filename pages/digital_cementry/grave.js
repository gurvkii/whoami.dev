const addBtn = document.getElementById("addBtn");
const addform = document.getElementById("addform");
const closeBtn = document.getElementById("closeBtn");

const cemeteryContainer = document.getElementById("cemetery");
const graveform = document.getElementById("graveForm");

const dialog = document.getElementById("graveDialog");
const dialogName = document.getElementById("dialogName");
const dialogDate = document.getElementById("dialogDate");
const dialogEpitaph = document.getElementById("dialogEpitaph");
const closeDialog = document.getElementById("closeDialog");


addBtn.addEventListener("click", () => {
    addform.showModal();
});

closeBtn.addEventListener("click", () => {
    addform.close();
});


const cemetery = getGraves();

graveform.addEventListener("submit", function (event) {
    event.preventDefault();

    const graveName = document.getElementById("graveName").value;
    const graveDesc = document.getElementById("graveDescription").value;
    const graveDeathDate = document.getElementById("graveDeathDate").value;
    const graveEpitaph = document.getElementById("graveEpitaph").value;

    const grave = {
        uid: crypto.randomUUID(),
        graveName: graveName,
        graveDesc: graveDesc,
        graveDeathDate: graveDeathDate,
        graveEpitaph: graveEpitaph
    };

    cemetery.push(grave);
    saveGraves(cemetery);
    createGraveCard(grave);
    addform.close();
    graveform.reset();
});


function createGraveCard(grave) {
    const graveCard = document.createElement("div");
    graveCard.classList.add("grave-card");
    graveCard.id = grave.uid;
    const graveImg = document.createElement("img");
    graveImg.src = "../../assets/img/gruvkii_whoami_transparent.png";
    graveImg.alt = "Grave";


    graveCard.addEventListener("click", () => {
        const id = graveCard.id;
        const selectedGrave = cemetery.find(
            grave => grave.uid === id
        );
        if (!selectedGrave) {
            console.log("Grave not found");
            return;
        }
        dialogName.textContent = selectedGrave.graveName;
        dialogDate.textContent = selectedGrave.graveDeathDate;
        dialogEpitaph.textContent = selectedGrave.graveEpitaph;
        dialog.showModal();
    });


    graveCard.append(graveImg);

    cemeteryContainer.append(graveCard);
}

closeDialog.addEventListener("click", () => {
    dialog.close();
});

cemetery.forEach(grave => {
    createGraveCard(grave);
});

function saveGraves(cemetery) {
    localStorage.setItem(
        "cemetery",
        JSON.stringify(cemetery)
    );
}

function getGraves() {
    return JSON.parse(
        localStorage.getItem("cemetery")
    ) || [];
}

const clearBtn = document.getElementById("clearStorage");

clearBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});