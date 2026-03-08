function selectLanguage() { 
    const options = document.querySelectorAll('.globe-menu-window__option');
  const mainLabel = document.querySelector('.globe-button .title');
  const burgerLabel = document.querySelector('.burguer-menu-window__title');

  // --- APLICA EL ESTILO bold AL IDIOMA SELECCIONADO POR DEFECTO ---
  document.querySelectorAll('.globe-menu-window').forEach(function (menuWindow) {
    const firstText = menuWindow.querySelector('.globe-menu-window__option .globe-menu-window__option-text');
    if (firstText) firstText.style.fontWeight = '700';
  });

  // --- PARA ACTUALIZAR TEXTOS Y ESTILOS ---
  options.forEach(function (option) {
    option.addEventListener('click', function () {
      
      const language = option.textContent.trim();       // OBTIENE EL TEXTO DEL IDIOMA SELECCIONADO Y ELIMINA ESPACIOS EN BLANCO

      // -- MUESTRA EL IDIOMA SELECCIONADO EN EL BOTON
      if (mainLabel) mainLabel.textContent = language;
      if (burgerLabel) burgerLabel.textContent = language;

      // -- DEJA SOLO EN bold LA OPCION SELECCIONADA --
      options.forEach(function (item) {
        const itemText = item.querySelector('.globe-menu-window__option-text');
        if (itemText) itemText.style.fontWeight = '400';
      });

      // -- MARCA EN bold LA OPCION SELECCIONADA --
      const selectedText = option.querySelector('.globe-menu-window__option-text');
      if (selectedText) selectedText.style.fontWeight = '700';

      // -- CIERRA EL MENU AL SELECCIONAR UNA OPCION --
      const menu = option.closest('.globe-menu-window');
      if (menu) menu.style.display = 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  selectLanguage();
});

