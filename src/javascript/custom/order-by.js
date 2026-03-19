function orderByManager() {
  const select = document.querySelector('.renovations-filter__list__select');
  if (!select) return;



  function refactorImport(item) {
    return parseFloat(item['Importe'].replace(/\./g, '').replace(',', '.'));
  }
  function refactorDate(item) {
    return new Date(item['Fecha de contrato'].split('/').reverse().join('-'));
  }

  const orderBy = {
    'Mayor importe':   (a, b) => refactorImport(b) - refactorImport(a),
    'Menor importe':   (a, b) => refactorImport(a) - refactorImport(b),
    'Más recientes':   (a, b) => refactorDate(b)   - refactorDate(a),
    'Menos recientes': (a, b) => refactorDate(a)   - refactorDate(b),
  };



  function applyOrder(value) {
    const order = [...allRenovationsData.originalData];
    if (orderBy[value]) {
      order.sort(orderBy[value]);
    }
    allRenovationsData.data = order;  
  }

  select.addEventListener('change', function () {
    applyOrder(select.value);
    renderPage(1);
  });
}


document.addEventListener('DOMContentLoaded', function () {
  orderByManager();
});