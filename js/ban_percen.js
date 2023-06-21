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

d3.json('champion_db.json').then(function(data) {
    let labels = data.map((character) => character.Name);
    let banValues = data.map((character) => parseFloat(character.Ban_Percetage));
    let roles = data.map((character) => character.Role);
  
    const ctx = document.getElementById('myChart1').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.slice(0, 30),
        datasets: [{
          label: 'BAN %',
          data: banValues.slice(0, 30),
          backgroundColor: 'rgba(255, 212, 128, 1)',
          borderColor: 'rgba(251, 175, 23, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
    const characterFilter = document.getElementById('characterFilter1');
    const roleFilter = document.getElementById('roleFilter1');
    const sortOrder = document.getElementById('sortOrder1');
  
    characterFilter.addEventListener('change', updateChart);
    roleFilter.addEventListener('change', updateChart);
    sortOrder.addEventListener('change', updateChart);
  
    function updateChart() {
      const selectedCharacterValue = characterFilter.value;
      const selectedRoleValue = roleFilter.value;
      const selectedSortOrder = sortOrder.value;
      let filteredLabels, filteredBanValues;
  
      if (selectedCharacterValue === 'all') {
        filteredLabels = labels;
        filteredBanValues = banValues;
      } else {
        filteredLabels = labels.filter((label) => label.startsWith(selectedCharacterValue.toUpperCase()));
        filteredBanValues = banValues.filter((value, index) => labels[index].startsWith(selectedCharacterValue.toUpperCase()));
      }
  
      if (selectedRoleValue !== 'all') {
        filteredLabels = filteredLabels.filter((label, index) => roles[index] === selectedRoleValue);
        filteredBanValues = filteredBanValues.filter((value, index) => roles[index] === selectedRoleValue);
      }
  
      if (selectedSortOrder === 'desc') {
        const sortedIndices = filteredBanValues.map((_, index) => index)
          .sort((a, b) => filteredBanValues[b] - filteredBanValues[a]);
        filteredLabels = sortedIndices.map((index) => filteredLabels[index]);
        filteredBanValues = sortedIndices.map((index) => filteredBanValues[index]);
      } else if (selectedSortOrder === 'asc') {
        const sortedIndices = filteredBanValues.map((_, index) => index)
          .sort((a, b) => filteredBanValues[a] - filteredBanValues[b]);
        filteredLabels = sortedIndices.map((index) => filteredLabels[index]);
        filteredBanValues = sortedIndices.map((index) => filteredBanValues[index]);
      }
  
      myChart.data.labels = filteredLabels.slice(0, 30);
      myChart.data.datasets[0].data = filteredBanValues.slice(0, 30);
      myChart.update();
    }
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