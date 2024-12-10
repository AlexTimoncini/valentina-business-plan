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
        console.log("json", fileContent)
        let jsonData = JSON.parse(fileContent);
        console.log('JSON originale:', jsonData);

        jsonData.eventi.push({
            id: 2,
            publish_date: "12/10/2024",
            event_date: "12/31/2024",
            title: "Capodanno"
        })
        console.log('JSON modificato:', jsonData);

        const updatedContent = btoa(JSON.stringify(jsonData, null, 2));
        const updateResponse = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${githubToken}`,
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
