async function saveData() {
    const newData = {
        name: document.getElementById("name").value,
        age: parseInt(document.getElementById("age").value),
        city: document.getElementById("city").value
    };

    const response = await fetch('https://api.github.com/repos/sukitha-16/my-webstore/data.json', {
        method: "PUT",
        headers: {
            "Authorization": "token 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", // Use GitHub Actions Secrets
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Updating data.json",
            content: btoa(JSON.stringify(newData, null, 2)), // Encode JSON as Base64
            sha: await getFileSHA() // Required for updating the file
        })
    });

    if (response.ok) {
        alert("Data saved successfully!");
    } else {
        alert("Failed to save data: " + (await response.text()));
    }
}

async function getFileSHA() {
    const response = await fetch('https://api.github.com/repos/sukitha-16/my-webstore/data.json');
    const data = await response.json();
    return data.sha; // Needed for updating the file
}
