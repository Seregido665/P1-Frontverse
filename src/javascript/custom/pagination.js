let renderPage;  //--> Acceso global para order-by.js


function paginationManager() {
  const select = document.querySelector('.pagination__rows__option');
  if (!select) return;

  let currentPage = 1; 
  select.value = '10';    //--> 10 filas por defecto



  function selectTotalRows() {
    select.addEventListener('change', function () {
      renderPage(1);  
    });
  }



  function updatePageText() {
    const pageText = document.querySelector('.pagination__page__text2');
    if (pageText) pageText.textContent = `${currentPage} de ${getTotalPages()}`;
  }

  function defaultRows() {
    return parseInt(select.value);
  }

  function getTotalPages() {
    const total = allRenovationsData.data.length;
    const rows = defaultRows();
    return rows > 0 ? Math.ceil(total / rows) : 1;
  }



  function getRenovationsPerPage(rowsPerPage, page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return allRenovationsData.data.slice(start, end);
  }

  renderPage = function (page) {
    const totalPages = getTotalPages();
    currentPage = Math.max(1, Math.min(page, totalPages)); 

    renderPagination(getRenovationsPerPage(defaultRows(), currentPage));
    updatePageText();
  }

  function navigationButtonsManager() {
    const btnSkipLeft = document.querySelector('.pagination__page-option__skip-left');
    const btnLeft = document.querySelector('.pagination__page-option__left');
    const btnRight = document.querySelector('.pagination__page-option__right');
    const btnSkipRight = document.querySelector('.pagination__page-option__skip-right');

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