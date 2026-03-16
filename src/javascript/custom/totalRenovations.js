window.updateTotalRenovations = function () {
    const totalRenovationsHeaderSpan = document.querySelector('.renovations-header__number-policies__number');
    if (totalRenovationsHeaderSpan && Array.isArray(window._RENOVATIONS_DATA)) {
        totalRenovationsHeaderSpan.textContent = window._RENOVATIONS_DATA.length;
    }

    const totalRenovationsFilterSpan = document.querySelector('.renovations-filter__all-policies__text-results');
    if (totalRenovationsFilterSpan && Array.isArray(window._RENOVATIONS_DATA)) {
        totalRenovationsFilterSpan.textContent = window._RENOVATIONS_DATA.length + ' pólizas';
    }
};

