// =====================================================
// RECOMENDACIONES.JS – Motor de recomendaciones
// =====================================================
// DÓNDE SE GUARDA: EN NINGÚN LADO. Lee el catálogo SITIOS (app.js) y arma
// una lista temporal ordenada por categorías preferidas (dashboard.html se las pasa).
// Las preferencias no se recuerdan entre recargas: están hardcodeadas en dashboard.html.

function getRecomendaciones(categoriasPreferidas = []) {
  if (!window.SITIOS) return [];

  if (categoriasPreferidas.length === 0) {
    // Return top 3 most popular by default
    return SITIOS.slice(0, 3);
  }

  // Score each site by how many preferred categories it matches
  const scored = SITIOS.map(sitio => ({
    ...sitio,
    score: categoriasPreferidas.includes(sitio.categoria) ? 2 : 1
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

function renderRecomendaciones(containerId, prefs = []) {
  const container = document.getElementById(containerId);
  if (!container || !window.SITIOS) return;

  const lista = getRecomendaciones(prefs);

  container.innerHTML = lista.map(sitio => `
    <div class="rec-card">
      <span class="rec-emoji">${sitio.emoji}</span>
      <div>
        <h4>${sitio.nombre}</h4>
        <p>${sitio.resumen}</p>
      </div>
    </div>
  `).join('');

  const style = document.createElement('style');
  if (!document.getElementById('rec-style')) {
    style.id = 'rec-style';
    style.textContent = `
      .rec-card {
        display: flex; align-items: flex-start; gap: 1rem;
        padding: 1rem; border-radius: 8px;
        background: var(--arena); margin-bottom: .75rem;
      }
      .rec-emoji { font-size: 1.8rem; flex-shrink: 0; }
      .rec-card h4 { font-family: var(--ff-display); font-size: .95rem; margin-bottom: .2rem; }
      .rec-card p { font-size: .82rem; color: var(--gris); }
    `;
    document.head.appendChild(style);
  }
}

window.getRecomendaciones = getRecomendaciones;
window.renderRecomendaciones = renderRecomendaciones;
