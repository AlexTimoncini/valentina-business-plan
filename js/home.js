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
    const githubToken = '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'

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    try {
        // Step 1: Recupera il file JSON e il suo SHA
        const fileResponse = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${githubToken}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

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