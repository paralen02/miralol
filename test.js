document.addEventListener("DOMContentLoaded", function() {
    fetch("test.php")
        .then(response => response.json())
        .then(result => {
            let output = "";
            for (let key in result) {
                output += key + ": " + result[key] + "<br>";
            }
            document.getElementById("result").innerHTML = output;
        })
        .catch(error => console.log(error));
});
