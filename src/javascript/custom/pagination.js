function renderPagination(renovationsPerPage) {
  const container = document.querySelector('.renovations-json-list');
  if (!container) return;

  container.innerHTML = renovationsPerPage.map(renovation => {
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
}



function paginationManager() {
  const select = document.querySelector('.pagination__rows__option');
  if (!select) return;

  let currentPage = 1;
  select.value = '10';    //--> Para 10 filas por defecto

  const btnSkipLeft = document.querySelector('.pagination__page-option__skip-left');
  const btnLeft = document.querySelector('.pagination__page-option__left');
  const btnRight = document.querySelector('.pagination__page-option__right');
  const btnSkipRight = document.querySelector('.pagination__page-option__skip-right');



  function updatePageText() {
    const pageText = document.querySelector('.pagination__page__text2');
    if (pageText) pageText.textContent = `${currentPage} de ${getTotalPages()}`;
  }

  function defaultRows() {
    return parseInt(select.value);
  }

  function getTotalPages() {
    const totalRenovations = allRenovationsData.data.length;
    const currentRows = defaultRows();
    return currentRows ? Math.ceil(totalRenovations / currentRows) : 1;     //--> .ceil  para minimo 1 pagina minimo.
  }



  function renovationsPerPage(rowsPerPage, page) {
    const pageIndex = page - 1;
    const start = pageIndex * rowsPerPage;    
    const end = start + rowsPerPage;
    return allRenovationsData.data.slice(start, end);
  }



  function renderPage(page) {
    const totalPages = getTotalPages();
    const currentRows = defaultRows();

    const lastPage = Math.min(page, totalPages);
    currentPage = Math.max(1, lastPage);

    const currentRenovations = renovationsPerPage(currentRows, currentPage);
    renderPagination(currentRenovations);

    updatePageText();
    styleNavigationButtons();
  }



  function selectTotalRows() {
    select.addEventListener('change', function () {
      renderPage(1);
    });
  }



  function styleNavigationButtons() {
    const firstPage = currentPage <= 1;
    const lastPage = currentPage >= getTotalPages();

    btnSkipLeft.classList.toggle('pagination__page-option__skip-left--disabled', firstPage);
    btnSkipLeft.classList.toggle('pagination__page-option__skip-left--able', !firstPage);

    btnLeft.classList.toggle('pagination__page-option__left--disabled', firstPage);
    btnLeft.classList.toggle('pagination__page-option__left--able', !firstPage);

    btnRight.classList.toggle('pagination__page-option__right--disabled', lastPage);
    btnRight.classList.toggle('pagination__page-option__right--able', !lastPage);

    btnSkipRight.classList.toggle('pagination__page-option__skip-right--disabled', lastPage);
    btnSkipRight.classList.toggle('pagination__page-option__skip-right--able', !lastPage);
  }

  function navigationButtonsManager() {
    if (btnSkipLeft) btnSkipLeft.addEventListener('click', () => renderPage(1));
    if (btnLeft) btnLeft.addEventListener('click', () => renderPage(currentPage - 1));
    if (btnRight) btnRight.addEventListener('click', () => renderPage(currentPage + 1));
    if (btnSkipRight) btnSkipRight.addEventListener('click', () => renderPage(getTotalPages()));
  }



  selectTotalRows();
  navigationButtonsManager();

  if (allRenovationsData.data.length > 0) {
    renderPage(1);
  }
}