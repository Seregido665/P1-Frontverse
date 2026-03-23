function selectLanguage() {
  const options = document.querySelectorAll('.globe-menu-window__option');
  const mainGlobe = document.querySelector('.globe-button__title');
  const burgerGlobe = document.querySelector('.burguer-menu-window__title');

  if (!mainGlobe || !burgerGlobe) return;



  //--> BOLD al idioma por defecto
  document.querySelectorAll('.globe-menu-window').forEach(function (menuOption) {
    const defaultOption = menuOption.querySelector('.globe-menu-window__option .globe-menu-window__option-text');
    if (defaultOption) defaultOption.style.fontWeight = '700';
  });
  
  function setStyleSelection(selectedOption) {
    options.forEach(function (option) {
      const text = option.querySelector('.globe-menu-window__option-text');
      if (text) text.style.fontWeight = '400';
    });
    const selectedLanguage = selectedOption.querySelector('.globe-menu-window__option-text');
    if (selectedLanguage) selectedLanguage.style.fontWeight = '700';
  }


  
  function closeMenu(option) {
    const menu = option.closest('.globe-menu-window');
    if (menu) menu.style.display = 'none';
  }

  

  options.forEach(function (option) {
    option.addEventListener('click', function () {
      const language = option.textContent;
      mainGlobe.textContent  = language;
      burgerGlobe.textContent = language;

      setStyleSelection(option);
      closeMenu(option);
    });
  });
}



document.addEventListener('DOMContentLoaded', function () {
  selectLanguage();
});