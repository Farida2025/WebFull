document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    const logo = document.querySelector(".logo");

    const initialLogoSrc = logo ? logo.src : "images/logo.jpg"; 

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "day") {
        body.classList.add("day-mode");
        toggleBtn.textContent = "🌞";
        if (logo) logo.src = logo.dataset.light;
    } else {
        body.classList.add("night-mode"); 
        toggleBtn.textContent = "🌙";
        if (logo) logo.src = initialLogoSrc;
    }

    toggleBtn.addEventListener("click", () => {
        if (body.classList.contains("night-mode")) {
            body.classList.remove("night-mode");
            body.classList.add("day-mode");
            localStorage.setItem("theme", "day");
            toggleBtn.textContent = "🌞";
            if (logo) logo.src = logo.dataset.light;
        } else {
            body.classList.remove("day-mode");
            body.classList.add("night-mode");
            localStorage.setItem("theme", "night");
            toggleBtn.textContent = "🌙";
            if (logo) logo.src = initialLogoSrc;
        }
    });
});