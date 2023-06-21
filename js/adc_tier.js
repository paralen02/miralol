$(document).ready(function() {
  // Make an AJAX request to the PHP script
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'test.php', true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(response); // Display the response in the console

      // Convert the JSON response to a string of objects similar to the ones generated by parseCSV
      var champions = convertJSONToObjects(response);
  
        // Filter champions by role "adc"
        var adcChampions = champions.filter(function(champion) {
          return champion.Role === 'ADC';
        });
  
        // Group champions by tier
        var tiers = ['God', 'S', 'A', 'B', 'C', 'D'];
        var groupedChampions = {};
        tiers.forEach(function(tier) {
          groupedChampions[tier] = adcChampions.filter(function(champion) {
            return champion.Tier === tier;
          });
        });
  
       // Generate the HTML table rows for each tier
tiers.forEach(function(tier) {
    var championsInTier = groupedChampions[tier];
    var tierRow = $('<tr><td class="gold-cell" style="background-color: black; color: white; font-weight: bold; text-align: center; font-size: 25px;">' + tier + '</td></tr>');
    championsInTier.forEach(function(champion) {
      var attributeName = champion.Name.replace(/[' .]/g, "");
      var imageSrc = "championsgallery/" + attributeName + ".png";
      var championCell = $('<td class="gold-cell" style="text-align: center;"><img src="' + imageSrc + '" width="50" height="50" class="image-with-padding"><br>' + '<span class="score">' + champion.Score + '</span></td>');
      tierRow.append(championCell);
    });
    $('#championTable').append(tierRow);
  });
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
  