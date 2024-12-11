init()
async function init() {
    if(!sessionStorage.getItem("userId")){
        top.location.href = "#/login"
    }
    let hash = window.location.hash,
        urlArr = hash.split("?")
    if(urlArr.length){
        let params = urlArr[1].split("&")
        if(params[0].startsWith("id=")){
            let id = params[0].split("=")[1]
            await getEvent(id).then((rs)=>{
                if(rs.image){
                    document.querySelector(".evento .evento-img").innerHTML = `<img src="${rs.image}">`
                }
                document.querySelector(".evento .evento-title").innerText = rs.title
                document.querySelector(".evento .evento-discr").innerText = rs.descr
                document.getElementById("indirizzo").innerText = rs.indirizzo
                document.getElementById("ev-date").innerText = rs.event_date
                document.getElementById("start").innerText = rs.start
                document.getElementById("end").innerText = rs.end
                document.getElementById("p-date").innerText = new Date(rs.publish_date).toLocaleDateString()
                document.getElementById("p-time").innerText = new Date(rs.publish_date).toLocaleTimeString()

            });
        } else {
            top.location = "#/"
        }
    } else {
        top.location = "#/"
    }
}
/*GET EVENT*/
async function getEvent(id) {
    let url = 'https://taggx.it/eventi/'+id
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