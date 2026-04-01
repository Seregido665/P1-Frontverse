function updatePolicy() {
  const updateButton = document.querySelector('.info-owner__top__button');
  const buttonText = updateButton.querySelector('.info-owner__top__button-text');
  if (!updateButton || !buttonText) return;

  const fields = document.querySelectorAll('.info-owner__bottom__field');
  if (!fields.length) return;

  let editing = false;

  updateButton.addEventListener('click', () => {
    if (!editing) {
      // ---- EDITAR ----
      editing = true;
      buttonText.textContent = 'Guardar';

      fields.forEach((field) => {
        const valueEditable = field.querySelector('.field-text');
        const currentValue = valueEditable.textContent;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        input.classList.add('field-info-policy__input');

        valueEditable.replaceWith(input);
      });


    } else {
      // ---- GUARDAR ----
      editing = false;
      buttonText.textContent = 'Actualizar';

      fields.forEach((field) => {
        const input = field.querySelector('.field-info-policy__input');
        const newValue = input.value;
        const newValueEditable = document.createElement('span');
        
        newValueEditable.classList.add('field-text');
        newValueEditable.textContent = newValue;

        input.replaceWith(newValueEditable);
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  updatePolicy();
});