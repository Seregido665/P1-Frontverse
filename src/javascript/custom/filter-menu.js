function filterMenuManager(renderPage, applyCurrentOrder) {
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
    const filtersReadyToSave = [...filtersList.entries()].map(([key, filter]) => {                //. entries devuelve un array con los datos de los elementos del Map ([key, filter])
      const filterInput = { ...filter };
      // Las fechas parseadas no se guardan bien, por eso mejor a ISOstring
      if (filterInput.startDateParsed) filterInput.startDateParsed = filterInput.startDateParsed.toISOString();
      if (filterInput.endDateParsed) filterInput.endDateParsed = filterInput.endDateParsed.toISOString();
      return [key, filterInput];
    });
    localStorage.setItem(LOCAL_STORAGE_FILTERS, JSON.stringify(filtersReadyToSave));
  }

  function loadFiltersFromStorage() {
    try {
      const savedFiltersList = localStorage.getItem(LOCAL_STORAGE_FILTERS);
      if (!savedFiltersList) return;
      const filtersParsed = JSON.parse(savedFiltersList);
      filtersParsed.forEach(([key, filterInput]) => {
        // Parsear los Date a su formato original
        if (filterInput.startDateParsed) filterInput.startDateParsed = new Date(filterInput.startDateParsed);
        if (filterInput.endDateParsed) filterInput.endDateParsed = new Date(filterInput.endDateParsed);
        filtersList.set(key, filterInput);
      });
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_FILTERS); 
    }
  }


  const filtersList = new Map();
  loadFiltersFromStorage(); 
  const nameInput = nameInputManager(filtersList);
  const datesInputs = datesInputsManager(filtersList, parseDate);
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
    const totalFilters = filtersList.size;
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

  function clearButton() {
    const totalFilters = filtersList.size;
    const showing = totalFilters > 0;
    if (separation) separation.style.display = showing ? 'inline' : 'none';
    if (btnClearAllFilters) btnClearAllFilters.style.display = showing ? 'inline' : 'none';
  }

  function getFilteredData() {
    if (filtersList.size === 0) {
      return [...allRenovationsData.originalData];
    }

    const riskNames = [];
    const dateRanges = [];
    const importValues = [];
    const policyStates = [];

    filtersList.forEach(filter => {
      if (filter.type === 'risk') riskNames.push(filter.value);
      if (filter.type === 'date') dateRanges.push(filter);
      if (filter.type === 'import') importValues.push(filter.value);
      if (filter.type === 'state') policyStates.push(filter.value);
    });

    const filteredData = allRenovationsData.originalData.filter(renovation => {
      // - Nombre -
      const riskName = (renovation['Nombre del riesgo'] || '').toLowerCase();
      const matchesRiskNames = riskNames.length === 0 || riskNames.includes(riskName);

      // - Fecha de vencimiento -
      const maturityDate = renovation['Fecha de vencimiento'] || '';
      const matchesMaturityDate =
        dateRanges.length === 0 ||
        dateRanges.some(range => {                      // .some devuelve true si al menos una fecha coincide.
          const maturity = parseDate(maturityDate);
          return maturity >= range.startDateParsed && maturity <= range.endDateParsed;
        });

      // - Importe -
      const renovationImport = parseImport(renovation.Importe);
      const matchesImport =
        importValues.length === 0 ||
        importValues.some(value => Math.abs(renovationImport - value) < 0.005);     // 0.005 para evitar problemas de redondeo con los decimales

      // - Estado de póliza -
      const policyState = (renovation['Estado de póliza'] || '').toLowerCase();
      const matchesPolicyStates = policyStates.length === 0 || policyStates.includes(policyState);

      return matchesRiskNames && matchesMaturityDate && matchesPolicyStates && matchesImport;
    });

    return filteredData;
  }

  function applyActiveFilters() {
    const filtered = getFilteredData();
    allRenovationsData.data = applyCurrentOrder(filtered);

    const renovationsResult = allRenovationsData.data.length;
    updateTotalRenovations(renovationsResult);

    renderPage(1);

    if (renovationsResult === 0) {
      const emptyRenovationsList = document.querySelector('.renovations-json-list');
      if (emptyRenovationsList) {
        emptyRenovationsList.innerHTML = '<p class="no-results">No hay coincidencias</p>';
      }
    }

    updateFiltersAppliedInfo();
    clearButton();
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

      const closeIcon = filterCard.querySelector('.icon.close');
      closeIcon.addEventListener('click', () => {
        filtersList.delete(idCard);
        saveFiltersToStorage();    
        renderFilters();
        applyActiveFilters();
      });

      filtersAppliedContainer.appendChild(filterCard);
    });
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


  // --- Parseo de fechas e importes ---
  function parseDate(dateEntry) {
    const dateParts = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateEntry);        // .exec devuelve un array con el valor de cada posición de los numeros de la fecha. 
    if (!dateParts) return null;
    const day = Number(dateParts[1]);
    const month = Number(dateParts[2]);
    const year = Number(dateParts[3]);
    const date = new Date(year, month - 1, day);

    const isValidDate = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    if (!isValidDate) return null;

    return date;
  }

  function parseImport(importEntry) {
    const importNormalized = String(importEntry || '')
      .replace(/\./g, '')
      .replace(',', '.')
      .replace(/[^0-9.-]/g, '');

    const importParsed = Number(importNormalized);
    return Number.isNaN(importParsed) ? 0 : importParsed;
  }


  if (btnClearAllFilters) {
    btnClearAllFilters.addEventListener('click', () => {
      filtersList.clear();
      saveFiltersToStorage(); 
      renderFilters();
      applyActiveFilters();
    });
  }

  renderFilters();
  applyActiveFilters();
}