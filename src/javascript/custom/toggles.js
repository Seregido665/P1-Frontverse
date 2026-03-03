document.addEventListener('DOMContentLoaded', function () {
  const btnUser = document.querySelector('.user-button');
  const userMenu = document.querySelector('.user-menu-window');
  const btnGlobe = document.querySelector('.globe-button');
  const globeMenu = document.querySelector('.globe-menu-window');
  const btnBurguer = document.querySelector('.burguer-button');
  const burguerMenu = document.querySelector('.burguer-menu-window');
  const mobileQuery = window.matchMedia('(max-width: 30rem)');      // PARA DETECTAR SI ESTAMOS EN TAMAÑO MÓVIL
  const navRight = document.querySelector('.right-nav-buttons');

  const btnGlobeInBurguer = document.querySelector('.burguer-menu-window > .burguer-menu-window__globe-button');
  const globeMenuInBurguer = document.querySelector('.burguer-menu-window .globe-menu-window');

  const setScrollableLanguageMenu = function (menuElement) {
    if (!menuElement) return;

    menuElement.style.overflowY = '';
    menuElement.style.maxHeight = '';

    const menuRect = menuElement.getBoundingClientRect();
    const availableHeight = window.innerHeight - menuRect.top - 16;

    if (availableHeight > 0) {
      menuElement.style.maxHeight = `${availableHeight}px`;
      menuElement.style.overflowY = 'auto';
    }
  };

  const resetScrollableLanguageMenu = function (menuElement) {
    if (!menuElement) return;
    menuElement.style.overflowY = '';
    menuElement.style.maxHeight = '';
  };

  
  // FUNCIONES PARA TRAER LAS CLASES DE nav-buttons-right.scss
  const menuUser = function (isOpen) {
    navRight.classList.toggle('mobile-user-open', isOpen);
  };
  const menuBurguer = function (isOpen) {
    navRight.classList.toggle('mobile-burguer-open', isOpen);
  };

  
  // --- FUNCION PARA BLOQUEAR EL SCROLL EN MOVIL CUANDO LOS MENUS DE user Y burguer ESTEN ACTIVOS ---
  const updateBodyScroll = function () {
    const mobileMenuOpen = navRight.classList.contains('mobile-user-open') || navRight.classList.contains('mobile-burguer-open');
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  };



  // ---------------------------------------------------------------------------
  // --- TOGGLEs ---
  // -- Mi Perfil --
  btnUser.addEventListener('click', function (e) {
    // - ESCRITORIO -
    if (userMenu.style.display === 'none') {
      userMenu.style.display = 'block';
    } else {
      userMenu.style.display = 'none';
    }
    // - MOVIL -
    if (mobileQuery.matches) {
      menuUser(userMenu.style.display === 'block');
      updateBodyScroll();       // FUNCION DE BLOQUEO DEL SCROLL
    }
  });


  // -- Idioma --
  btnGlobe.addEventListener('click', function (e) {
    if (globeMenu.style.display === 'none') {
      globeMenu.style.display = 'block';
      setScrollableLanguageMenu(globeMenu);
    } else {
      globeMenu.style.display = 'none';
      resetScrollableLanguageMenu(globeMenu);
    }
  });
  // -- Idioma (en Menú Burguer) --
  btnGlobeInBurguer.addEventListener('click', function (e) {
    if (globeMenuInBurguer.style.display === 'none') {
      globeMenuInBurguer.style.display = 'block';
      setScrollableLanguageMenu(globeMenuInBurguer);
    } else {
      globeMenuInBurguer.style.display = 'none';
      resetScrollableLanguageMenu(globeMenuInBurguer);
    }
  });


  // -- Menú Burguer --
  btnBurguer.addEventListener('click', function (e) {
    // - ESCRITORIO -
    if (burguerMenu.style.display === 'none') {
      burguerMenu.style.display = 'block';
    } else {
      burguerMenu.style.display = 'none';
    }
    // - MOVIL -
    if (mobileQuery.matches) {
      menuBurguer(burguerMenu.style.display === 'block');
      updateBodyScroll();       // FUNCION DE BLOQUEO DEL SCROLL
    }
  });
  //----

  mobileQuery.addEventListener('change', function () {
    updateBodyScroll();
    if (globeMenu.style.display === 'block') {
      setScrollableLanguageMenu(globeMenu);
    }
    if (globeMenuInBurguer && globeMenuInBurguer.style.display === 'block') {
      setScrollableLanguageMenu(globeMenuInBurguer);
    }
  });

  window.addEventListener('resize', function () {
    if (globeMenu.style.display === 'block') {
      setScrollableLanguageMenu(globeMenu);
    }
    if (globeMenuInBurguer && globeMenuInBurguer.style.display === 'block') {
      setScrollableLanguageMenu(globeMenuInBurguer);
    }
  });
});