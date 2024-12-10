console.log("HOMEPAGE")
init()
function init() {
    document.getElementById("guest_login").addEventListener("click", ()=>{guestLogin()})
}
function guestLogin() {
    sessionStorage.setItem("userId", "0")
    top.location.href = "#/"
}