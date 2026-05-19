function importInputManager(filtersList) {
  const inputImport = document.querySelector('.filter-menu__body__input4');
  const errorImport = document.querySelector('.filter-menu__body__error-import');

  if (!inputImport || !errorImport) return;

  function parseImport(importStr) {
    const cleaned = String(importStr || '').replace(/[€\s]/g, '').trim();
    if (cleaned.includes(',')) {
      return Number(cleaned.replace(/\./g, '').replace(',', '.'));
    }
    return Number(cleaned);
  }

  function importFilter() {
    const importValue = inputImport.value.trim();
    if (!importValue) {
      errorImport.textContent = '';
      return;
    }

    const normalizedImport = parseImport(importValue);
    if (isNaN(normalizedImport) || normalizedImport <= 0) {
      errorImport.textContent = 'Introduce un importe válido.';
      return;
    }

    filtersList.set(`import:${normalizedImport}`, {
      type: 'import',
      label: `Importe: ${importValue}`,
      value: normalizedImport
    });

    inputImport.value = '';
    errorImport.textContent = '';
    return true;
  }

  inputImport.addEventListener('input', () => errorImport.textContent = '');
  return { importFilter };
}
