function orderByManager() {
  const select = document.querySelector('.renovations-filter__list__select');
  if (!select) return;



  function refactorImport(item) {
    return parseFloat(item['Importe'].replace(/\./g, '').replace(',', '.'));
  }
  function refactorDate(item) {
    return new Date(item['Fecha de contrato'].split('/').reverse().join('-'));
  }

  const orderBy = {           //--> Se ordena luego en applyOrder con .sort(orderBy[value])
    'Mayor importe': function(renovation, nextRenovation) {
      return refactorImport(nextRenovation) - refactorImport(renovation); 
    },
    'Menor importe': function(renovation, nextRenovation) {
      return refactorImport(renovation) - refactorImport(nextRenovation); 
    },
    'Más recientes': function(renovation, nextRenovation) {
      return refactorDate(nextRenovation) - refactorDate(renovation); 
    },
    'Menos recientes': function(renovation, nextRenovation) {
      return refactorDate(renovation) - refactorDate(nextRenovation); 
    },
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