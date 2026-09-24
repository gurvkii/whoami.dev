const flipCard = document.getElementById("flip-card");

document.querySelectorAll(".flip-trigger").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        flipCard.classList.toggle("flipped");
    });
});


