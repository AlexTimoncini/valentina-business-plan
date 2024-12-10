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
    const owner = 'AlexTimoncini'
    const repo = 'valentina-business-plan'
    const branch = 'main'
    const filePath = 'db/eventi.json'
    let GITHUB_TOKEN = ''
    try {
        const response = await fetch("./.env")
        if (!response.ok) {
            throw new Error(`Errore nel recupero del file: ${response.status}`);
        }
        GITHUB_TOKEN = await response.text();
        GITHUB_TOKEN = atob(GITHUB_TOKEN.substring(0, GITHUB_TOKEN.length - 1))
    } catch {
        console.error("Errore in autenticazione: .env non trovato")
    }
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    console.log(GITHUB_TOKEN)
    try {
        const fileResponse = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer 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`,
                Accept: 'application/vnd.github.v3+json',
            },
        })
        if (!fileResponse.ok) {
            throw new Error(`Errore nel recupero del file: ${fileResponse.status}`);
        }
        const fileData = await fileResponse.json();
        const fileSha = fileData.sha;
        const fileContent = atob(fileData.content);
        let jsonData = JSON.parse(fileContent);
        console.log('eventi caricati:', jsonData.eventi);
        return jsonData.eventi
    } catch (error) {
        console.error('Errore:', error);
    }
}