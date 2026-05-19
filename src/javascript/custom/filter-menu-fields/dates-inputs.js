function datesInputsManager(filtersList) {
  const inputStartDate = document.querySelector('.filter-menu__body__input2');
  const inputEndDate = document.querySelector('.filter-menu__body__input3');
  const errorDate = document.querySelector('.filter-menu__body__error-date');

  if (!inputStartDate || !inputEndDate || !errorDate) return;

  function clearDateError() { errorDate.textContent = ''; }

  function isValidDateFormat(value) {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(value.trim());
  }

  function toDate(str) {
    const [d, m, y] = str.trim().split('/');
    return new Date(+y, +m - 1, +d);
  }

  function dateRangeFilter() {
    const startDateValue = inputStartDate.value.trim();
    const endDateValue = inputEndDate.value.trim();

    if (!startDateValue && !endDateValue) return;
    if (!startDateValue) { errorDate.textContent = 'Falta la fecha de inicio.'; return; }
    if (!endDateValue)   { errorDate.textContent = 'Falta la fecha final.'; return; }
    if (!isValidDateFormat(startDateValue) || !isValidDateFormat(endDateValue)) {
      errorDate.textContent = 'Formato correcto: dd/mm/yyyy';
      return;
    }
    if (toDate(endDateValue) < toDate(startDateValue)) {
      errorDate.textContent = 'La fecha final debe ser posterior a la inicial.';
      return;
    }

    filtersList.set(`date:${startDateValue}-${endDateValue}`, {
      type: 'date',
      label: `${startDateValue} - ${endDateValue}`,
      startDateStr: startDateValue,
      endDateStr:   endDateValue
    });

    inputStartDate.value = '';
    inputEndDate.value = '';
    return true;
  }

  inputStartDate.addEventListener('input', clearDateError);
  inputEndDate.addEventListener('input', clearDateError);
  return { dateRangeFilter };
}
