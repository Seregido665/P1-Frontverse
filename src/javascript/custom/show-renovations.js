// URL del servicio Render para Vercel.
const API_BASE_URL = 'https://p1-frontverse-backend.onrender.com';

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

function showLoader() {
  const list = document.querySelector('.renovations-json-list');
  if (!list || list.querySelector('.loading-backend')) return;
  const loader = document.createElement('p');
  loader.className = 'loading-backend';
  loader.textContent = 'Cargando backend en Render...';
  list.insertBefore(loader, list.firstChild);
}

function hideLoader() {
  const loader = document.querySelector('.loading-backend');
  if (loader) loader.remove();
}

async function fetchRenovations() {
  showLoader();

  const params = buildQueryParams();
  const response = await fetch(`${API_BASE_URL}/api/renovations?${params}`);
  const result = await response.json();

  hideLoader();

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
