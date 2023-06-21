// Step 4: Fetch CSV data using AJAX
$.ajax({
    url: 'champion_db.csv',
    dataType: 'text',
    success: function (csvData) {
      var championData = parseCSV(csvData);
      renderTable(championData);
    }
  });
  
// Step 5: Parse CSV data into an array of objects
function parseCSV(csvData) {
    var lines = csvData.split('\n');
    var headers = lines[0].split(',');
  
    var championData = [];
    for (var i = 1; i < lines.length; i++) {
      var line = lines[i].split(',');
      var champion = {};
      for (var j = 0; j < headers.length; j++) {
        var propertyName = headers[j].trim(); // Trim whitespace from the header name
        champion[propertyName] = line[j];
      }
      championData.push(champion);
    }
  
    return championData;
  }
  
  
// Step 6: Generate HTML table from the parsed data using jQuery
function renderTable(championData) {
    var table = $('<table>');
    var headerRow = $('<tr>');
    headerRow.append('<th></th>'); // Add Image column header
    headerRow.append('<th>Name ⧎</th>');
    headerRow.append('<th>Class ⧎</th>');
    headerRow.append('<th>Role ⧎</th>');
    headerRow.append('<th>Tier ⧎</th>');
    headerRow.append('<th>Score ⧎</th>');
    headerRow.append('<th>Trend ⧎</th>');
    headerRow.append('<th>Win % ⧎</th>');
    headerRow.append('<th>Role % ⧎</th>');
    headerRow.append('<th>Pick % ⧎</th>');
    headerRow.append('<th>Ban % ⧎</th>');
    headerRow.append('<th>KDA ⧎</th>');
    table.append(headerRow);
  
    for (var i = 0; i < championData.length; i++) {
      var champion = championData[i];
      var row = $('<tr>');

    // Append image for the champion
    var imageName = champion.Name.replace(/[' .]/g, "");
    var imageSrc = "championsgallery/" + imageName + ".png";
    var imageCell = $('<td>');
    var image = new Image(); // Create new HTMLImageElement instance
    image.src = imageSrc;
    image.width = 25; // Set the width of the image to 25 pixels
    image.height = 25; // Set the height of the image to 25 pixels
    imageCell.append(image);
    row.append(imageCell);

      row.append('<td class="white-text">' + champion.Name + '</td>');
      row.append('<td class="white-text">' + champion.Class + '</td>');
      row.append('<td class="white-text">' + champion.Role + '</td>');
      row.append('<td class="tier">' + champion.Tier + '</td>');
      row.append('<td class="white-text">' + parseFloat(champion.Score).toFixed(2) + '</td>');
      row.append('<td class="white-text">' + (champion.Trend) + '</td>');
      row.append('<td class="white-text">' + parseFloat(champion.Win_Percetage).toFixed(4) + '</td>');
      row.append('<td class="white-text">' + parseFloat(champion.Role_Percetage).toFixed(4) + '</td>');
      row.append('<td class="white-text">' + parseFloat(champion.Pick_Percetage).toFixed(4) + '</td>');
      row.append('<td class="white-text">' + parseFloat(champion.Ban_Percetage).toFixed(4) + '</td>');
      row.append('<td class="white-text">' + parseFloat(champion.KDA).toFixed(2) + '</td>');
  
      
  
      table.append(row);
    }
  
    // Step 7: Append the generated HTML table to the container element using jQuery
    $('#table-container').append(table);

    // Step 8: Add sorting functionality to table headers and hover effect to header cells
$('th').hover(
    function() {
      $(this).css('cursor', 'pointer');
      $(this).css('background-color', 'lightblue');
    },
    function() {
      $(this).css('background-color', '');
    }
  );
  
  $('th').click(function() {
    var table = $(this).parents('table').eq(0);
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
    this.asc = !this.asc;
    if (!this.asc) {
      rows = rows.reverse();
    }
    for (var i = 0; i < rows.length; i++) {
      table.append(rows[i]);
    }
  });
  
  function comparer(index) {
    return function(a, b) {
      var valA = getCellValue(a, index);
      var valB = getCellValue(b, index);
      return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
    };
  }
  
  function getCellValue(row, index) {
    return $(row).children('td').eq(index).text();
  }
  
  
    // Step 9: Change color of Tier row based on its text value
    $('.tier').each(function() {
      var tier = $(this).text();
      switch (tier) {
        case 'God':
          $(this).css('color', 'green');
          break;
        case 'S':
          $(this).css('color', 'darkgreen');
          break;
        case 'A':
          $(this).css('color', 'yellow');
          break;
        case 'B':
          $(this).css('color', 'orange');
          break;
        case 'C':
          $(this).css('color', 'orange');
          break;
        case 'D':
          $(this).css('color', 'red');
          break;
        default:
          $(this).css('color', 'black');
          break;
      }
    });
  }
  
  
  