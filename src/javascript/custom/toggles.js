function navbarMenusToggles() {
  const header = document.querySelector('.navbar');
  if(!header) return;
  
  const btnUser = header.querySelector('.right-nav-buttons__user-button');
  const userMenu = header.querySelector('.user-menu-window');
  const btnGlobe = header.querySelector('.right-nav-buttons__globe-button');
  const globeMenu = header.querySelector('.globe-menu-window');
  const btnBurguer = header.querySelector('.right-nav-buttons__burguer-button');
  const burguerMenu = header.querySelector('.burguer-menu-window');
  const btnAllFilters = document.querySelector('.renovations-filter__all-filters');
  const filterMenu = document.querySelector('.filter-menu');
  const btnCloseFilter = document.querySelector('.filter-menu .close');
  const tabletQuery = window.matchMedia('(max-width: 48rem)');
  const navRight = header.querySelector('.right-nav-buttons');
  const orderSelection = document.querySelector('.renovations-filter__list__select');

  const btnGlobeInBurguer = header.querySelector('.burguer-menu-window > .burguer-menu-window__globe-button');
  const globeMenuInBurguer = header.querySelector('.burguer-menu-window .globe-menu-window');

  if (filterMenu) filterMenu.style.display = 'none';

  function toggleDisplay(menu) {
    if (!menu) return false;
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none'; 
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
      navRight.classList.toggle('mobile-user-open', open);                 
      blockScroll();
    }
  };
  togglesCore(btnUser, userMenu, userToggle);

  // -- Idioma --
  togglesCore(btnGlobe, globeMenu);
  // (Idioma en Menú Burguer) 
  const globeBurgerToggle = function (open) {
    if (btnGlobeInBurguer) {
      btnGlobeInBurguer.classList.toggle('globe-burger-open', open);         
    }
  };
  togglesCore(btnGlobeInBurguer, globeMenuInBurguer, globeBurgerToggle);

  // -- Menú Burguer --
  const burguerToggle = function (open) {
    if (tabletQuery.matches) {
      navRight.classList.toggle('mobile-burguer-open', open);                  
      blockScroll();
    }
  };
  togglesCore(btnBurguer, burguerMenu, burguerToggle);


  if (filterMenu) {
    filterMenu.style.display = '';
    
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

    document.addEventListener('click', function (e) {
      if (!filterMenu.contains(e.target) && !btnAllFilters.contains(e.target)) {
        if (filterMenu.classList.contains('is-open')) {
          filterMenu.classList.remove('is-open');
          blockScroll();

          if (orderSelection) orderSelection.blur();
          
          e.stopPropagation();
        }
      }
    }, true);
  }
}


document.addEventListener('DOMContentLoaded', function () {
  navbarMenusToggles();
});