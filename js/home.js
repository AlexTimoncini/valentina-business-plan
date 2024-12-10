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
        const response = await fetch('./db/eventi.json');
        if (!response.ok) {
            throw new Error('Failed to load eventi table');
        }
        const manifest = await response.json()
        return manifest.eventi
    } catch (error) {
        return false
    }
}
