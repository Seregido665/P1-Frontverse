function renovationsPerPage() {
	const select = document.querySelector('.pagination__rows__option');
	if (!select) return;
	
	let currentPage = 1;    //--> VARIABLE DE LA PAGINA ACTUAL (SIEMPRE EMPIEZA POR 1)
	select.value = '10';    //--> MUESTRA 10 FILAS POR DEFECTO ---

	// --- FUNCION PARA CALCULAR EL TOTAL DE PAGINAS SEGUN LA CANTIDAD DE FILAS POR PAGINA ---
	function getTotalPages() {
		const total = Array.isArray(window._RENOVATIONS_DATA) ? window._RENOVATIONS_DATA.length : 0;    //--> COMPRUEBA QUE ES UN ARRAY Y QUE LONGITUD TIENE
		const rows = parseInt(select.value, 10);
		return rows > 0 ? Math.ceil(total / rows) : 1;      //--> PARA CALCULAR TOTAL DE PAGINAS
                                                            // --> ceil ES PARA REDONDEAR HACIA ARRIBA
	}

	// --- FUNCION PARA RENDERIZAR LA PAGINA ACTUAL ---
	function renderPage(page) {
		const rows = parseInt(select.value, 10);
		const totalPages = getTotalPages();
		currentPage = Math.max(1, Math.min(page, totalPages));      //--> ASEGURA QUE LA PAGINA NO SEA MENOR A 1 NI MAYOR AL TOTAL DE PAGINAS
		window.renderRenovationsWithPagination(rows, currentPage);  //--> EL RENDERIZADO DE LA PAGINA SE HACE EN showRenovations.js
		
        // -- TEXTO DE PAGINA ACTUAL / TOTAL PAGINAS --
		const pageText = document.querySelector('.pagination__page__text2');
		if (pageText) pageText.textContent = `${currentPage} de ${totalPages}`;
	}

	// --- AL CAMBIAR LAS FILAS POR PAGINA, LA PAGINA RENDERIZADA SE ACTUALIZA A LA 1 ---
	select.addEventListener('change', function () {
		renderPage(1);
	});

	// --- BOTONES DE LA PAGINACION ---
	const btnSkipLeft = document.querySelector('.pagination__page-option__skip-left');
	const btnLeft = document.querySelector('.pagination__page-option__left');
	const btnRight = document.querySelector('.pagination__page-option__right');
	const btnSkipRight = document.querySelector('.pagination__page-option__skip-right');

	if (btnSkipLeft) btnSkipLeft.addEventListener('click', () => renderPage(1));
	if (btnLeft) btnLeft.addEventListener('click', () => renderPage(currentPage - 1));
	if (btnRight) btnRight.addEventListener('click', () => renderPage(currentPage + 1));
	if (btnSkipRight) btnSkipRight.addEventListener('click', () => renderPage(getTotalPages()));   //--> SALTA A LA ULTIMA PAGINA, CALCULADA POR getTotalPPages()

	// --- PARA INICIALIZAR SOLO SI HAY DATOS ---
	if (Array.isArray(window._RENOVATIONS_DATA) && window._RENOVATIONS_DATA.length > 0) {
		renderPage(1);
	}
}