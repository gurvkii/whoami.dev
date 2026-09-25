const addBtn = document.getElementById("addBtn");
const addform = document.getElementById("addform");
const closeBtn = document.getElementById("closeBtn");


addBtn.addEventListener("click", () => {
    addform.showModal();
})

closeBtn.addEventListener("click", () => {
    addform.close();
})



const graveEpitaph = document.querySelector("#graveEpitaph");
const cemetery = [];

const graveform = document.querySelector("#graveForm");
graveform.addEventListener("submit", function (event) {
    event.preventDefault();
    const graveName = document.querySelector("#graveName").value;
    const graveDesc = document.querySelector("#graveDescription").value;
    const graveDeathDate = document.querySelector("#graveDeathDate").value;

    const grave  = {
        uid : crypto.randomUUID(),
        graveName : graveName,
        graveDesc:graveDesc,
        graveDeathDate:graveDeathDate,
    };
     grave.push(cemetery);
});









