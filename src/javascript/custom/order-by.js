// ─────────────────────────────────────────────
//  ORDENACIÓN DE RENOVACIONES
//  Depende de: RenovationsStore y renderRenovationsWithPagination (showRenovations.js)
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  const select = document.querySelector('.renovations-filter__list__select');
  if (!select) return;


  // ─── PARSERS ────────────────────────────────

  function parseImporte(item) {
    return parseFloat(
      item['Importe']
        .replace(/\./g, '')   // Elimina los puntos de los miles
        .replace(',', '.')    // Sustituye la coma decimal por punto para parseFloat
    );
  }

  function parseFecha(item) {
    return new Date(
      item['Fecha de contrato']
        .split('/')           // Separa en [dd, mm, yyyy]
        .reverse()            // Invierte a [yyyy, mm, dd]
        .join('-')            // Une con guiones para new Date
    );
  }


  // ─── CRITERIOS DE ORDENACIÓN ────────────────

  const orderBy = {
    'Mayor importe':    (a, b) => parseImporte(b) - parseImporte(a),
    'Menor importe':    (a, b) => parseImporte(a) - parseImporte(b),
    'Más recientes':    (a, b) => parseFecha(b)   - parseFecha(a),
    'Menos recientes':  (a, b) => parseFecha(a)   - parseFecha(b),
  };


  // ─── APLICAR ORDEN ──────────────────────────

  function applyOrder(value) {
    // Partimos siempre de los datos originales para no acumular ordenaciones
    const sorted = [...RenovationsStore.originalData];

    if (orderBy[value]) {
      sorted.sort(orderBy[value]);
    }

    RenovationsStore.data = sorted;   // Actualizamos el store con el nuevo orden
  }


  // ─── EVENTO ─────────────────────────────────

  select.addEventListener('change', function () {
    applyOrder(select.value);

    // Vuelve a la página 1 con el nuevo orden
    const rowsSelect = document.querySelector('.pagination__rows__option');
    const rows = rowsSelect ? parseInt(rowsSelect.value, 10) : 10;
    renderRenovationsWithPagination(rows, 1);
  });
});


// ─────────────────────────────────────────────
//  HELPER PÚBLICO
//  Devuelve los datos en el orden activo
// ─────────────────────────────────────────────
function getRenovationsOrderBy() {
  return RenovationsStore.data;
}