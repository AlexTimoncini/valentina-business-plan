console.log("NEW EVENT")
init()
function init(){
    document.getElementById("example").addEventListener("click", async ()=>{
        await newEventExample().then(rs => {
            //top.location.href = "/"
        })
    })
}
async function newEventExample() {
    const owner = 'AlexTimoncini'
    const repo = 'valentina-business-plan'
    const branch = 'main'
    const filePath = 'db/eventi.json'

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

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
    try {
        const fileResponse = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
        })

        if (!fileResponse.ok) {
            throw new Error(`Errore nel recupero del file: ${fileResponse.status}`);
        }

        const fileData = await fileResponse.json();
        const fileSha = fileData.sha;
        const fileContent = atob(fileData.content);
        console.log("json", fileContent)
        let jsonData = JSON.parse(fileContent);
        console.log('JSON originale:', jsonData);

        jsonData.eventi.push({
            id: 3,
            publish_date: "12/10/2024",
            event_date: "12/31/2024",
            title: "Capodanno2"
        })
        console.log('JSON modificato:', jsonData);

        const updatedContent = btoa(JSON.stringify(jsonData, null, 2));
        const updateResponse = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Aggiornamento JSON via API',
                content: updatedContent,
                sha: fileSha,
                branch: branch,
            }),
        });
        if (!updateResponse.ok) {
            throw new Error(`Errore nell'aggiornamento del file: ${updateResponse.status}`);
        }
        console.log('File JSON aggiornato con successo su GitHub.');
    } catch (error) {
        console.error('Errore:', error);
    }
}
