if (localStorage.getItem("cemetery_auth") !== "true") {
    window.location.href = "../login_signup/auth.html";
}

const addBtn = document.getElementById("addBtn");
const addform = document.getElementById("addform");
const closeBtn = document.getElementById("closeBtn");
const logoutBtn = document.getElementById("logoutBtn");

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

closeDialog.addEventListener("click", () => {
    dialog.close();
});

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("cemetery_auth");
        window.location.href = "../login_signup/auth.html";
    });
}

graveform.addEventListener("submit", function (event) {
    event.preventDefault();

    const graveName = document.getElementById("graveName").value;
    const graveDesc = document.getElementById("graveDescription").value;
    const graveDeathDate = document.getElementById("graveDeathDate").value;
    const graveEpitaph = document.getElementById("graveEpitaph").value;
    const graveIMG = document.getElementById("graveIMG").value;

    const canvasW = cemeteryContainer.clientWidth || window.innerWidth;
    const canvasH = cemeteryContainer.clientHeight || window.innerHeight;
    const spawnX = Math.floor(Math.random() * (canvasW - 200) + 40);
    const spawnY = Math.floor(Math.random() * (canvasH - 260) + 40);

    const grave = {
        uid: crypto.randomUUID(),
        graveName: graveName,
        graveDesc: graveDesc,
        graveDeathDate: graveDeathDate,
        graveEpitaph: graveEpitaph,
        graveIMG: graveIMG,
        x: Math.max(20, spawnX),
        y: Math.max(20, spawnY)
    };

    cemetery.push(grave);
    saveGraves(cemetery);
    createGraveCard(grave, cemetery.length - 1);

    addform.close();
    graveform.reset();
});

function createGraveCard(grave, index) {
    const graveCard = document.createElement("div");
    graveCard.classList.add("grave-card");
    graveCard.id = grave.uid;

    const graveImg = document.createElement("img");
    graveImg.src = "../../assets/img/grave.png";
    graveImg.alt = "Grave";

    const graveTitle = document.createElement("p");
    graveTitle.textContent = grave.graveName;

    graveCard.append(graveImg, graveTitle);

    const canvasW = cemeteryContainer.clientWidth || window.innerWidth;
    const canvasH = cemeteryContainer.clientHeight || (window.innerHeight - 80);

    if (grave.x === undefined || grave.y === undefined) {
        const idx = index !== undefined ? index : cemetery.length - 1;
        grave.x = Math.max(20, Math.min((idx * 120 + 40) % (canvasW - 130), canvasW - 130));
        grave.y = Math.max(20, Math.min((Math.floor((idx * 120 + 40) / (canvasW - 130)) * 130 + 40) % (canvasH - 180), canvasH - 180));
        saveGraves(cemetery);
    }

    graveCard.style.left = grave.x + "px";
    graveCard.style.top = grave.y + "px";

    graveCard.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 && event.pointerType === "mouse") {
            return;
        }

        const startX = event.clientX;
        const startY = event.clientY;
        const initialX = graveCard.offsetLeft;
        const initialY = graveCard.offsetTop;
        let moved = false;

        function onPointerMove(e) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                moved = true;
            }

            const currentCanvasW = cemeteryContainer.clientWidth || window.innerWidth;
            const currentCanvasH = cemeteryContainer.clientHeight || window.innerHeight;
            const maxX = Math.max(0, currentCanvasW - graveCard.offsetWidth);
            const maxY = Math.max(0, currentCanvasH - graveCard.offsetHeight - 80);

            graveCard.style.left = Math.max(0, Math.min(initialX + dx, maxX)) + "px";
            graveCard.style.top = Math.max(0, Math.min(initialY + dy, maxY)) + "px";
        }

        function onPointerUp() {
            document.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerup", onPointerUp);

            if (moved) {
                grave.x = graveCard.offsetLeft;
                grave.y = graveCard.offsetTop;
                saveGraves(cemetery);
            } else {
                dialogName.textContent = grave.graveName;
                dialogDate.textContent = grave.graveDeathDate;
                dialogDesc.textContent = grave.graveDesc;
                dialogEpitaph.textContent = grave.graveEpitaph;

                if (grave.graveIMG) {
                    dialogIMG.src = grave.graveIMG;
                    dialogIMG.style.display = "block";
                } else {
                    dialogIMG.style.display = "none";
                }

                dialog.showModal();
            }
        }

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
    });

    cemeteryContainer.append(graveCard);
}

cemetery.forEach((grave, index) => {
    createGraveCard(grave, index);
});

clearBtn.addEventListener("click", () => {
    localStorage.removeItem("cemetery");
    cemetery.length = 0;
    cemeteryContainer.innerHTML = "";
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


const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.textContent = "⏸";
    } else {
        bgMusic.pause();
        musicBtn.textContent = "▶";
    }
});

const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "Pastel" : "Dark";
    }
}

const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "pastel" : "dark";
        applyTheme(nextTheme);
    });
}

