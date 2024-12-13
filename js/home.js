init()
async function init() {
    /*LOGIN MANAGEMENT*/
    if(sessionStorage.getItem("userId") === null){
        sessionStorage.clear()
        top.location.href = "#/login"
    }
    /*END LOGIN*/
    let events;
    await getEvents('new').then(rs=>{
        events = rs
    })
    if(events && events.length){
        document.getElementById("new_events").innerHTML = ''
        events.forEach(ev => {
            let html = `
            <li class="event" onclick="top.location.href = '#/evento?id=${ev.id}'">
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
                        <span>${!isNaN(parseInt(ev.going)) ? ev.going : 0} / ${ev.crowd_counter}</span>
                    </div>
                    <p class="entry-price">${ev.ticket_price > 0 ? ev.ticket_price+"€" : 'Gratis'}</p>
                </div>
            </li>`
            document.getElementById("new_events").insertAdjacentHTML("beforeend", html)
        })
    }
    await getEvents('old').then(rs=>{
        events = rs
    })
    if(events && events.length) {
        document.getElementById("old_events").innerHTML = ''
        events.forEach(ev => {
            let html = `
            <li class="event" onclick="top.location.href = '#/evento?id=${ev.id}'">
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
                        <span>${!isNaN(parseInt(ev.going)) ? ev.going : 0} / ${ev.crowd_counter}</span>
                    </div>
                    <p class="entry-price">${ev.ticket_price > 0 ? ev.ticket_price+"€" : 'Gratis'}</p>
                </div>
            </li>`
            document.getElementById("old_events").insertAdjacentHTML("beforeend", html)
        })
    }
    if(sessionStorage.getItem("userName")){
        await getEvents('mine').then(rs=>{
            events = rs
        })
        if(events && events.length){
            document.getElementById("your_events").innerHTML = ''
            events.forEach(ev => {
                let html = `
            <li class="event" onclick="top.location.href = '#/evento?id=${ev.id}'">
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
                        <span>${!isNaN(parseInt(ev.going)) ? ev.going : 0} / ${ev.crowd_counter}</span>
                    </div>
                    <p class="entry-price">${ev.ticket_price > 0 ? ev.ticket_price+"€" : 'Gratis'}</p>
                </div>
            </li>`
                document.getElementById("your_events").insertAdjacentHTML("beforeend", html)
            })
        }
    } else{
        let html = `
        <li class="event">
            <div class="event-img">
            </div>
            <div class="event-body">
                <h3 class="event-title">Effettua il Login per salvare le date!</h3>
                <p class="event-data"></p>
            </div>
            <div class="event-footer">
                <div class="crowd-counter">
                </div>
                <p class="entry-price">&nbsp;</p>
            </div>
        </li>`
        document.getElementById("your_events").innerHTML = ''
        document.getElementById("your_events").insertAdjacentHTML("beforeend", html)
    }
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
async function getEvents(type) {
    let url = 'https://taggx.it/'
    if(type === 'new'){
        url += 'eventi-new'
    } else if(type === 'old') {
        url += 'eventi-old'
    } else if(type === 'mine') {
        url += '/utenti/'+sessionStorage.getItem('userId')+'/eventi'
    }
    try {
        const response = await fetch(url, {
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