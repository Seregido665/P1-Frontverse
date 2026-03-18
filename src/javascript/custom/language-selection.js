function selectLanguage() {
  const options = document.querySelectorAll('.globe-menu-window__option');
  const mainGlobe = document.querySelector('.globe-button__title');
  const burgerGlobe = document.querySelector('.burguer-menu-window__title');

  if (!mainGlobe || !burgerGlobe) return;


  // --- APLICA BOLD AL PRIMER ELEMENTO DE CADA MENÚ POR DEFECTO ---
  document.querySelectorAll('.globe-menu-window').forEach(function (menuWindow) {
    const firstText = menuWindow.querySelector('.globe-menu-window__option .globe-menu-window__option-text');
    if (firstText) firstText.style.fontWeight = '700';
  });


  // --- CAMBIAR EL ESTILO DEL IDIOMA SELECCIONADO ---
  function setSelection(selectedOption) {
    options.forEach(function (item) {
      const text = item.querySelector('.globe-menu-window__option-text');
      if (text) text.style.fontWeight = '400';
    });
    const selectedLanguage = selectedOption.querySelector('.globe-menu-window__option-text');
    if (selectedLanguage) selectedLanguage.style.fontWeight = '700';
  }


  // --- CERRAR AL SELECCIONAR UNA OPCION ---
  function closeMenu(option) {
    const menu = option.closest('.globe-menu-window');
    if (menu) menu.style.display = 'none';
  }


  // --- PARA ASIGNAR EVENTOS A CADA OPCIÓN ---
  options.forEach(function (option) {
    option.addEventListener('click', function () {
      const language = option.textContent;
      mainGlobe.textContent  = language;
      burgerGlobe.textContent = language;

      setSelection(option);
      closeMenu(option);
    });
  });
}


document.addEventListener('DOMContentLoaded', function () {
  selectLanguage();
});