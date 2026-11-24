// =====================================================
// GRAFO.JS – Visualización de relaciones entre sitios
// =====================================================
// DÓNDE SE GUARDA: EN NINGÚN LADO. GRAFO_SITIOS es un mapa fijo en el código.
// Nota: actualmente NINGÚN HTML carga este archivo; está listo para usarse
// si quieres mostrar «sitios cercanos» en la ventana emergente de sitios.html.

// Lista fija: qué sitios están cerca de cuál
const GRAFO_SITIOS = {
  'castillo':     ['popa', 'murallas', 'getsemani'],
  'murallas':     ['castillo', 'torre-reloj', 'santo-domingo', 'inquisicion'],
  'torre-reloj':  ['murallas', 'getsemani'],
  'getsemani':    ['murallas', 'torre-reloj', 'bazurto'],
  'santo-domingo':['murallas', 'inquisicion'],
  'inquisicion':  ['murallas', 'santo-domingo'],
  'popa':         ['castillo'],
  'bocagrande':   ['baru'],
  'baru':         ['bocagrande', 'tierra-bomba'],
  'islas':        ['tierra-bomba', 'baru'],
  'tierra-bomba': ['islas', 'baru'],
  'bazurto':      ['getsemani']
};

function getSiteosRelacionados(id) {
  const relacionados = GRAFO_SITIOS[id] || [];
  if (!window.SITIOS) return [];
  return SITIOS.filter(s => relacionados.includes(s.id));
}

function renderSitiosRelacionados(sitioId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const relacionados = getSiteosRelacionados(sitioId);
  if (relacionados.length === 0) {
    container.innerHTML = '<p style="color:var(--gris); font-size:.9rem;">No hay sitios relacionados.</p>';
    return;
  }

  container.innerHTML = `
    <p style="font-size:.8rem; letter-spacing:.1em; text-transform:uppercase; color:var(--gris); margin-bottom:.75rem;">
      Sitios cercanos
    </p>
    ${relacionados.map(s => `
      <div style="display:flex; align-items:center; gap:.75rem; margin-bottom:.5rem;">
        <span>${s.emoji}</span>
        <a href="sitios.html#${s.id}" style="font-size:.9rem; color:var(--azul); font-weight:600;">${s.nombre}</a>
      </div>
    `).join('')}
  `;
}

window.getSiteosRelacionados = getSiteosRelacionados;
window.renderSitiosRelacionados = renderSitiosRelacionados;
