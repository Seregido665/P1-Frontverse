function orderByManager() {
  const orderSelector = document.querySelector('.renovations-filter__list__select');
  if (!orderSelector) return;

  orderSelector.addEventListener('change', function () {
    appState.orderBy = orderSelector.value;
    appState.page = 1;
    fetchRenovations();
  });
}
