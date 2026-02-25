document.addEventListener('DOMContentLoaded', function () {

  const btnUser = document.querySelector('.user-button');
  const userMenu = document.querySelector('.user-menu-window');
  const btnGlobe = document.querySelector('.globe-button');
  const globeMenu = document.querySelector('.globe-menu-window');
  const btnBurguer = document.querySelector('.burguer-button');
  const burguerMenu = document.querySelector('.burguer-menu-window');
  const navRight = document.querySelector('.right-nav-buttons');         
  const btnClose = document.querySelector('.right-nav-buttons .close');  
  const mobileQuery = window.matchMedia('(max-width: 30rem)');   // PARA DETECTAR SI ESTAMOS EN TAMAÑO MÓVIL
  // HACE REFERENCIA PRIMERO AL BOTON PADRE(.burguer-menu-window) PARA PODER APUNTAR 
  // LUEGO AL BOTON HIJO(.burguer-menu-window__globe-button).
  const btnGlobeInBurguer = document.querySelector('.burguer-menu-window > .burguer-menu-window__globe-button'); 
  // HACIENDO REFERENCIA PRIMERO AL PADRE SE PUEDE LUEGO BUSCAR A .globe-menu-window SIN IMPORTAR 
  // SU NIVEL DE ANIDACION DENTRO DE .burguer-menu-window
  const globeMenuInBurguer = document.querySelector('.burguer-menu-window .globe-menu-window');


  // PARA QUE LOS MENUS ESTEN OCULTOS POR DEFECTO
  userMenu.style.display = 'none';
  globeMenu.style.display = 'none';
  burguerMenu.style.display = 'none';
  globeMenuInBurguer.style.display = 'none';


  // FUNCIONES PARA TRAER LAS CLASES DE nav-buttons-right.scss
  const menuUser = function (isOpen) {
    navRight.classList.toggle('mobile-user-open', isOpen);
  };
  const menuBurguer = function (isOpen) {
    navRight.classList.toggle('mobile-burguer-open', isOpen);
  };
  

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
    }
  });

  // -- Idioma --
  btnGlobe.addEventListener('click', function (e) {
    if (globeMenu.style.display === 'none') {
      globeMenu.style.display = 'block';
    } else {
      globeMenu.style.display = 'none';
    }
  });
  // -- Idioma (en Menú Burguer) --
  btnGlobeInBurguer.addEventListener('click', function (e) {
    if (globeMenuInBurguer.style.display === 'none') {
      globeMenuInBurguer.style.display = 'block';
    } else {
      globeMenuInBurguer.style.display = 'none';
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
    }
  });


  // FUNCIONES PARA OCULTAR AL HACER click FUERA
  // Mi perfil
  document.addEventListener('click', function (e) {
    if (!mobileQuery.matches && !userMenu.contains(e.target) && !btnUser.contains(e.target)) {
      userMenu.style.display = 'none';
    }
  });
  // Idioma
  document.addEventListener('click', function (e) {
    if (!mobileQuery.matches && !globeMenu.contains(e.target) && !btnGlobe.contains(e.target)) {
      globeMenu.style.display = 'none';
    }
  });
  // Idioma (en Menú Burguer)
  document.addEventListener('click', function (e) {
    if (btnGlobeInBurguer && globeMenuInBurguer && !globeMenuInBurguer.contains(e.target) && !btnGlobeInBurguer.contains(e.target)) {
      globeMenuInBurguer.style.display = 'none';
    }
  });
  // Menú Burguer
  document.addEventListener('click', function (e) {
    if (!burguerMenu.contains(e.target) && !btnBurguer.contains(e.target)) {
      burguerMenu.style.display = 'none';
    }
  });


  // -- FUNCION PARA EL BOTON DE CERRAR --
  btnClose.addEventListener('click', function (e) {
    if (mobileQuery.matches) {
      userMenu.style.display = 'none';
      menuUser(false);
      menuBurguer(false);
    }
  });
});