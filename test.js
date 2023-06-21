// Fetch data from the PHP file
fetch("data.php")
.then(response => response.json())
.then(data => {
    // Create a table element
    let table = document.createElement("table");

    // Iterate over the data array
    for (let row of data) {
        // Create a new row element
        let tr = document.createElement("tr");

        // Iterate over the properties of the row object
        for (let key in row) {
            // Create a new cell element
            let td = document.createElement("td");

            // Set the text content of the cell
            td.textContent = row[key];

            // Append the cell to the row
            tr.appendChild(td);
        }

        // Append the row to the table
        table.appendChild(tr);
    }

    // Append the table to the result div
    document.getElementById("result").appendChild(table);
})
.catch(error => console.log(error));