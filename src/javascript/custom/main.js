function main() {
  const btnUser = document.querySelector('.right-nav-buttons__user-button');
  const userMenu = document.querySelector('.user-menu-window');
  const btnGlobe = document.querySelector('.right-nav-buttons__globe-button');
  const globeMenu = document.querySelector('.globe-menu-window');
  const btnBurguer = document.querySelector('.right-nav-buttons__burguer-button');
  const burguerMenu = document.querySelector('.burguer-menu-window');
  const filterMenu = document.querySelector('.filter-menu');
  const navRight = document.querySelector('.right-nav-buttons');
  const btnClose = document.querySelector('.right-nav-buttons .close');
  const tabletQuery = window.matchMedia('(max-width: 48rem)');

  const btnGlobeInBurguer  = document.querySelector('.burguer-menu-window > .burguer-menu-window__globe-button');
  const globeMenuInBurguer = document.querySelector('.burguer-menu-window .globe-menu-window');

  userMenu.style.display = 'none';
  globeMenu.style.display = 'none';
  burguerMenu.style.display = 'none';
  globeMenuInBurguer.style.display = 'none';
  if (filterMenu) filterMenu.style.display = 'none';



  // ------------- CERRAR VENTANAS AL CLICAR FUERA -------------
  //- Perfil -
  document.addEventListener('click', function (e) {
    if (!tabletQuery.matches && !btnUser.contains(e.target)) {
      userMenu.style.display = 'none';
    }
  });
  //- Menú Burguer -
  document.addEventListener('click', function (e) {
    if (!tabletQuery.matches && !btnBurguer.contains(e.target)) {
      burguerMenu.style.display = 'none';
    }
  });
  // - Idioma -
  document.addEventListener('click', function (e) {
    if (!tabletQuery.matches && !btnGlobe.contains(e.target)) {
      globeMenu.style.display = 'none';
    }
  });
  //- Idioma en burgerMenu -
  document.addEventListener('click', function (e) {
    if (!btnGlobeInBurguer.contains(e.target)) {
      globeMenuInBurguer.style.display = 'none';
    }
  });


  
  btnClose.addEventListener('click', function () {
    if (!tabletQuery.matches) return;

    userMenu.style.display = 'none';
    burguerMenu.style.display = 'none';

    navRight.classList.remove('mobile-user-open');          //--> nav-buttons-right.scss
    navRight.classList.remove('mobile-burguer-open');       //--> nav-buttons-right.scss
    document.body.style.overflow = '';
  });
}



document.addEventListener('DOMContentLoaded', function () {
  main();
});