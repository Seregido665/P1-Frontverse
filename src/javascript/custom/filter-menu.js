// Global: accedido por buildQueryParams() en show-renovations.js
const filtersList = new Map();

function filterMenuManager() {
  const btnApply = document.querySelector('.filter-menu__bottom__apply');
  const filterMenu = document.querySelector('.filter-menu');
  const filtersAppliedContainer = document.querySelector('.apply-filters');
  const btnClearAllFilters = document.querySelector('.renovations-filter__all-policies__clear-filters');
  const totalFiltersApplied = document.querySelector('.renovations-filter__all-policies__text-filters');
  const separation = document.querySelector('.renovations-filter__all-policies .separation');
  const LOCAL_STORAGE_FILTERS = 'renovations_filters';

  if (!btnApply) return;

  // --- Local Storage ---
  function saveFiltersToStorage() {
    localStorage.setItem(LOCAL_STORAGE_FILTERS, JSON.stringify([...filtersList.entries()]));
  }

  function loadFiltersFromStorage() {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FILTERS);
      if (!saved) return;
      JSON.parse(saved).forEach(([key, filter]) => filtersList.set(key, filter));
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_FILTERS);
    }
  }

  loadFiltersFromStorage();

  const nameInput = nameInputManager(filtersList);
  const datesInputs = datesInputsManager(filtersList);  
  const importInput = importInputManager(filtersList);
  const stateInput = stateInputManager(filtersList);


  function closeFilterMenu() {
    if (filterMenu) {
      filterMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  function updateFiltersAppliedInfo() {
    if (!totalFiltersApplied) return;
    const total = filtersList.size;
    if (total === 0) {
      totalFiltersApplied.style.display = 'none';
    } else {
      totalFiltersApplied.textContent = total === 1 ? i18next.t('filters.filtro_aplicado') : i18next.t('filters.filtros_aplicados', { count: total });
      totalFiltersApplied.style.display = 'inline';
    }
  }

  function clearButton() {
    const showing = filtersList.size > 0;
    if (separation) separation.style.display = showing ? 'inline' : 'none';
    if (btnClearAllFilters) btnClearAllFilters.style.display = showing ? 'inline' : 'none';
  }

  function renderFilters() {
    if (!filtersAppliedContainer) return;
    filtersAppliedContainer.innerHTML = '';

    filtersList.forEach((filter, idCard) => {
      const filterCard = document.createElement('div');
      filterCard.className = 'apply-filters__filter';
      filterCard.innerHTML = `
        <span>${filter.label}</span>
        <span class="icon close" data-name="${idCard}"></span>
      `;

      filterCard.querySelector('.icon.close').addEventListener('click', () => {
        filtersList.delete(idCard);
        saveFiltersToStorage();
        renderFilters();
        applyActiveFilters();
      });

      filtersAppliedContainer.appendChild(filterCard);
    });
  }

  function applyActiveFilters() {
    appState.page = 1;
    fetchRenovations();
    updateFiltersAppliedInfo();
    clearButton();
  }

  btnApply.addEventListener('click', function () {
    let anyFilterAdded = false;
    if (nameInput.nameRiskFilter()) anyFilterAdded = true;
    if (datesInputs.dateRangeFilter()) anyFilterAdded = true;
    if (importInput.importFilter()) anyFilterAdded = true;
    if (stateInput.policyStateFilter()) anyFilterAdded = true;

    if (anyFilterAdded) {
      saveFiltersToStorage();
      renderFilters();
      applyActiveFilters();
      closeFilterMenu();
    }
  });

  if (btnClearAllFilters) {
    btnClearAllFilters.addEventListener('click', () => {
      filtersList.clear();
      saveFiltersToStorage();
      renderFilters();
      applyActiveFilters();
    });
  }

  renderFilters();
  updateFiltersAppliedInfo();
  clearButton();
}
