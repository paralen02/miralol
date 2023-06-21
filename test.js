// Make an AJAX request to the PHP script
var xhr = new XMLHttpRequest();
xhr.open('GET', 'test.php', true);

xhr.onload = function() {
  if (xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);
    console.log(response); // Display the response in the console
    
    // You can now use the response data as needed
    // For example, iterate over the response and display the data on the webpage
    for (var i = 0; i < response.length; i++) {
      var row = response[i];
      console.log(row); // Display each row in the console
      // Access the values of each row and do something with them
      var name = row.Name;
      var class = row.Class;
      // ...
      // Perform further operations with the data
    }
  } else {
    console.error('Request failed. Status:', xhr.status);
  }
};

xhr.onerror = function() {
  console.error('Request failed. Network error.');
};

xhr.send();
