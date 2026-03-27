function filterMenuManager(renderPage, applyCurrentOrder) {
  const inputNameRisk = document.querySelector('.filter-menu__body__input1');
  const inputStartDate = document.querySelector('.filter-menu__body__input2');
  const inputEndDate = document.querySelector('.filter-menu__body__input3');
  const errorRisk = document.querySelector('.filter-menu__body__error-name-risk');
  const errorDate = document.querySelector('.filter-menu__body__error-date');

  const btnApply = document.querySelector('.filter-menu__bottom__apply');
  const filterMenu = document.querySelector('.filter-menu');
  const filtersAppliedContainer = document.querySelector('.apply-filters');
  
  const btnClearAllFilters = document.querySelector('.renovations-filter__all-policies__clear-filters');
  const totalFiltersApplied = document.querySelector('.renovations-filter__all-policies__text-filters');
  const separation = document.querySelector('.renovations-filter__all-policies .separation');

  if (!inputNameRisk || !btnApply) return;

  const filtersList = new Map();   

  // =================================================================
  // 1. LÓGICA CENTRAL (Gestión general del filtro y estado compartido)
  // =================================================================

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

  function updateClearButtonVisibility() {
    const totalFilters = filtersList.size;
    const show = totalFilters > 0;
    if (separation) separation.style.display = show ? 'inline' : 'none';
    if (btnClearAllFilters) btnClearAllFilters.style.display = show ? 'inline' : 'none';
  }

  function getFilteredData() {
    if (filtersList.size === 0) {
      return [...allRenovationsData.originalData];
    }

    const riskValues = [];
    const dateRanges = [];

    filtersList.forEach(filter => {
      if (filter.type === 'risk') riskValues.push(filter.value);
      if (filter.type === 'date') dateRanges.push(filter);
    });

    const filteredData = allRenovationsData.originalData.filter(renovation => {
      const riskName = (renovation['Nombre del riesgo'] || '').toLowerCase();
      const maturityDateStr = renovation['Fecha de vencimiento'] || '';

      const matchesRisk = riskValues.length === 0 || riskValues.includes(riskName);

      const matchesDate =
        dateRanges.length === 0 ||
        dateRanges.some(range => {
          const maturity = parseDate(maturityDateStr);
          return maturity !== null && maturity >= range.startDate && maturity <= range.endDate;
        });

      return matchesRisk && matchesDate;
    });

    return filteredData;
  }

  function applyActiveFilters() {
    const filtered = getFilteredData();
    allRenovationsData.data = applyCurrentOrder(filtered);

    const renovationsResult = allRenovationsData.data.length;
    updateTotalRenovations(renovationsResult);

    renderPage(1);
    updateFiltersAppliedInfo();
    updateClearButtonVisibility();
  }

  function renderTags() {
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
        renderTags();
        applyActiveFilters();
      });

      filtersAppliedContainer.appendChild(filterCard);
    });
  }


  // =================================================================
  // 2. LÓGICA DE NOMBRE DE RIESGO (Validación y gestión del filtro por nombre)
  // =================================================================

  function showError(message) {
    if (errorRisk) errorRisk.textContent = message;
  }

  function clearError() {
    if (errorRisk) errorRisk.textContent = '';
  }

  // Evento principal de aplicar filtros
  btnApply.addEventListener('click', function () {
    let anyFilterAdded = false;

    // --- Filtro por nombre de riesgo ---
    const riskSearched = inputNameRisk.value.trim();
    if (riskSearched) {
      const riskSearchedLower = riskSearched.toLowerCase();
      const coincidence = allRenovationsData.originalData.some(renovation =>
        (renovation['Nombre del riesgo'] || '').toLowerCase() === riskSearchedLower
      );

      if (!coincidence) {
        showError('No hay pólizas con ese nombre.');
      } else {
        filtersList.set(`risk:${riskSearchedLower}`, {
          type: 'risk',
          label: riskSearched,
          value: riskSearchedLower
        });
        inputNameRisk.value = '';
        clearError();
        anyFilterAdded = true;
      }
    }

    // --- Filtro por rango de fechas ---
    const startDateVal = inputStartDate ? inputStartDate.value.trim() : '';
    const endDateVal = inputEndDate ? inputEndDate.value.trim() : '';

    if (startDateVal || endDateVal) {
      if (!isValidDateFormat(startDateVal) || !isValidDateFormat(endDateVal) ||
          !startDateVal || !endDateVal) {
        if (errorDate) errorDate.textContent = 'Formato correcto: 00/00/0000';
      } else {
        const startDate = parseDate(startDateVal);
        const endDate = parseDate(endDateVal);

        if (!startDate || !endDate) {
          if (errorDate) errorDate.textContent = 'Formato correcto: 00/00/0000';
        } else if (endDate < startDate) {
          if (errorDate) errorDate.textContent = 'La fecha fin debe ser posterior a la fecha inicio.';
        } else {
          filtersList.set(`date:${startDateVal}-${endDateVal}`, {
            type: 'date',
            label: `${startDateVal} - ${endDateVal}`,
            startDate,
            endDate
          });
          inputStartDate.value = '';
          inputEndDate.value = '';
          if (errorDate) errorDate.textContent = '';
          anyFilterAdded = true;
        }
      }
    }

    if (anyFilterAdded) {
      renderTags();
      applyActiveFilters();
      closeFilterMenu();
    }
  });


  // =================================================================
  // 3. LÓGICA DE FECHA DE VALIDEZ (Validación y gestión de fechas)
  // =================================================================

  function isValidDateFormat(dateValue) {
    if (!dateValue || dateValue.trim() === '') return false;
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(dateValue.trim());
  }

  function parseDate(str) {
    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(str);
    if (!match) return null;
    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    const d = new Date(year, month - 1, day);
    if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null;
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function applyDateMask(input) {
    const digits = input.value.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) {
      input.value = digits;
    } else if (digits.length <= 4) {
      input.value = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
      input.value = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    }
  }

  if (inputStartDate) {
    inputStartDate.addEventListener('input', () => {
      applyDateMask(inputStartDate);
      if (errorDate) errorDate.textContent = '';
    });
  }
  if (inputEndDate) {
    inputEndDate.addEventListener('input', () => {
      applyDateMask(inputEndDate);
      if (errorDate) errorDate.textContent = '';
    });
  }


  // =================================================================
  // LÓGICA DE LIMPIEZA GENERAL (Clear All Filters)
  // =================================================================

  if (btnClearAllFilters) {
    btnClearAllFilters.addEventListener('click', () => {
      filtersList.clear();
      if (inputNameRisk) inputNameRisk.value = '';
      if (inputStartDate) inputStartDate.value = '';
      if (inputEndDate) inputEndDate.value = '';
      
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