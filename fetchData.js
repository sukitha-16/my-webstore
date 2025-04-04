fetch("data.json")
    .then(response => response.json())
    .then(data => {
        document.getElementById("data-output").textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error("Error loading data:", error));
