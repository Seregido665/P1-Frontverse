document.addEventListener('DOMContentLoaded', function () {
    const select = document.querySelector('.renovations-filter__list__select');
    if (!select) return;

    // --- PARA CONVERTIR LOS VALORES DE LOS IMPORTES DE string A numero ---
    const parseImporte = (item) =>
        parseFloat(item['Importe']
            .replace(/\./g, '')     //--> ELIMINA LOS PUNTOS DE LOS MILES
            .replace(',', '.'));    //--> REEMPLAZA LA COMA DECIMAL POR UN PUNTO PARA EL parseFloat
    // --- PARA CONVERTIR LAS FECHAS A FORMATO Date Y PODER COMPARARLAS---
    const parseFecha = (item) =>
        new Date(item['Fecha de contrato']
            .split('/')             //--> SEPARA LAS FECHAS EN DIA, MES Y AÑO
            .reverse()              //--> INVIERTE EL ORDEN
            .join('-'));            //--> UNE LOS VALORES CON GUIONES PARA new Date

    const orderBy = {
        'Mayor importe': (a, b) => parseImporte(b) - parseImporte(a),
        'Menor importe': (a, b) => parseImporte(a) - parseImporte(b),
        'Más recientes': (a, b) => parseFecha(b) - parseFecha(a),
        'Menos recientes': (a, b) => parseFecha(a) - parseFecha(b),
    };

    // --- SELECTOR DE Ordenar por: ---
    select.addEventListener('change', function () {
        let data = [...window._RENOVATIONS_DATA];

        if (orderBy[select.value]) {
            data.sort(orderBy[select.value]);  //--> CON sort ORDENO LOS ELEMENTOS SEGUN LA FUNCION SELECCIONADA
        }
        window._RENOVATIONS_DATA_ORDERED = data;
        
        // --- APLICA EL NUEVO ORDEN SELECCIONADO SI LA FUNCION ESTA DISPONIBLE ---
        if (typeof window.renderRenovationsWithPagination === 'function') {
            const rows = document.querySelector('.pagination__rows__option').value;
            window.renderRenovationsWithPagination(parseInt(rows, 10), 1);    //--> VUELVE A LA PAGINA 1 CON EL NUEVO ORDEN SELECCIONADO
        }
    });
});

window.getRenovationsOrderBy = function () {
    return window._RENOVATIONS_DATA_ORDERED || window._RENOVATIONS_DATA;
};
