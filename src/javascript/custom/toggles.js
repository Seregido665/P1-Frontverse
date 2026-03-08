function toggles() {
  const btnUser = document.querySelector('.user-button');
  const userMenu = document.querySelector('.user-menu-window');
  const btnGlobe = document.querySelector('.globe-button');
  const globeMenu = document.querySelector('.globe-menu-window');
  const btnBurguer = document.querySelector('.burguer-button');
  const burguerMenu = document.querySelector('.burguer-menu-window');
  const btnAllFilters = document.querySelector('.renovations-filter__all-filters');
  const filterMenu = document.querySelector('.filter-menu');
  const btnCloseFilter = document.querySelector('.filter-menu .close');
  const mobileQuery = window.matchMedia('(max-width: 30rem)');      // PARA DETECTAR SI ESTAMOS EN TAMAÑO MÓVIL
  const navRight = document.querySelector('.right-nav-buttons');

  const btnGlobeInBurguer = document.querySelector('.burguer-menu-window > .burguer-menu-window__globe-button');
  const globeMenuInBurguer = document.querySelector('.burguer-menu-window .globe-menu-window');

  
  // Cambia entre mostrar/ocultar y devuelve si queda abierto.
  const toggleDisplay = function (menu) {
    if (!menu) {
      return false;
    }

    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    return menu.style.display === 'block';
  };

  // --- FUNCION PARA BLOQUEAR EL SCROLL EN MOVIL CUANDO LOS MENUS DE user Y burguer ESTEN ACTIVOS ---
  const updateBodyScroll = function () {
    const mobileMenuOpen = navRight
      ? navRight.classList.contains('mobile-user-open') || navRight.classList.contains('mobile-burguer-open')
      : false;
    const filterMenuOpen = filterMenu ? filterMenu.style.display === 'block' : false;
    document.body.style.overflow = mobileMenuOpen || filterMenuOpen ? 'hidden' : '';
  };

  // Asocia un boton a un menu y permite ejecutar logica extra al abrir/cerrar.
  const bindToggle = function (button, menu, onToggle) {
    if (!button || !menu) {
      return;
    }

    button.addEventListener('click', function () {
      const isOpen = toggleDisplay(menu);
      if (onToggle) {
        onToggle(isOpen);
      }
    });
  };



  // ---------------------------------------------------------------------------
  // --- TOGGLEs ---
  // -- Mi Perfil --
  bindToggle(btnUser, userMenu, function (isOpen) {
    if (mobileQuery.matches && navRight) {
      navRight.classList.toggle('mobile-user-open', isOpen);
      updateBodyScroll();
    }
  });

  // -- Idioma --
  bindToggle(btnGlobe, globeMenu);

  // -- Idioma (en Menú Burguer) --
  bindToggle(btnGlobeInBurguer, globeMenuInBurguer);

  // -- Menú Burguer --
  bindToggle(btnBurguer, burguerMenu, function (isOpen) {
    if (mobileQuery.matches && navRight) {
      navRight.classList.toggle('mobile-burguer-open', isOpen);
      updateBodyScroll();
    }
  });

  // -- Filtros (Renovations) --
  if (btnAllFilters && filterMenu) {
    btnAllFilters.addEventListener('click', function () {
      toggleDisplay(filterMenu);
      updateBodyScroll();
    });
  }

  // -- BLOQUEO DEL SCROLL CUANDO EL MENU DE FILTROS ESTE ABIERTO --
  if (btnCloseFilter && filterMenu) {
    btnCloseFilter.addEventListener('click', function (e) {
      filterMenu.style.display = 'none';
      updateBodyScroll();
    });
  }

  mobileQuery.addEventListener('change', function () {
    updateBodyScroll();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  toggles();
});
