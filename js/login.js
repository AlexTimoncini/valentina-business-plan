console.log("HOMEPAGE")
init()
function init() {
    document.getElementById("guest_login").addEventListener("click", ()=>{guestLogin()})
    setInterval(updateTextColor, 16); // ~60 FPS
}
function guestLogin() {
    sessionStorage.setItem("userId", "0")
    top.location.href = "#/"
}

function updateTextColor() {
    const rotatingText = document.querySelector('.rotating-text');
    const wave = document.querySelector('.wave');
    const waveRect = wave.getBoundingClientRect();
    const textRect = rotatingText.getBoundingClientRect();
    const isOverlapping = !(waveRect.bottom < textRect.top ||
        waveRect.top > textRect.bottom ||
        waveRect.right < textRect.left ||
        waveRect.left > textRect.right);
    rotatingText.style.color = isOverlapping ? "white" : "#216C21";
}

