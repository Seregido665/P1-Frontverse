document.addEventListener('DOMContentLoaded', function () {

  const btnUser = document.querySelector('.user-button');
  const userMenu = document.querySelector('.user-menu-window');
  const btnGlobe = document.querySelector('.globe-button');
  const globeMenu = document.querySelector('.globe-menu-window');
  const navRight = document.querySelector('.right-nav-buttons');         
  const btnClose = document.querySelector('.right-nav-buttons .close');  
  const mobileQuery = window.matchMedia('(max-width: 30rem)');   // PARA DETECTAR SI ESTAMOS EN TAMAÑO MÓVIL
  
  // PARA QUE LOS MENUS ESTEN OCULTOS POR DEFECTO
  userMenu.style.display = 'none';
  globeMenu.style.display = 'none';


  // - TOGGLE DE Mi Perfil -
  const menuUser = function (isOpen) {
    navRight.classList.toggle('mobile-user-open', isOpen);
  };
  btnUser.addEventListener('click', function (e) {

    // - PARA LA VISTA DE ESCRITORIO -
    if (userMenu.style.display === 'none') {
      userMenu.style.display = 'block';
    } else {
      userMenu.style.display = 'none';
    }
    // - PARA LA VISTA DE MOVIL -
    if (mobileQuery.matches) {
      menuUser(userMenu.style.display === 'block');
    }
  });

  // - TOGGLE DE Idioma -
  btnGlobe.addEventListener('click', function (e) {
    if (globeMenu.style.display === 'none') {
      globeMenu.style.display = 'block';
    } else {
      globeMenu.style.display = 'none';
    }
  });


  // OCUALTAR AL HACER click FUERA
  document.addEventListener('click', function (e) {
    if (!mobileQuery.matches && !userMenu.contains(e.target) && !btnUser.contains(e.target)) {
      userMenu.style.display = 'none';
    }
  });
  // OCUALTAR AL HACER click FUERA
  document.addEventListener('click', function (e) {
    if (!mobileQuery.matches && !globeMenu.contains(e.target) && !btnGlobe.contains(e.target)) {
      globeMenu.style.display = 'none';
    }
  });

  // -- FUNCION PARA EL BOTON DE CERRAR --
  btnClose.addEventListener('click', function (e) {
    if (mobileQuery.matches) {
      userMenu.style.display = 'none';
      menuUser(false);
    }
  });
});