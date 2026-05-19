function selectLanguage() {
  const options = document.querySelectorAll('.globe-menu-window__option');

  // -- Marca en negrito la opcion seleccionada y desselecciona la que hubiese antes --
  function setStyleSelection(selectedOption) {
    options.forEach(function (option) {
      const text = option.querySelector('.globe-menu-window__option-text');
      if (text) text.style.fontWeight = '400';
    });
    const selectedLanguage = selectedOption.querySelector('.globe-menu-window__option-text');
    if (selectedLanguage) selectedLanguage.style.fontWeight = '700';
  }

  // -- Cierra el menú desplegable al seleccionar un idioma --
  function closeMenu(option) {
    const menu = option.closest('.globe-menu-window');
    if (menu) menu.style.display = 'none';
  }

  options.forEach(function (option) {
    option.addEventListener('click', function () {
      setStyleSelection(option);
      closeMenu(option);
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  selectLanguage();
});
