document.addEventListener('DOMContentLoaded', function () {

  const btnUser = document.querySelector('.user-button');
  const userMenu = document.querySelector('.user-menu-window');

  // PARA QUE SE OCULTE POR DEFECTO
  userMenu.style.display = 'none';

  // TOOGLE
  btnUser.addEventListener('click', function (e) {
    if (userMenu.style.display === 'none') {
      userMenu.style.display = 'block';
    } else {
      userMenu.style.display = 'none';
    }
  });

  // OCUALTAR AL HACER click FUERA DEL MENU
  document.addEventListener('click', function (e) {
    if (!userMenu.contains(e.target) && !btnUser.contains(e.target)) {
      userMenu.style.display = 'none';
    }
  });
});