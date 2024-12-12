console.log("HOMEPAGE")
init()
async function init() {
    /*LOGIN MANAGEMENT*/
    if(sessionStorage.getItem("userId") === null){
        sessionStorage.clear()
        top.location.href = "#/login"
    }
    /*END LOGIN*/
    if (!sessionStorage.getItem("userName")) {
        document.getElementById("my_events").innerHTML = `
            <p>Effettua il <a class="main-link" onclick="sessionStorage.clear();top.location.href = '/'">login</a> per visualizzare i tuoi eventi!</p>`
    }
}
async function getEvents() {
    try {
        const response = await fetch("https://taggx.it/utenti/"+sessionStorage.getItem("userId")+"/eventi", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            return await response.json();

        } else {
            console.error('Errore nella richiesta', response.statusText);
        }

    } catch (error) {
        console.error('Errore:', error);
    }
}