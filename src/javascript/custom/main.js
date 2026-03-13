function main() {
  const btnUser = document.querySelector('.right-nav-buttons__user-button');           // SIEMPRE BUSACAR CON querySelector
  const userMenu = document.querySelector('.user-menu-window');
  const btnGlobe = document.querySelector('.right-nav-buttons__globe-button');
  const globeMenu = document.querySelector('.globe-menu-window');
  const btnBurguer = document.querySelector('.right-nav-buttons__burguer-button');
  const burguerMenu = document.querySelector('.burguer-menu-window');
  const filterMenu = document.querySelector('.filter-menu');
  const navRight = document.querySelector('.right-nav-buttons');
  const btnClose = document.querySelector('.right-nav-buttons .close');
  const tabletQuery = window.matchMedia('(max-width: 48rem)');

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
  if (filterMenu) {
    filterMenu.style.display = 'none';
  }



  // FUNCIONES PARA OCULTAR AL HACER click FUERA
  // Mi perfil
  document.addEventListener('click', function (e) {
    if (!tabletQuery.matches && !userMenu.contains(e.target) && !btnUser.contains(e.target)) {
      userMenu.style.display = 'none';
    }
  });
  // Menú Burguer
  document.addEventListener('click', function (e) {
    if (!tabletQuery.matches && !burguerMenu.contains(e.target) && !btnBurguer.contains(e.target)) {
      burguerMenu.style.display = 'none';
    }
  });
  // Idioma
  document.addEventListener('click', function (e) {
    if (!tabletQuery.matches && !globeMenu.contains(e.target) && !btnGlobe.contains(e.target)) {
      globeMenu.style.display = 'none';
    }
  });
  // Idioma (en Menú Burguer)
  document.addEventListener('click', function (e) {
    if (btnGlobeInBurguer && globeMenuInBurguer &&
      !globeMenuInBurguer.contains(e.target) &&
      !btnGlobeInBurguer.contains(e.target)) {
      globeMenuInBurguer.style.display = 'none';
    }
  });



  // -- FUNCION PARA EL BOTON DE CERRAR DEL nav-right--
  btnClose.addEventListener('click', function (e) {
    if (tabletQuery.matches) {
      userMenu.style.display = 'none';
      burguerMenu.style.display = 'none';
      globeMenuInBurguer.style.display = 'none';
      btnGlobeInBurguer.classList.remove('is-open');
      navRight.classList.remove('mobile-user-open');
      navRight.classList.remove('mobile-burguer-open');
      document.body.style.overflow = '';
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  main();
});