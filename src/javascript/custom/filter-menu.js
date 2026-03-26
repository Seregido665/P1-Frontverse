function filterMenuManager(renderPage, applyCurrentOrder) {
  const inputNameRisk = document.querySelector('.filter-menu__body__input1');
  const errorRisk = document.querySelector('.filter-menu__body__error');
  const btnApply = document.querySelector('.filter-menu__bottom__apply');
  const filterMenu = document.querySelector('.filter-menu');
  const filtersAppliedContainer = document.querySelector('.apply-filters');
  
  const btnClearAllFilters = document.querySelector('.renovations-filter__all-policies__clear-filters');
  const totalFiltersApplied = document.querySelector('.renovations-filter__all-policies__text-filters');
  const separation = document.querySelector('.renovations-filter__all-policies .separation');

  if (!inputNameRisk || !btnApply || !applyCurrentOrder) return;

  const risksFiltered = new Map();   

  function closeFilterMenu() {
    if (filterMenu) {
      filterMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  function showError(message) {
    if (errorRisk) errorRisk.textContent = message;
  }

  function clearError() {
    if (errorRisk) errorRisk.textContent = '';
  }

  function updateFiltersAppliedInfo() {
    if (!totalFiltersApplied) return;
    const totalFilters = risksFiltered.size;
    if (totalFilters === 0) {
      totalFiltersApplied.style.display = 'none';
    } else if (totalFilters === 1) {
      totalFiltersApplied.textContent = '1 filtro aplicado';
      totalFiltersApplied.style.display = 'inline';
    } else {
      totalFiltersApplied.textContent = `${totalFilters} filtros aplicados`;
      totalFiltersApplied.style.display = 'inline';
    }
  }

  function updateClearButtonVisibility() {
    const totalFilters = risksFiltered.size;
    const show = totalFilters > 0;
    if (separation) separation.style.display = show ? 'inline' : 'none';
    if (btnClearAllFilters) btnClearAllFilters.style.display = show ? 'inline' : 'none';
  }

  function getFilteredData() {
    return allRenovationsData.originalData.filter(renovation => {
      const riskLower = renovation['Nombre del riesgo'].toLowerCase();
      return risksFiltered.has(riskLower);
    });
  }

  // Aplica filtro + orden actual
  function applyActiveFilters() {
    const filtered = getFilteredData();
    allRenovationsData.data = applyCurrentOrder(filtered);
    
    updateTotalRenovations(allRenovationsData.data.length);
    renderPage(1);
    
    updateFiltersAppliedInfo();
    updateClearButtonVisibility();
  }

  function renderTags() {
    if (!filtersAppliedContainer) return;
    filtersAppliedContainer.innerHTML = '';

    risksFiltered.forEach(originalName => {
      const tag = document.createElement('div');
      tag.className = 'apply-filters__filter';
      tag.innerHTML = `
        <span>${originalName}</span>
        <span class="icon close" data-name="${originalName.toLowerCase()}" aria-label="Eliminar filtro ${originalName}"></span>
      `;

      tag.querySelector('.icon.close').addEventListener('click', () => {
        risksFiltered.delete(originalName.toLowerCase());
        renderTags();
        applyActiveFilters();
      });

      filtersAppliedContainer.appendChild(tag);
    });
  }

  // Limpiar error al escribir
  inputNameRisk.addEventListener('input', clearError);

  // Botón "Aplicar filtros" del menú
  btnApply.addEventListener('click', function () {
    const value = inputNameRisk.value.trim();
    if (!value) {
      showError('Introduce un nombre de riesgo.');
      return;
    }

    const valueLower = value.toLowerCase();

    const exists = allRenovationsData.originalData.some(r => 
      r['Nombre del riesgo'].toLowerCase() === valueLower
    );

    if (!exists) {
      showError('No hay pólizas con ese nombre.');
      return;
    }

    clearError();
    risksFiltered.set(valueLower, value);
    inputNameRisk.value = '';

    renderTags();
    applyActiveFilters();
    closeFilterMenu();
  });

  // Botón "Borrar filtros" externo (el que está en la barra superior)
  if (btnClearAllFilters) {
    btnClearAllFilters.addEventListener('click', () => {
      risksFiltered.clear();
      if (inputNameRisk) inputNameRisk.value = '';
      renderTags();
      applyActiveFilters();

      if (filterMenu && filterMenu.classList.contains('is-open')) {
        filterMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  // Inicialización
  updateFiltersAppliedInfo();
  updateClearButtonVisibility();
}