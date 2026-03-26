function orderByManager(renderPage) {
  const orderSelector = document.querySelector('.renovations-filter__list__select');
  if (!orderSelector) return;

  function refactorImport(item) {
    return parseFloat(item['Importe'].replace(/\./g, '').replace(',', '.'));
  }

  function refactorDate(item) {
    return new Date(item['Fecha de contrato'].split('/').reverse().join('-'));
  }

  const orderFunctions = {
    'Mayor importe': (a, b) => refactorImport(b) - refactorImport(a),
    'Menor importe': (a, b) => refactorImport(a) - refactorImport(b),
    'Más recientes': (a, b) => refactorDate(b) - refactorDate(a),
    'Menos recientes': (a, b) => refactorDate(a) - refactorDate(b),
  };

  function applyOrder(data) {
    const orderOption = orderSelector.value;
    const orderApplied = orderFunctions[orderOption];
    
    if (orderApplied) {
      return [...data].sort(orderApplied);
    }
  }

  orderSelector.addEventListener('change', function () {
    const filteredData = allRenovationsData.data.length > 0 
      ? allRenovationsData.data 
      : allRenovationsData.originalData;   

    allRenovationsData.data = applyOrder(filteredData);
    renderPage(1);
  });

  return applyOrder;    //--> A show-renovations.js
}