console.log("HOMEPAGE")
init()
async function init() {
    if (!sessionStorage.getItem("userId")) {
        document.getElementById("my_events").innerHTML = `
            <p>Effettua il <a class="main-link" href="/?logout">login</a> per visualizzare i tuoi eventi!</p>
        `
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