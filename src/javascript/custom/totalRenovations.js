window.updateTotalRenovations = function () {
    // --- TOTAL DE RENOVACIONES DEL HEADER ---
    const totalRenovationsHeaderSpan = document.querySelector('.renovations-header__number-policies__number');
    totalRenovationsHeaderSpan.textContent = window._RENOVATIONS_DATA.length;
    
    // --- TOTAL DE RENOVACIONES DE LOS FILTROS ---
    const totalRenovationsFilterSpan = document.querySelector('.renovations-filter__all-policies__text-results');
    totalRenovationsFilterSpan.textContent = window._RENOVATIONS_DATA.length + ' pólizas';
};

