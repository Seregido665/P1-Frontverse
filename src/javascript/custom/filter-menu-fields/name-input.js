function nameInputManager(filtersList) {
  const inputNameRisk = document.querySelector('.filter-menu__body__input1');
  const errorRisk = document.querySelector('.filter-menu__body__error-name-risk');

  if (!inputNameRisk || !errorRisk) return;

  function nameRiskFilter() {
    const riskSearched = inputNameRisk.value.trim();
    if (!riskSearched) {
      errorRisk.textContent = '';
      return;
    }

    const riskSearchedLower = riskSearched.toLowerCase();
    const coincidence = allRenovationsData.originalData.some(renovation =>      // .some devuelve true si al menos un elemento del array coincide.
      (renovation['Nombre del riesgo'] || '').toLowerCase() === riskSearchedLower
    );

    if (!coincidence) {
      errorRisk.textContent = 'No hay pólizas con ese nombre.';
      return;
    }

    filtersList.set(`risk:${riskSearchedLower}`, {
      type: 'risk',
      label: riskSearched,
      value: riskSearchedLower
    });
    inputNameRisk.value = '';
    errorRisk.textContent = '';
    return true;
  }

  inputNameRisk.addEventListener('input', () => errorRisk.textContent = '');
  return { nameRiskFilter };
}
