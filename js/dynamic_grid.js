$(document).ready(function() {
  // Read the champion data from the CSV file
  $.get("champion_db.csv", function(data) {
    var championData = parseCSV(data);

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

  });
});


function parseCSV(csvData) {
  var lines = csvData.split('\n');
  var headers = lines[0].split(',');

  var championData = [];
  for (var i = 1; i < lines.length; i++) {
    var line = lines[i].split(',');
    var champion = {};
    for (var j = 0; j < headers.length; j++) {
      var propertyName = headers[j].trim();
      champion[propertyName] = line[j];
    }
    championData.push(champion);
  }

  return championData;
}

