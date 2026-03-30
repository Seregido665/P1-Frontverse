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

  if (!inputNameRisk || !inputStartDate || !btnApply) return;

  const filtersList = new Map();   

  
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

    filtersList.forEach(filter => {
      if (filter.type === 'risk') riskNames.push(filter.value);
      if (filter.type === 'date') dateRanges.push(filter);
    });

    const filteredData = allRenovationsData.originalData.filter(renovation => {
      const riskName = (renovation['Nombre del riesgo'] || '').toLowerCase();
      const matchesRiskNames = riskNames.length === 0 || riskNames.includes(riskName);

      const maturityDate = renovation['Fecha de vencimiento'] || '';
      const matchesMaturityDate =
        dateRanges.length === 0 ||
        dateRanges.some(range => {         // Ver si la fecha cae en alguno de los rangos aplicados.
          const maturity = parseDate(maturityDate);
          return maturity >= range.startDateParsed && maturity <= range.endDateParsed;
        });

      return matchesRiskNames && matchesMaturityDate;
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
        renderFilters();
        applyActiveFilters();
      });

      filtersAppliedContainer.appendChild(filterCard);
    });
  }


  
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
        errorRisk.textContent = 'No hay pólizas con ese nombre.';
      } else {
        filtersList.set(`risk:${riskSearchedLower}`, {
          type: 'risk',
          label: riskSearched,
          value: riskSearchedLower
        });
        inputNameRisk.value = '';
        errorRisk.textContent = '';
        anyFilterAdded = true;
      }
    }


    // --- Filtro por rango de fechas ---
    function isValidDateFormat(dateValue) {
      if (!dateValue || dateValue.trim() === '') return false;
      
      const correctFormatDate = /^\d{2}\/\d{2}\/\d{4}$/;
      const dateValueCleaned = dateValue.trim();
      const isValid = correctFormatDate.test(dateValueCleaned);
      
      return isValid;
    }

    const startDateValue = inputStartDate.value.trim();
    const endDateValue = inputEndDate.value.trim();

    if (!isValidDateFormat(startDateValue) || !isValidDateFormat(endDateValue)) {
      errorDate.textContent = 'Formato correcto: 00/00/0000';
    } else {
      const startDateParsed = parseDate(startDateValue);
      const endDateParsed = parseDate(endDateValue);

      if (endDateParsed < startDateParsed) {
        errorDate.textContent = 'La fecha final debe ser posterior a la inicial.';
      } else {
        filtersList.set(`date:${startDateValue}-${endDateValue}`, {
          type: 'date',
          label: `${startDateValue} - ${endDateValue}`,
          startDateParsed,
          endDateParsed
        });
        inputStartDate.value = '';
        inputEndDate.value = '';
        errorDate.textContent = '';
        anyFilterAdded = true;
      }
    }
    

    if (anyFilterAdded) {
      renderFilters();
      applyActiveFilters();
      closeFilterMenu();
    }
  });

  function parseDate(dateEntry) {
    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateEntry);
    if (!match) return null;
    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    const date = new Date(year, month - 1, day);

    const isValidDate = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    if (!isValidDate) return;

    return date;
  }


  if (btnClearAllFilters) {
    btnClearAllFilters.addEventListener('click', () => {
      filtersList.clear();
      
      renderFilters();
      applyActiveFilters();
    });
  }

  updateFiltersAppliedInfo();
  updateClearButtonVisibility();
}