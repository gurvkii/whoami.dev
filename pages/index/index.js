    const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("cemetery_auth");
                window.location.href = "pages/login_signup/auth.html";
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