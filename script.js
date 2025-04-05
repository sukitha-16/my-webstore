// Load data.json and make it globally available
fetch("data.json")
    .then(response => response.json())
    .then(data => window.data = data)
    .catch(error => console.error("Error loading data:", error));

function showContent(section) {
    let content = document.getElementById("content");
    if (!window.data || !content) return;

    const sections = section.split("_"); // e.g., "abstract_meaning" → ["abstract", "meaning"]
    const topic = capitalize(sections[0]); // Abstract or Introduction
    const type = sections[1]; // meaning, synonyms, etc.

    const topicData = window.data.topics?.[topic];

    if (!topicData) {
        content.innerHTML = `<div class="alert alert-warning">No data found for topic: ${topic}</div>`;
        return;
    }

    switch (type) {
        case "meaning":
            content.innerHTML = `
                <h2>${topic} - Meaning</h2>
                <p>${topicData.meaning}</p>
            `;
            break;
        case "synonyms":
            content.innerHTML = `
                <h2>${topic} - Synonyms</h2>
                <ul class="list-group">
                    ${topicData.synonyms.map(s => `<li class="list-group-item">${s}</li>`).join("")}
                </ul>
            `;
            break;
        case "antonyms":
            content.innerHTML = `
                <h2>${topic} - Antonyms</h2>
                <ul class="list-group">
                    ${topicData.antonyms.map(a => `<li class="list-group-item">${a}</li>`).join("")}
                </ul>
            `;
            break;
        case "phrases":
            content.innerHTML = `
                <h2>${topic} - Phrases</h2>
                <div class="alert alert-info">${topicData.phrases.join(", ")}</div>
            `;
            break;
        case "words":
        case "words_inside":
            showTopicWords(topic);
            break;
        default:
            content.innerHTML = `<div class="alert alert-danger">Unknown section: ${section}</div>`;
    }
}

function showTopicWords(topic) {
    const words = Object.keys(window.data.topics[topic].words);
    const content = document.getElementById("content");

    content.innerHTML = `
        <h2>${topic} - Word Selection</h2>
        <label for="wordDropdown" class="form-label">Select a Word:</label>
        <select id="wordDropdown" class="form-select" onchange="displayWordInfo(this.value, '${topic}')">
            <option value="">-- Select a word --</option>
            ${words.map(word => `<option value="${word}">${word}</option>`).join("")}
        </select>
        <div id="wordInfo" class="mt-3"></div>
    `;
}

function displayWordInfo(word, topic) {
    if (!word) return;
    let wordData = window.data.topics[topic].words[word];

    document.getElementById("wordInfo").innerHTML = `
        <h4>${word}</h4>
        <p><strong>Synonyms:</strong> ${wordData.synonyms.join(", ")}</p>
        <p><strong>Antonyms:</strong> ${wordData.antonyms.join(", ")}</p>
        <p><strong>Description:</strong> ${wordData.description}</p>
    `;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
