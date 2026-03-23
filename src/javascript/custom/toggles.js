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



  function toggleDisplay(menu) {
    if (!menu) return false;
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';  //--> Selecciona el estilo y lo cambia al contrario
    return menu.style.display === 'block';
  }

  function blockScroll() {
    const mobileMenuOpen = navRight
      ? navRight.classList.contains('mobile-user-open') || navRight.classList.contains('mobile-burguer-open') : false;
    const filterMenuOpen = filterMenu ? filterMenu.classList.contains('is-open') : false;
    document.body.style.overflow = mobileMenuOpen || filterMenuOpen ? 'hidden' : '';
  }



  // ----------------------------- TOGGLES -----------------------------
  function togglesCore(button, menu, toggle) {
    if (!button || !menu) return;
    button.addEventListener('click', function () {
      const open = toggleDisplay(menu);

      if (toggle) toggle(open);
    });
  }


    // -- Perfil --
  const userToggle = function (open) {
    if (tabletQuery.matches) {
      navRight.classList.toggle('mobile-user-open', open);                    //--> nav-buttons-right.scss
      blockScroll();
    }
  };
  togglesCore(btnUser, userMenu, userToggle);

    // -- Idioma --
  togglesCore(btnGlobe, globeMenu);
    // (Idioma en Menú Burguer) 
  const globeBurgerToggle = function (open) {
    if (btnGlobeInBurguer) {
      btnGlobeInBurguer.classList.toggle('globe-burger-open', open);          //--> burguer-menu-window.scss
    }
  };
  togglesCore(btnGlobeInBurguer, globeMenuInBurguer, globeBurgerToggle);

    // -- Menú Burguer --
  const burguerToggle = function (open) {
    if (tabletQuery.matches) {
      navRight.classList.toggle('mobile-burguer-open', open);                    //--> nav-buttons-right.scss
      blockScroll();
    }
  };
  togglesCore(btnBurguer, burguerMenu, burguerToggle);


  // --- Filtros ---
  if (filterMenu) {
    filterMenu.style.display = '';          //--> Resetea el display
    btnAllFilters.addEventListener('click', function () {
        filterMenu.classList.add('is-open');
        blockScroll();
    });
    if (btnCloseFilter) {
        btnCloseFilter.addEventListener('click', function () {
            filterMenu.classList.remove('is-open');
            blockScroll();
        });
    }
  }
}



document.addEventListener('DOMContentLoaded', function () {
  navbarMenusToggles();
});