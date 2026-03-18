function navbarMenusToggles() {
  const btnUser = document.querySelector('.right-nav-buttons__user-button');
  const userMenu = document.querySelector('.user-menu-window');
  const btnGlobe = document.querySelector('.right-nav-buttons__globe-button');
  const globeMenu = document.querySelector('.globe-menu-window');
  const btnBurguer = document.querySelector('.right-nav-buttons__burguer-button');
  const burguerMenu = document.querySelector('.burguer-menu-window');
  const btnAllFilters = document.querySelector('.renovations-filter__all-filters');
  const filterMenu = document.querySelector('.filter-menu');
  const btnCloseFilter = document.querySelector('.filter-menu .close');
  const tabletQuery = window.matchMedia('(max-width: 48rem)');
  const navRight = document.querySelector('.right-nav-buttons');

  const btnGlobeInBurguer = document.querySelector('.burguer-menu-window > .burguer-menu-window__globe-button');
  const globeMenuInBurguer = document.querySelector('.burguer-menu-window .globe-menu-window');


  // --- MOSTRAR / OCULTAR MENÚS ---
  function toggleDisplay(menu) {
    if (!menu) return false;
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';  
    return menu.style.display === 'block';
  }


  // --- ACTUALIZAR SCROLL EN VERSION MÓVIL ---
  function blockScroll() {
    const mobileMenuOpen = navRight
      ? navRight.classList.contains('mobile-user-open') || navRight.classList.contains('mobile-burguer-open') : false;
    const filterMenuOpen = filterMenu ? filterMenu.style.display === 'block' : false;
    document.body.style.overflow = mobileMenuOpen || filterMenuOpen ? 'hidden' : '';
  }


  // ----------------------------- TOGGLES -----------------------------
  // --- AÑADE UN LISTENER A LOS MENUS DEL NAVBAR ---
  function togglesCore(button, menu, onToggle) {
    if (!button || !menu) return;
    button.addEventListener('click', function () {
      const open = toggleDisplay(menu);
      if (onToggle) onToggle(open);
    });
  }

  // -- Mi Perfil --
  togglesCore(btnUser, userMenu, function (open) {
    if (tabletQuery.matches) {
      navRight.classList.toggle('mobile-user-open', open);
      blockScroll();
    }
  });

  // -- Idioma --
  togglesCore(btnGlobe, globeMenu);
  // (en Menú Burguer) 
  togglesCore(btnGlobeInBurguer, globeMenuInBurguer, function (open) {
    if (btnGlobeInBurguer) {
      btnGlobeInBurguer.classList.toggle('is-open', open);
    }
  });

  // -- Menú Burguer --
  togglesCore(btnBurguer, burguerMenu, function (open) {
    if (tabletQuery.matches) {
      navRight.classList.toggle('mobile-burguer-open', open);
      blockScroll();
    }
  });



  // ----- MENU DE FILTROS -----
  if (filterMenu) {
    btnAllFilters.addEventListener('click', function () {
      toggleDisplay(filterMenu);
      blockScroll();
    });
    if (btnCloseFilter) {
      btnCloseFilter.addEventListener('click', function () {
        filterMenu.style.display = 'none';
        blockScroll();
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  navbarMenusToggles();
});