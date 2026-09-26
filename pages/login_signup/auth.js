if (localStorage.getItem("cemetery_auth") === "true") {
    window.location.href = "../../index.html";
}

const flipCard = document.getElementById("flip-card");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const loginPasswordInput = document.getElementById("login-password");
const signupPasswordInput = document.getElementById("signup-password");
const signupConfirmInput = document.getElementById("signup-confirm-password");

const SECRET_KEY = "whoami.dev";

document.querySelectorAll(".flip-trigger").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        flipCard.classList.toggle("flipped");
    });
});

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (loginPasswordInput.value === SECRET_KEY) {
            localStorage.setItem("cemetery_auth", "true");
            window.location.href = "../../index.html";
        } else {
            alert("Incorrect password. Hint: " + SECRET_KEY);
        }
    });
}

if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
        // event.preventDefault();
        // if (signupPasswordInput.value !== signupConfirmInput.value) {
        //     alert("Passwords do not match");
        //     return;
        // }
        // localStorage.setItem("cemetery_auth", "true");
        // window.location.href = "../../index.html";
        alert("Signup is still on development! , Please use the provided credientials!");
        
    });
}
