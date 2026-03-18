// ─────────────────────────────────────────────
//  PAGINACIÓN DE RENOVACIONES
//  Depende de: RenovationsStore y renderRenovationsWithPagination (showRenovations.js)
// ─────────────────────────────────────────────

function renovationsPerPage() {
  const select = document.querySelector('.pagination__rows__option');
  if (!select) return;

  let currentPage = 1;  // La paginación siempre arranca en la página 1
  select.value = '10';  // Valor por defecto: 10 filas por página


  // ─── HELPERS ────────────────────────────────

  function getRowsPerPage() {
    return parseInt(select.value);
  }

  function getTotalPages() {
    const total = RenovationsStore.data.length;
    const rows  = getRowsPerPage();
    return rows > 0 ? Math.ceil(total / rows) : 1;
  }


  // ─── RENDERIZADO ────────────────────────────

  function renderPage(page) {
    const totalPages = getTotalPages();
    currentPage = Math.max(1, Math.min(page, totalPages));  // Evita salirse del rango

    renderRenovationsWithPagination(getRowsPerPage(), currentPage);
    updatePageText();
  }


  // ─── TEXTO "X de Y" ─────────────────────────

  function updatePageText() {
    const pageText = document.querySelector('.pagination__page__text2');
    if (pageText) pageText.textContent = `${currentPage} de ${getTotalPages()}`;
  }


  // ─── EVENTOS ────────────────────────────────

  function bindSelectChange() {
    select.addEventListener('change', function () {
      renderPage(1);  // Al cambiar filas por página, volvemos a la página 1
    });
  }

  function bindNavigationButtons() {
    const btnSkipLeft  = document.querySelector('.pagination__page-option__skip-left');
    const btnLeft      = document.querySelector('.pagination__page-option__left');
    const btnRight     = document.querySelector('.pagination__page-option__right');
    const btnSkipRight = document.querySelector('.pagination__page-option__skip-right');

    if (btnSkipLeft)  btnSkipLeft.addEventListener('click',  () => renderPage(1));
    if (btnLeft)      btnLeft.addEventListener('click',      () => renderPage(currentPage - 1));
    if (btnRight)     btnRight.addEventListener('click',     () => renderPage(currentPage + 1));
    if (btnSkipRight) btnSkipRight.addEventListener('click', () => renderPage(getTotalPages()));
  }


  // ─── INIT ────────────────────────────────────

  bindSelectChange();
  bindNavigationButtons();

  if (RenovationsStore.data.length > 0) {
    renderPage(1);
  }
}