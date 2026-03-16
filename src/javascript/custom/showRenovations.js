// --- CREO UN ARRAY GLOBAL QUE ALAMACENE TODOS LOS DATOS DEL json ---
window._RENOVATIONS_DATA = [];    //--> AL GUARDARLO EN UN window SERA ACCESIBLE DESDE CUALQUIER js


// --- CARGA LA LISTA DE RENOVACIONES POR PRIMERA VEZ ---
function showRenovationsJsonList() {
  fetch('/renovations.json')
    .then(res => res.json())
    .then(data => {
      window._RENOVATIONS_DATA = data;     //--> GUARDA LOS DATOS EN EL ARRAY window
      window.renovationsPerPage();         //--> INICIA LA PAGINACION TRAS CARGAR LOS DATOS
      window.updateTotalRenovations();     //--> ACTUALIZA EL TOTAL DE RENOVACIONES DE renovationspage-header.pug TRAS CARGAR EL json
    });
}


// --- PARA MOSTRAR RENOVACIONES SEGUN:
//   > LA CANTIDAD DE RENOVACIONES POR PAGINA (renovationsPerPage -> pagination.js) 
//   > Y FORMA DE ORDENAMIENTO (orderBy.js) ---
window.renderRenovationsWithPagination = function (rowsPerPage, page) {
  const container = document.querySelector('.renovations-json-list');
  if (!container) return;

  // --- PRIMERO COMPRUEBA SI HAY ALGUNA OPCION DEL orderBy SELECCIONADA CON EL typeof, SI NO, USA EL ARRAY ORIGINAL ---
  let data = (typeof window.getRenovationsOrderBy === 'function')
    ? window.getRenovationsOrderBy()
    : window._RENOVATIONS_DATA;

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const currentRenovations = data.slice(start, end);

  // -- CONVIERTE CADA RENOVACION EN UN HTML Y LO AÑADE --
  container.innerHTML = currentRenovations.map(renovation => {

    // - ESTILO DEL ESTADO DE CADA RENOVACIÓN -
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
  }).join('');
};

document.addEventListener('DOMContentLoaded', function () {
  showRenovationsJsonList();
});