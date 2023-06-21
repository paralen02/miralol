$(document).ready(function() {
    // Read and parse the 'champion_db.csv' file
    $.ajax({
      url: 'champion_db.csv',
      dataType: 'text',
      success: function(data) {
        var champions = parseCSV(data);
  
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
  
      }
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
  