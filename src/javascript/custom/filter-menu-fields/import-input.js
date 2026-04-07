function importInputManager(filtersList) {
	const inputImport = document.querySelector('.filter-menu__body__input4');
	const errorImport = document.querySelector('.filter-menu__body__error-import');

	if (!inputImport || !errorImport) return;

	function parseImport(importStr) {
		const importSearched = String(importStr || '')
			.replace(/[€\s]/g, '') // Elimina € y espacios
			.trim();
		
		if (importSearched.includes(',')) {
			// "1.234,56 €" -> "1234.56"
			return Number(importSearched.replace(/\./g, '').replace(',', '.'));
		} else {
			// "817.10" -> mantener como está
			return Number(importSearched);
		}
	}

	function importFilter() {
		const importValue = inputImport.value.trim();
		if (!importValue) {
			errorImport.textContent = '';
			return;
		}

		const normalizedImport = parseImport(importValue);
		const coincidence = allRenovationsData.originalData.some(renovation => {
			const renovationImport = parseImport(renovation['Importe']);
			return renovationImport && Math.abs(renovationImport - normalizedImport) < 0.005;
		});

		if (!coincidence) {
			errorImport.textContent = 'No hay renovaciones con ese importe.';
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