// ─────────────────────────────────────────────
//  MÓDULO COMPARTIDO  (accesible desde pagination.js y orderBy.js)
// ─────────────────────────────────────────────
const RenovationsStore = {
  data: [],           // Array activo (puede estar ordenado/filtrado)
  originalData: [],   // Copia inmutable del JSON original, solo para lectura
};


// ─────────────────────────────────────────────
//  CONSTRUCCIÓN DEL HTML DE UNA TARJETA
// ─────────────────────────────────────────────
function buildRenovationCard(renovation) {
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


// ─────────────────────────────────────────────
//  RENDERIZADO CON PAGINACIÓN
//  Llamado desde pagination.js en cada cambio de página
// ─────────────────────────────────────────────
function renderRenovationsWithPagination(rowsPerPage, currentPage) {
  const container = document.querySelector('.renovations-json-list');
  if (!container) return;

  const start = (currentPage - 1) * rowsPerPage;
  const end   = start + rowsPerPage;
  const slice = RenovationsStore.data.slice(start, end);

  container.innerHTML = slice.map(buildRenovationCard).join('');
}


// ─────────────────────────────────────────────
//  TOTAL DE RENOVACIONES
//  Se llama una sola vez al cargar el JSON
// ─────────────────────────────────────────────
function updateTotalRenovations() {
  const total = RenovationsStore.originalData.length;

  const headerSpan = document.querySelector('.renovations-header__number-policies__number');
  if (headerSpan) headerSpan.textContent = total;

  const filterSpan = document.querySelector('.renovations-filter__all-policies__text-results');
  if (filterSpan) filterSpan.textContent = `${total} pólizas`;
}


// ─────────────────────────────────────────────
//  CARGA INICIAL DEL JSON
// ─────────────────────────────────────────────
function showRenovationsJsonList() {
  const container = document.querySelector('.renovations-json-list');
  if (!container) return;

  fetch('/renovations.json')
    .then(res => res.json())
    .then(data => {
      RenovationsStore.data         = data;        // Array activo (puede cambiar con el orden)
      RenovationsStore.originalData = [...data];   // Copia inmutable del JSON original
      updateTotalRenovations();                    // Pintamos los totales en el header y filtros
      renovationsPerPage();                        // Iniciamos la paginación una vez hay datos
    });
}


// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  showRenovationsJsonList();
});