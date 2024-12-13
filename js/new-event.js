console.log("NEW EVENT")
init()
function init() {
    /*LOGIN MANAGEMENT*/
    if(sessionStorage.getItem("userId") === null){
        sessionStorage.clear()
        top.location.href = "#/login"
    }
    /*END LOGIN*/
    if (!sessionStorage.getItem("userName")) {
        document.getElementById("nuovo_evento").innerHTML = `
            <p>Effettua il <a class="main-link" onclick="sessionStorage.clear();top.location.href = '/'">login</a> per poter creare i tuoi eventi!</p>`
    } else {
        /*VALIDAZIONI*/
        document.getElementById("new").addEventListener("submit", (event) => {
            sendData(event)
        })
        document.getElementById("title").addEventListener("input", () => {
            let title = document.getElementById("title").value
            if (!title || title.length < 3 || title.length > 255) {
                document.querySelector("#title ~ .error").classList.add("active")
            } else {
                if (document.querySelector("#title ~ .error").classList.contains("active")) {
                    document.querySelector("#title ~ .error").classList.remove("active")
                }
            }
        })
        document.getElementById("descr").addEventListener("input", () => {
            let descr = document.getElementById("descr").value
            if (!descr || descr.length < 10 || descr.length > 1024) {
                document.querySelector("#descr ~ .error").classList.add("active")
            } else {
                if (document.querySelector("#descr ~ .error").classList.contains("active")) {
                    document.querySelector("#descr ~ .error").classList.remove("active")
                }
            }
        })
        document.getElementById("indirizzo").addEventListener("input", () => {
            let indirizzo = document.getElementById("indirizzo").value
            if (!indirizzo || indirizzo.length < 5 || indirizzo.length > 255) {
                document.querySelector("#indirizzo ~ .error").classList.add("active")
            } else {
                if (document.querySelector("#indirizzo ~ .error").classList.contains("active")) {
                    document.querySelector("#indirizzo ~ .error").classList.remove("active")
                }
            }
        })
        document.getElementById("ticket_price").addEventListener("input", () => {
            let ticket_price = parseFloat(document.getElementById("ticket_price").value)
            if (isNaN(ticket_price) || ticket_price < 0 || ticket_price > 99.99) {
                document.querySelector("#ticket_price ~ .error").classList.add("active")
            } else {
                if (document.querySelector("#ticket_price ~ .error").classList.contains("active")) {
                    document.querySelector("#ticket_price ~ .error").classList.remove("active")
                }
            }
        })
        document.getElementById("crowd_counter").addEventListener("input", () => {
            let crowd_counter = parseInt(document.getElementById("crowd_counter").value)
            if (isNaN(crowd_counter) || crowd_counter < 1 || crowd_counter > 999999) {
                document.querySelector("#crowd_counter ~ .error").classList.add("active")
            } else {
                if (document.querySelector("#crowd_counter ~ .error").classList.contains("active")) {
                    document.querySelector("#crowd_counter ~ .error").classList.remove("active")
                }
            }
        })
        document.getElementById("event_date").addEventListener("blur", () => {
            console.log("evento")
            let event_date = document.getElementById("event_date").value
            if (!event_date || new Date(event_date) < new Date()) {
                document.querySelector("#event_date ~ .error").classList.add("active")
            } else {
                if (document.querySelector("#event_date ~ .error").classList.contains("active")) {
                    document.querySelector("#event_date ~ .error").classList.remove("active")
                }
            }
        })
        document.getElementById("start_time").addEventListener("blur", () => {
            let start_time = document.getElementById("start_time").value
            if (!start_time) {
                document.querySelector("#start_time ~ .error").classList.add("active")
            } else {
                if (document.querySelector("#start_time ~ .error").classList.contains("active")) {
                    document.querySelector("#start_time ~ .error").classList.remove("active")
                }
            }
        })
        document.getElementById("end_time").addEventListener("blur", () => {
            let end_time = document.getElementById("end_time").value
            if (!end_time) {
                document.querySelector("#end_time ~ .error").classList.add("active")
            } else {
                if (document.querySelector("#end_time ~ .error").classList.contains("active")) {
                    document.querySelector("#end_time ~ .error").classList.remove("active")
                }
            }
        })
    }
}
function sendData(event){
    event.preventDefault()
    let data = {
        title: document.getElementById("title").value.trim(),
        descr: document.getElementById("descr").value.trim(),
        indirizzo: document.getElementById("indirizzo").value.trim(),
        ticket_price: !isNaN(parseFloat(document.getElementById("ticket_price").value)) ? parseFloat(document.getElementById("ticket_price").value) : false,
        crowd_counter: !isNaN(parseInt(document.getElementById("crowd_counter").value)) ? parseInt(document.getElementById("crowd_counter").value) : false,
        event_date: new Date(document.getElementById("event_date").value),
        start_time: document.getElementById("start_time").value,
        end_time: document.getElementById("end_time").value
    }
    if(document.querySelectorAll(".error.active").length || !data.title || !data.descr){
        Object.keys(data).forEach(name=>{
            if((!data[name] && data[name] !== 0) || ('event_date'.includes(name) && !new Date(data[name]).getTime())){
                console.log(data[name])
                if(!document.querySelector("#"+name+" ~ .error").classList.contains("active")){
                    document.querySelector("#"+name+" ~ .error").classList.add("active")
                }
            }
        })
        return false
    } else {
        data.event_date = data.event_date.toLocaleDateString()
        data.image = document.getElementById("image").value
        data.userId = sessionStorage.getItem("userId")
    }
    try {
        const response = fetch("https://taggx.it/eventi", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response=>response.json())
            .then((data)=>{
                if(data){
                    if(parseInt(data.result) === 0){
                        alert(data.msg)
                    } else {
                        top.location.href = "#/evento?id="+data.data.id
                    }
                }
            })
    } catch (error) {
        console.error('Errore:', error);
    }
    return false
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