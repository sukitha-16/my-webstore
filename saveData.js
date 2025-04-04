document.getElementById("data-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let city = document.getElementById("city").value;

    let newData = {
        name: name,
        age: parseInt(age),
        city: city
    };

    // Send data to GitHub Actions workflow (creates a commit)
    await fetch('https://api.github.com/repos/sukitha-16/my-webstore/dispatches', {
        method: 'POST',
        headers: {
            'Accept': 'application/vnd.github.everest-preview+json',
            'Authorization': 'token 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',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event_type: "update_data",
            client_payload: newData
        })
    });

    alert("Data submitted! Changes will reflect soon.");
});
