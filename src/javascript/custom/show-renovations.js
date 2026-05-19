// URL base del backend. En local usa ruta relativa; en producción apunta al backend en Render.
// Cambiar esta URL por la de tu servicio Render antes de hacer el build para Vercel.
const API_BASE_URL = '';  // Ejemplo producción: 'https://frontverse-backend.onrender.com'

// Estado global de paginación y ordenación
const appState = {
  page: 1,
  size: 10,
  orderBy: '',
  totalPages: 1,
};


function buildQueryParams() {
  const params = new URLSearchParams();

  filtersList.forEach(filter => {
    if (filter.type === 'risk') params.append('riskNames', filter.value);
    if (filter.type === 'state') params.set('state', filter.value);
    if (filter.type === 'import') params.set('importValue', filter.value);
    if (filter.type === 'date') {
      params.set('startDate', filter.startDateStr);
      params.set('endDate', filter.endDateStr);
    }
  });

  if (appState.orderBy) params.set('orderBy', appState.orderBy);
                        params.set('page', appState.page);
                        params.set('size', appState.size);

  return params;
}

async function fetchRenovations() {
  const params = buildQueryParams();
  const response = await fetch(`${API_BASE_URL}/api/renovations?${params}`);
  const result = await response.json();

  appState.page = result.currentPage;
  appState.totalPages = result.totalPages;

  renderPagination(result.data);
  updatePaginationControls(result.currentPage, result.totalPages);
  updateTotalRenovations(result.originalTotal, result.totalItems);

  if (result.totalItems === 0) {
    const list = document.querySelector('.renovations-json-list');
    if (list) list.innerHTML = '<p class="no-results">No hay coincidencias</p>';
  }
}

function updateTotalRenovations(original, filtered) {
  const headerSpan = document.querySelector('.renovations-header__number-policies__number');
  if (headerSpan) headerSpan.textContent = original;
  const filterSpan = document.querySelector('.renovations-filter__all-policies__text-results');
  if (filterSpan) filterSpan.textContent = `${filtered} pólizas`;
}


document.addEventListener('DOMContentLoaded', function () {
  if (!document.querySelector('.renovations-json-list')) return;

  paginationManager();
  orderByManager();
  filterMenuManager();
  fetchRenovations();
});
