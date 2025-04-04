fetch("data.json")
    .then(response => response.json())
    .then(data => window.data = data)
    .catch(error => console.error("Error loading data:", error));

function showContent(section) {
    let content = document.getElementById("content");
    if (section === "topics") {
        content.innerHTML = `
            <h2>Topics</h2>
            <ul class="list-group">
                ${Object.keys(window.data.topics).map(topic => `
                    <li class="list-group-item">
                        <strong>${topic}</strong>: ${window.data.topics[topic]}
                    </li>
                `).join("")}
            </ul>
        `;
    } else if (section === "phrase-bank") {
        content.innerHTML = `
            <h2>Phrase Bank</h2>
            <div class="alert alert-primary">
                ${window.data.phrases.join(", ")}
            </div>
        `;
    } else if (section === "images") {
        content.innerHTML = `
            <h2>Images</h2>
            <div class="row">
                ${window.data.images.map(img => `
                    <div class="col-md-4">
                        <img src="${img}" class="img-fluid rounded shadow-sm" alt="Image">
                    </div>
                `).join("")}
            </div>
        `;
    }
}
