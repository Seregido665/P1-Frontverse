function stateInputManager(filtersList) {
  const inputState = document.querySelector('.filter-menu__body__select2');

  if (!inputState) return;

  function policyStateFilter() {
    const selectedState = inputState.value.trim();
    if (!selectedState) return false;

    const selectedStateLower = selectedState.toLowerCase();

    filtersList.set(`state:${selectedStateLower}`, {
      type: 'state',
      label: selectedState,
      value: selectedStateLower
    });

    inputState.value = '';
    return true;
  }

  return { policyStateFilter };
}