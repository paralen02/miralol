document.addEventListener("DOMContentLoaded", function() {
    fetch("test.php")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            if (result.error) {
                console.log("Error: " + result.error);
            } else {
                let output = JSON.stringify(result, null, 2); // Convert JSON to formatted string
                document.getElementById("result").textContent = output; // Use textContent to display the JSON string
            }
        })
        .catch(error => console.log(error));
});
