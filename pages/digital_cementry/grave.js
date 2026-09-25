const addBtn = document.getElementById("addBtn");
const addform = document.getElementById("addform");
const closeBtn = document.getElementById("closeBtn");

const cemeteryContainer = document.getElementById("cemetery");
const graveform = document.getElementById("graveForm");
const clearBtn = document.getElementById("clearStorage");

const dialog = document.getElementById("graveDialog");
const dialogName = document.getElementById("dialogName");
const dialogDate = document.getElementById("dialogDate");
const dialogDesc = document.getElementById("dialogDesc");
const dialogEpitaph = document.getElementById("dialogEpitaph");
const dialogIMG = document.getElementById("dialogIMG");
const closeDialog = document.getElementById("closeDialog");

const cemetery = getGraves();

addBtn.addEventListener("click", () => {
    addform.showModal();
});

closeBtn.addEventListener("click", () => {
    addform.close();
});

graveform.addEventListener("submit", function (event) {
    event.preventDefault();

    const graveName = document.getElementById("graveName").value;
    const graveDesc = document.getElementById("graveDescription").value;
    const graveDeathDate = document.getElementById("graveDeathDate").value;
    const graveEpitaph = document.getElementById("graveEpitaph").value;
    const graveIMG = document.getElementById("graveIMG").value;

    const grave = {
        uid: crypto.randomUUID(),
        graveName: graveName,
        graveDesc: graveDesc,
        graveDeathDate: graveDeathDate,
        graveEpitaph: graveEpitaph,
        graveIMG: graveIMG
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
        dialogDesc.textContent = selectedGrave.graveDesc;
        dialogEpitaph.textContent = selectedGrave.graveEpitaph;

        if (selectedGrave.graveIMG) {
            dialogIMG.src = selectedGrave.graveIMG;
            dialogIMG.style.display = "block";
        } else {
            dialogIMG.style.display = "none";
        }

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

clearBtn.addEventListener("click", () => {
    localStorage.removeItem("cemetery");
    location.reload();
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