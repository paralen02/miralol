d3.csv('champion_db.csv').then(function(data) {
    let labels = data.map((character) => character.Name);
    let pickValues = data.map((character) => parseFloat(character.Pick_Percetage));
    let roles = data.map((character) => character.Role);
  
    const ctx = document.getElementById('myChart3').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels.slice(0, 30),
        datasets: [{
          label: 'PICK %',
          data: pickValues.slice(0, 30),
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
  
    const characterFilter = document.getElementById('characterFilter3');
    const roleFilter = document.getElementById('roleFilter3');
    const sortOrder = document.getElementById('sortOrder3');
  
    characterFilter.addEventListener('change', updateChart);
    roleFilter.addEventListener('change', updateChart);
    sortOrder.addEventListener('change', updateChart);
  
    function updateChart() {
      const selectedCharacterValue = characterFilter.value;
      const selectedRoleValue = roleFilter.value;
      const selectedSortOrder = sortOrder.value;
      let filteredLabels, filteredpickValues;
  
      if (selectedCharacterValue === 'all') {
        filteredLabels = labels;
        filteredpickValues = pickValues;
      } else {
        filteredLabels = labels.filter((label) => label.startsWith(selectedCharacterValue.toUpperCase()));
        filteredpickValues = pickValues.filter((value, index) => labels[index].startsWith(selectedCharacterValue.toUpperCase()));
      }
  
      if (selectedRoleValue !== 'all') {
        filteredLabels = filteredLabels.filter((label, index) => roles[index] === selectedRoleValue);
        filteredpickValues = filteredpickValues.filter((value, index) => roles[index] === selectedRoleValue);
      }
  
      if (selectedSortOrder === 'desc') {
        const sortedIndices = filteredpickValues.map((_, index) => index)
          .sort((a, b) => filteredpickValues[b] - filteredpickValues[a]);
        filteredLabels = sortedIndices.map((index) => filteredLabels[index]);
        filteredpickValues = sortedIndices.map((index) => filteredpickValues[index]);
      } else if (selectedSortOrder === 'asc') {
        const sortedIndices = filteredpickValues.map((_, index) => index)
          .sort((a, b) => filteredpickValues[a] - filteredpickValues[b]);
        filteredLabels = sortedIndices.map((index) => filteredLabels[index]);
        filteredpickValues = sortedIndices.map((index) => filteredpickValues[index]);
      }
  
      myChart.data.labels = filteredLabels.slice(0, 30);
      myChart.data.datasets[0].data = filteredpickValues.slice(0, 30);
      myChart.update();
    }
  });