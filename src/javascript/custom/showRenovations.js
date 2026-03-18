import { renovations } from "./utils";


// --- PINTA LAS RENOVACIONES ---
function renderRenovations() {
  var container = document.querySelector('.renovations-json-list');
  if (!container) return;

  var renovations = AppData.renovations;

  container.innerHTML = renovations.map(function(renovation) {
    var stateClass = '';
    var icon = '';
    if (renovation["Estado de póliza"] === "Pagado") {
      stateClass = 'state__success';
      icon = 'check';
    } else if (renovation["Estado de póliza"] === "Pendiente") {
      stateClass = 'state__warning';
      icon = 'clock';
    } else {
      stateClass = 'state__error';
      icon = 'close';
    }
    return '<div class="renovation-card-desktop">' +
      '<div class="renovation-card-desktop__policy">' + renovation["No. de póliza"] + '</div>' +
      '<div class="renovation-card-desktop__risk">' + renovation["Nombre del riesgo"] + '</div>' +
      '<div class="renovation-card-desktop__date-contrat">' + renovation["Fecha de contrato"] + '</div>' +
      '<div class="renovation-card-desktop__date-maturity">' + renovation["Fecha de vencimiento"] + '</div>' +
      '<div class="renovation-card-desktop__price">' + renovation["Importe"] + '</div>' +
      '<div class="state-cell">' +
        '<div class="renovation-card-desktop__state">' +
          '<div class="state ' + stateClass + '">' +
            '<span class="state__icon icon ' + icon + '"></span>' +
            '<span class="state__text">' + renovation["Estado de póliza"] + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

document.addEventListener('DOMContentLoaded', function () {
  renderRenovations();
});
