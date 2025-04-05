function createToggle(title, contentArray) {
  const container = document.createElement('div');
  const toggle = document.createElement('div');
  toggle.className = 'toggle';
  toggle.textContent = title;

  const details = document.createElement('div');
  details.className = 'details';

  contentArray.forEach(text => {
    const item = document.createElement('div');
    item.className = 'phrase';
    item.textContent = text;
    details.appendChild(item);
  });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    details.classList.toggle('open');
  });

  container.appendChild(toggle);
  container.appendChild(details);
  return container;
}

function displayTopics(data) {
  const container = document.getElementById('topics-container');
  const topics = data.Topics;

  for (const topicName in topics) {
    const topic = topics[topicName];
    const topicDiv = document.createElement('div');
    topicDiv.className = 'topic';

    const topicHeader = document.createElement('h2');
    topicHeader.textContent = topicName;
    topicDiv.appendChild(topicHeader);

    const meaning = document.createElement('p');
    meaning.innerHTML = `<strong>Meaning:</strong> ${topic.Meaning}`;
    topicDiv.appendChild(meaning);

    if (topic.Synonyms) topicDiv.appendChild(createToggle('Synonyms', topic.Synonyms));
    if (topic.Antonyms) topicDiv.appendChild(createToggle('Antonyms', topic.Antonyms));
    if (topic.Phrases) topicDiv.appendChild(createToggle('Phrases', topic.Phrases));

    if (topic.Words) {
      const wordCategories = topic.Words;
      for (const category in wordCategories) {
        const readable = category.replace(/~/g, ' ');
        topicDiv.appendChild(createToggle(readable, wordCategories[category].synonyms));
      }
    }

    container.appendChild(topicDiv);
  }
}

// 🔄 Fetch the data.json file
fetch('data.json')
  .then(response => response.json())
  .then(jsonData => displayTopics(jsonData))
  .catch(err => {
    console.error('Error loading data.json:', err);
    document.getElementById('topics-container').textContent = 'Failed to load data.';
  });
