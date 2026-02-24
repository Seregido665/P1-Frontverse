document.addEventListener('DOMContentLoaded', function () {

  const btnUser = document.querySelector('.user-button');
  const userMenu = document.querySelector('.user-menu-window');
  const btnGlobe = document.querySelector('.globe-button');
  const globeMenu = document.querySelector('.globe-menu-window');

  // PARA QUE SE OCULTE POR DEFECTO
  userMenu.style.display = 'none';
  globeMenu.style.display = 'none';

  // TOOGLE
  btnUser.addEventListener('click', function (e) {
    if (userMenu.style.display === 'none') {
      userMenu.style.display = 'block';
    } else {
      userMenu.style.display = 'none';
    }
  });

  // TOOGLE
  btnGlobe.addEventListener('click', function (e) {
    if (globeMenu.style.display === 'none') {
      globeMenu.style.display = 'block';
    } else {
      globeMenu.style.display = 'none';
    }
  });

  // OCUALTAR AL HACER click FUERA DEL MENU
  document.addEventListener('click', function (e) {
    if (!userMenu.contains(e.target) && !btnUser.contains(e.target)) {
      userMenu.style.display = 'none';
    }
  });

  // OCUALTAR AL HACER click FUERA DEL MENU
  document.addEventListener('click', function (e) {
    if (!globeMenu.contains(e.target) && !btnGlobe.contains(e.target)) {
      globeMenu.style.display = 'none';
    }
  });
});