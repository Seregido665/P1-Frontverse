function renderPagination(renovations) {
  const container = document.querySelector('.renovations-json-list');
  if (!container) return;

  container.innerHTML = renovations.map(renovation => {
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


function updatePaginationControls(currentPage, totalPages) {
  const pageText = document.querySelector('.pagination__page__text2');
  if (pageText) pageText.textContent = `${currentPage} de ${totalPages}`;

  const onFirst = currentPage <= 1;
  const onLast = currentPage >= totalPages;

  const btnSkipLeft = document.querySelector('.pagination__page-option__skip-left');
  const btnLeft = document.querySelector('.pagination__page-option__left');
  const btnRight = document.querySelector('.pagination__page-option__right');
  const btnSkipRight = document.querySelector('.pagination__page-option__skip-right');

  if (btnSkipLeft) { btnSkipLeft.classList.toggle('pagination__page-option__skip-left--disabled', onFirst);   
                     btnSkipLeft.classList.toggle('pagination__page-option__skip-left--able', !onFirst); }
  if (btnLeft) { btnLeft.classList.toggle('pagination__page-option__left--disabled', onFirst);             
                 btnLeft.classList.toggle('pagination__page-option__left--able', !onFirst); }
  if (btnRight) { btnRight.classList.toggle('pagination__page-option__right--disabled', onLast);           
                  btnRight.classList.toggle('pagination__page-option__right--able', !onLast); }
  if (btnSkipRight) { btnSkipRight.classList.toggle('pagination__page-option__skip-right--disabled', onLast);   
                      btnSkipRight.classList.toggle('pagination__page-option__skip-right--able', !onLast); }
}


function paginationManager() {
  const select = document.querySelector('.pagination__rows__option');
  if (!select) return;

  select.value = '10';

  const btnSkipLeft = document.querySelector('.pagination__page-option__skip-left');
  const btnLeft = document.querySelector('.pagination__page-option__left');
  const btnRight = document.querySelector('.pagination__page-option__right');
  const btnSkipRight = document.querySelector('.pagination__page-option__skip-right');

  if (btnSkipLeft) btnSkipLeft.addEventListener('click', () => { appState.page = 1; fetchRenovations(); });
  if (btnLeft) btnLeft.addEventListener('click', () => { appState.page = Math.max(1, appState.page - 1); fetchRenovations(); });
  if (btnRight) btnRight.addEventListener('click', () => { appState.page++; fetchRenovations(); });
  if (btnSkipRight) btnSkipRight.addEventListener('click', () => { appState.page = appState.totalPages; fetchRenovations(); });

  select.addEventListener('change', function () {
    appState.size = parseInt(select.value);
    appState.page = 1;
    fetchRenovations();
  });
}
