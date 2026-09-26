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
        alert("Signup is still on development! , Please use the provided credientials!");
    });
}

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

