console.log("HOMEPAGE")
init()
async function init() {
    let events;
    await getEvents().then(rs=>{
        events = rs
    })
    console.log(events)
    events.forEach(ev=>{
        console.log(ev)
        document.getElementById("eventi").insertAdjacentHTML("beforeend", `
            <li>${ev.title} - ${new Date(ev.event_date).toLocaleDateString()}</li>
        `)
    })
}
/*GET EVENTI*/
async function getEvents() {
    try {
        const response = await fetch("https://taggx.it/eventi", {
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