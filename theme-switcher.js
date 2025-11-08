let audioCtx;
function ensureAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playSoftGentleBeep(freq = 500, duration = 0.3) {
    ensureAudioCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle'; 
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

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
        playSoftGentleBeep(500, 0.3);

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
