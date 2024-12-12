init()
function init() {
    document.getElementById("guest_login").addEventListener("click", ()=>{guestLogin()})
    document.getElementById("footer").remove()
    if(sessionStorage.getItem("userId") !== undefined){
        sessionStorage.clear()
    }
    document.getElementById("login").addEventListener("submit", (event)=>{sendData(event)})
    document.getElementById("un").addEventListener("input", ()=>{
        let un = document.getElementById("un").value
        if(!un || un.length < 2 || un.length > 20){
            document.querySelector("#un ~ .error").classList.add("active")
        } else {
            if(document.querySelector("#un ~ .error").classList.contains("active")){
                document.querySelector("#un ~ .error").classList.remove("active")
            }
        }
    })
    document.getElementById("pw").addEventListener("input", ()=>{
        let pw = document.getElementById("pw").value
        if(!pw || pw.length < 6 || pw.length > 20){
            document.querySelector("#pw ~ .error").classList.add("active")
        } else {
            if(document.querySelector("#pw ~ .error").classList.contains("active")){
                document.querySelector("#pw ~ .error").classList.remove("active")
            }
        }
    })
}
function guestLogin() {
    sessionStorage.setItem("userId", "0")
    top.location.href = "#/"
}
function sendData(event){
    event.preventDefault()
    let data = {
        un: document.getElementById("un").value.trim(),
        pw: document.getElementById("pw").value.trim()
    }
    if(document.querySelectorAll(".error.active").length || !data.un || !data.pw){
        Object.keys(data).forEach(name=>{
            if(!data[name]){
                if(!document.querySelector("#"+name+" ~ .error").classList.contains("active")){
                    document.querySelector("#"+name+" ~ .error").classList.add("active")
                }
            }
        })
        return false
    }
    try {
        const response = fetch("https://taggx.it/auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response=>response.json())
        .then((data)=>{
            console.log(data, "dasda")
            if(data){
                if(parseInt(data.result) === 0){
                    alert(data.msg)
                } else {
                    sessionStorage.setItem("userId", data.data.id)
                    sessionStorage.setItem("userName", data.data.username)
                    top.location.href = "/"
                }
            }
        })
    } catch (error) {
        console.error('Errore:', error);
    }
    return false
}
