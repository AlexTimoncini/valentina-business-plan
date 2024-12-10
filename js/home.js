init()
async function init() {
    let events;
    await getEvents().then(rs=>{
        events = rs
    })
    console.log(events)
    events.forEach(ev => {
        let html = `
        <li class="event">
            <div class="event-img">
                <img src="${ev.image}" alt="" draggable="false">
            </div>
            <div class="event-body">
                <h3 class="event-title">${ev.title}</h3>
                <p class="event-data">${new Date(ev.event_date).toLocaleDateString()} - ${ev.start.substring(0, 5)} / ${ev.end.substring(0, 5)}</p>
            </div>
            <div class="event-footer">
                <div class="crowd-counter">
                    <img src="/assets/images/team.svg" alt="crowd icon">
                    <span>${ev.crowd_counter}</span>
                </div>
                <p class="entry-price">${ev.ticket_price > 0 ? ev.ticket_price : 'Gratis'}</p>
            </div>
        </li>
        `
        document.getElementById("new_events").insertAdjacentHTML("beforeend", html)
        document.getElementById("old_events").insertAdjacentHTML("beforeend", html)
        document.getElementById("your_events").insertAdjacentHTML("beforeend", html)
    })
    //posizione
    if(!localStorage.getItem("posizione")){
        localStorage.setItem("posizione", "Italia")
    }
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    const city = data.address.city || data.address.town || data.address.village
                    if(city){
                        localStorage.setItem("posizione", "Italia - "+city)
                    }
                } catch (error) {
                    console.error("Errore nel recupero del nome della città:", error)
                }
            },
            (error) => {
                console.error("Errore durante l'ottenimento della posizione:", error)
            }
        )
    } else {
        console.error("La Geolocalizzazione non è supportata dal browser.")
    }
    
    let posizione = localStorage.getItem("posizione")
    document.getElementById("posizione").innerText = posizione
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