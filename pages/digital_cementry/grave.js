const addBtn = document.getElementById("addBtn");
const addform= document.getElementById("addform");
const closeBtn = document.getElementById("closeBtn");


addBtn.addEventListener("click", () =>{
    addform.showModal();
})

closeBtn.addEventListener("click", () =>
{
    addform.close();
})

