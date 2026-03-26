const allRenovationsData = {
  data: [],          
  originalData: [],   
};


function updateTotalRenovations(filtered) {
  const headerSpan = document.querySelector('.renovations-header__number-policies__number');
  if (headerSpan) headerSpan.textContent = allRenovationsData.originalData.length;
  const filterSpan = document.querySelector('.renovations-filter__all-policies__text-results');
  if (filterSpan) filterSpan.textContent = `${filtered} pólizas`;               
}


function showRenovations() {
  const container = document.querySelector('.renovations-json-list');
  if (!container) return;

  fetch('/renovations.json')
    .then(res => res.json())
    .then(data => {
      allRenovationsData.data = data;                   //--> Guarda datos con filtros, ordenaciones, etc
      allRenovationsData.originalData = [...data];      //--> Guarda los datos original
      updateTotalRenovations(allRenovationsData.originalData.length);

      const renderPage = paginationManager();  
      const applyOrder = orderByManager(renderPage);
      filterMenuManager(renderPage, applyOrder);
    });
}


document.addEventListener('DOMContentLoaded', function () {
  showRenovations();
});