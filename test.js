// Make an AJAX request to the PHP script
var xhr = new XMLHttpRequest();
xhr.open('GET', 'test.php', true);

xhr.onload = function() {
  if (xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);
    console.log(response); // Display the response in the console
    
    
  } else {
    console.error('Request failed. Status:', xhr.status);
  }
};

xhr.onerror = function() {
  console.error('Request failed. Network error.');
};

xhr.send();
