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

    filtersList.set(`risk:${riskSearched.toLowerCase()}`, {
      type: 'risk',
      label: riskSearched,
      value: riskSearched.toLowerCase()
    });

    inputNameRisk.value = '';
    errorRisk.textContent = '';
    return true;
  }

  inputNameRisk.addEventListener('input', () => errorRisk.textContent = '');
  return { nameRiskFilter };
}
