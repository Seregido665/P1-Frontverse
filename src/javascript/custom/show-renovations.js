const allRenovationsData = {
  data: [],          
  originalData: [],   
};


function updateTotalRenovations(total) {
  const headerSpan = document.querySelector('.renovations-header__number-policies__number');
  if (headerSpan) headerSpan.textContent = total;
  const filterSpan = document.querySelector('.renovations-filter__all-policies__text-results');
  if (filterSpan) filterSpan.textContent = `${total} pólizas`;
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

      const { renderPage } = paginationManager();   //--> Recoge renderPage del manager
      orderByManager(renderPage); 
    });
}


document.addEventListener('DOMContentLoaded', function () {
  showRenovations();
});