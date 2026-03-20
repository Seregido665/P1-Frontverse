const allRenovationsData = {
  data: [],          
  originalData: [],   
};



function showRenovations() {
  const container = document.querySelector('.renovations-json-list');
  if (!container) return;

  fetch('/renovations.json')
    .then(res => res.json())
    .then(data => {
      allRenovationsData.data = data;                   //--> Guarda daton con filtros, ordenaciones, etc
      allRenovationsData.originalData = [...data];      //--> Guarda los datos original
      updateTotalRenovations();
      paginationManager();
    });
    
  function updateTotalRenovations() {
    const total = allRenovationsData.originalData.length;

    const headerSpan = document.querySelector('.renovations-header__number-policies__number');
    if (headerSpan) headerSpan.textContent = total;
    const filterSpan = document.querySelector('.renovations-filter__all-policies__text-results');
    if (filterSpan) filterSpan.textContent = `${total} pólizas`;
  }
}



function createRenovationCard(renovation) {
  let stateClass = '';
  let icon = '';
  if (renovation["Estado de póliza"] === "Pagado") {
    stateClass = 'state__success';
    icon = 'check';
  } else if (renovation["Estado de póliza"] === "Pendiente") {
    stateClass = 'state__warning';
    icon = 'clock';
  } else {
    stateClass = 'state__error';
    icon = 'close';
  }
  return `
    <div class="renovation-card-desktop">
      <div class="renovation-card-desktop__policy">${renovation["No. de póliza"]}</div>
      <div class="renovation-card-desktop__risk">${renovation["Nombre del riesgo"]}</div>
      <div class="renovation-card-desktop__date-contrat">${renovation["Fecha de contrato"]}</div>
      <div class="renovation-card-desktop__date-maturity">${renovation["Fecha de vencimiento"]}</div>
      <div class="renovation-card-desktop__price">${renovation["Importe"]}</div>
      <div class="state-cell">
        <div class="renovation-card-desktop__state">
          <div class="state ${stateClass}">
            <span class="state__icon icon ${icon}"></span>
            <span class="state__text">${renovation["Estado de póliza"]}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPagination(renovationsPerPage) {
  const container = document.querySelector('.renovations-json-list');
  if (!container) return;
  container.innerHTML = renovationsPerPage.map(createRenovationCard).join('');
}



document.addEventListener('DOMContentLoaded', function () {
  showRenovations();
});
