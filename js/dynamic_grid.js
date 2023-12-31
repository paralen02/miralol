$(document).ready(function() {
  // Make an AJAX request to the PHP script
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'test.php', true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(response); // Display the response in the console

      // Convert the JSON response to a string of objects similar to the ones generated by parseCSV
      var championData = convertJSONToObjects(response);

      // Generate the HTML for the champions grid
      var html = "";
      championData.forEach(function(champion) {
        var attributeName = champion.Name.replace(/[' .]/g, "");
        var officialName = champion.Name.replace(/[' .]/g, "-");
        var imageSrc = "championsgallery/" + attributeName + ".png";
        html += '<div class="champion">';
        html += '<a>';
        html += '<img src="' + imageSrc + '" alt="' + champion.Name + '" onclick="window.open(\'https://www.leagueoflegends.com/en-us/champions/' + officialName + '\', \'_blank\')">';
        html += '</a>';
        html += '<div>' + champion.Name + '</div>';
        html += '</div>';
      });

      // Add the HTML to the champions container
      $("#champions").html(html);
    } else {
      console.error('Request failed. Status:', xhr.status);
    }
  };

  xhr.onerror = function() {
    console.error('Request failed. Network error.');
  };

  xhr.send();
});

function convertJSONToObjects(jsonData) {
  var championData = [];
  for (var i = 0; i < jsonData.length; i++) {
    var champion = {};
    for (var propertyName in jsonData[i]) {
      champion[propertyName] = jsonData[i][propertyName];
    }
    championData.push(champion);
  }
  return championData;
}
