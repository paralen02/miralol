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
                let table = document.createElement("table");
                let thead = document.createElement("thead");
                let tbody = document.createElement("tbody");

                // Create table headers
                let headers = Object.keys(result[0]);
                let headerRow = document.createElement("tr");
                headers.forEach(header => {
                    let th = document.createElement("th");
                    th.textContent = header;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);

                // Create table rows and cells
                result.forEach(row => {
                    let rowElement = document.createElement("tr");
                    Object.values(row).forEach(value => {
                        let cell = document.createElement("td");
                        cell.textContent = value;
                        rowElement.appendChild(cell);
                    });
                    tbody.appendChild(rowElement);
                });
                table.appendChild(tbody);

                // Append the table to the document
                document.getElementById("result").appendChild(table);
            }
        })
        .catch(error => console.log(error));
});
