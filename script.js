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
                        <strong>${topic}</strong>: ${typeof window.data.topics[topic] === "string" 
                        ? window.data.topics[topic] 
                        : `<button class="btn btn-primary btn-sm" onclick="showAbstractWords()">View Words</button>`}
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

function showAbstractWords() {
    let words = Object.keys(window.data.topics.Abstract.words);
    let content = document.getElementById("content");
    
    content.innerHTML = `
        <h2>Abstract - Word Selection</h2>
        <label for="wordDropdown" class="form-label">Select a Word:</label>
        <select id="wordDropdown" class="form-select" onchange="displayWordInfo(this.value)">
            <option value="">-- Select a word --</option>
            ${words.map(word => `<option value="${word}">${word}</option>`).join("")}
        </select>
        <div id="wordInfo" class="mt-3"></div>
    `;
}

function displayWordInfo(word) {
    if (!word) return;
    let wordData = window.data.topics.Abstract.words[word];

    document.getElementById("wordInfo").innerHTML = `
        <h4>${word}</h4>
        <p><strong>Synonyms:</strong> ${wordData.synonyms.join(", ")}</p>
        <p><strong>Antonyms:</strong> ${wordData.antonyms.join(", ")}</p>
        <p><strong>Description:</strong> ${wordData.description}</p>
    `;
}
