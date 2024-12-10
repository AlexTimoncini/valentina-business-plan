console.log("NEW EVENT")
init()
function init(){
}
async function newEventExample() {
    let data = {
        id: 3,
        publish_date: "12/10/2024",
        event_date: "12/31/2024",
        title: "Capodanno2"
    }
    try {
        const response = await fetch("https://taggx.it/eventi", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            const responseData = await response.json();
            console.log('Evento aggiunto:', responseData);
        } else {
            console.error('Errore nella richiesta', response.statusText);
        }

    } catch (error) {
        console.error('Errore:', error);
    }
}