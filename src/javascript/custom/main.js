function main() {
  const header = document.querySelector('.navbar');
  if(!header) return;
  
  const btnUser = header.querySelector('.right-nav-buttons__user-button');
  const userMenu = header.querySelector('.user-menu-window');
  const btnGlobe = header.querySelector('.right-nav-buttons__globe-button');
  const globeMenu = header.querySelector('.globe-menu-window');
  const burguerMenu = header.querySelector('.burguer-menu-window');
  const filterMenu = document.querySelector('.filter-menu');
  const navRight = header.querySelector('.right-nav-buttons');
  const btnClose = header.querySelector('.right-nav-buttons .close');
  const tabletQuery = window.matchMedia('(max-width: 48rem)');

  const btnGlobeInBurguer  = header.querySelector('.burguer-menu-window > .burguer-menu-window__globe-button');
  const globeMenuInBurguer = header.querySelector('.burguer-menu-window .globe-menu-window');

  userMenu.style.display = 'none';
  globeMenu.style.display = 'none';
  burguerMenu.style.display = 'none';
  globeMenuInBurguer.style.display = 'none';
  if (filterMenu) filterMenu.style.display = 'none';


  // ------------- CERRAR VENTANAS AL CLICAR FUERA -------------
  //- Perfil -
  document.addEventListener('click', function (component) {
    if (!tabletQuery.matches && !btnUser.contains(component.target)) {
      userMenu.style.display = 'none';
    }
  });
  // - Idioma -
  document.addEventListener('click', function (component) {
    if (!btnGlobe.contains(component.target)) {
      globeMenu.style.display = 'none';
    }
  });
  //- Idioma en burgerMenu -
  document.addEventListener('click', function (component) {
    if (!btnGlobeInBurguer.contains(component.target)) {
      globeMenuInBurguer.style.display = 'none';
    }
  });


  btnClose.addEventListener('click', function () {
    userMenu.style.display = 'none';
    burguerMenu.style.display = 'none';

    navRight.classList.remove('mobile-user-open');          //--> nav-buttons-right.scss
    navRight.classList.remove('mobile-burguer-open');       //--> nav-buttons-right.scss
    header.body.style.overflow = '';
  });
}


document.addEventListener('DOMContentLoaded', function () {
  main();
});