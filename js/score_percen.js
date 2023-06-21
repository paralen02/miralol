d3.csv('champion_db.csv').then(function(data) {
    let labels = data.map((character) => character.Name);
    let scoreValues = data.map((character) => parseFloat(character.Score));
    let roles = data.map((character) => character.Role);
  
    const ctx = document.getElementById('myChart2').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.slice(0, 30),
        datasets: [{
          label: 'SCORE %',
          data: scoreValues.slice(0, 30),
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
  
    const characterFilter = document.getElementById('characterFilter2');
    const roleFilter = document.getElementById('roleFilter2');
    const sortOrder = document.getElementById('sortOrder2');
  
    characterFilter.addEventListener('change', updateChart);
    roleFilter.addEventListener('change', updateChart);
    sortOrder.addEventListener('change', updateChart);
  
    function updateChart() {
      const selectedCharacterValue = characterFilter.value;
      const selectedRoleValue = roleFilter.value;
      const selectedSortOrder = sortOrder.value;
      let filteredLabels, filteredscoreValues;
  
      if (selectedCharacterValue === 'all') {
        filteredLabels = labels;
        filteredscoreValues = scoreValues;
      } else {
        filteredLabels = labels.filter((label) => label.startsWith(selectedCharacterValue.toUpperCase()));
        filteredscoreValues = scoreValues.filter((value, index) => labels[index].startsWith(selectedCharacterValue.toUpperCase()));
      }
  
      if (selectedRoleValue !== 'all') {
        filteredLabels = filteredLabels.filter((label, index) => roles[index] === selectedRoleValue);
        filteredscoreValues = filteredscoreValues.filter((value, index) => roles[index] === selectedRoleValue);
      }
  
      if (selectedSortOrder === 'desc') {
        const sortedIndices = filteredscoreValues.map((_, index) => index)
          .sort((a, b) => filteredscoreValues[b] - filteredscoreValues[a]);
        filteredLabels = sortedIndices.map((index) => filteredLabels[index]);
        filteredscoreValues = sortedIndices.map((index) => filteredscoreValues[index]);
      } else if (selectedSortOrder === 'asc') {
        const sortedIndices = filteredscoreValues.map((_, index) => index)
          .sort((a, b) => filteredscoreValues[a] - filteredscoreValues[b]);
        filteredLabels = sortedIndices.map((index) => filteredLabels[index]);
        filteredscoreValues = sortedIndices.map((index) => filteredscoreValues[index]);
      }
  
      myChart.data.labels = filteredLabels.slice(0, 30);
      myChart.data.datasets[0].data = filteredscoreValues.slice(0, 30);
      myChart.update();
    }
  });