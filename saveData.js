const GITHUB_USERNAME = "sukitha-16";
const GITHUB_REPO = "my-webstore";
const FILE_PATH = "data.json";
const GITHUB_PAT = "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";  // ⚠️ Use GitHub Secrets for security

document.getElementById("dataForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Get form data
    const newData = {
        name: document.getElementById("name").value,
        age: parseInt(document.getElementById("age").value),
        city: document.getElementById("city").value
    };

    // Get existing JSON file
    const fileResponse = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${FILE_PATH}`, {
        headers: { "Authorization": `token ${GITHUB_PAT}` }
    });

    if (!fileResponse.ok) {
        alert("Failed to fetch existing data: " + (await fileResponse.text()));
        return;
    }

    const fileData = await fileResponse.json();
    const existingContent = JSON.parse(atob(fileData.content)); // Decode base64 content

    // Append new data
    existingContent.push(newData);

    // Update JSON file on GitHub
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${FILE_PATH}`, {
        method: "PUT",
        headers: {
            "Authorization": `token ${GITHUB_PAT}`,
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Updating data.json",
            content: btoa(JSON.stringify(existingContent, null, 2)), // Encode JSON as Base64
            sha: fileData.sha // Required for updating the file
        })
    });

    if (response.ok) {
        alert("Data saved successfully!");
    } else {
        alert("Failed to save data: " + (await response.text()));
    }
});


