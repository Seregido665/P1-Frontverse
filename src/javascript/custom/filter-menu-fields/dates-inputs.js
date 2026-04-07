function datesInputsManager(filtersList, parseDate) {
	const inputStartDate = document.querySelector('.filter-menu__body__input2');
	const inputEndDate = document.querySelector('.filter-menu__body__input3');
	const errorDate = document.querySelector('.filter-menu__body__error-date');

	if (!inputStartDate || !inputEndDate || !errorDate) return;

	function clearDateError() {
		errorDate.textContent = '';
	}

	function isValidDateFormat(dateValue) {
		const correctFormat = /^\d{2}\/\d{2}\/\d{4}$/;
		return correctFormat.test(dateValue.trim());
	}

	function dateRangeFilter() {
		const startDateValue = inputStartDate.value.trim();
		const endDateValue = inputEndDate.value.trim();

		if (!startDateValue && !endDateValue) {
			return;
		}
		if (!startDateValue) {
			errorDate.textContent = 'Falta la fecha de inicio.';
			return;
		}
		if (!endDateValue) {
			errorDate.textContent = 'Falta la fecha final.';
			return;
		}
		if (!isValidDateFormat(startDateValue) || !isValidDateFormat(endDateValue)) {
			errorDate.textContent = 'Formato correcto: dd/mm/yyyy';
			return;
		}

		const startDateParsed = parseDate(startDateValue);
		const endDateParsed = parseDate(endDateValue);
		if (endDateParsed < startDateParsed) {
			errorDate.textContent = 'La fecha final debe ser posterior a la inicial.';
			return;
		}

		filtersList.set(`date:${startDateValue}-${endDateValue}`, {
			type: 'date',
			label: `${startDateValue} - ${endDateValue}`,
			startDateParsed,
			endDateParsed
		});

		inputStartDate.value = '';
		inputEndDate.value = '';
		return true;
	}

	inputStartDate.addEventListener('input', clearDateError);
	inputEndDate.addEventListener('input', clearDateError);

	return { dateRangeFilter };
}
