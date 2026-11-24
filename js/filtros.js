// =====================================================
// FILTROS.JS – Filtrado de sitios turísticos
// =====================================================
// DÓNDE SE GUARDA: EN ESTE ARCHIVO NO SE GUARDA NADA.
// Lee SITIOS (app.js) y dibuja tarjetas + modal.
// OJO: el botón «🗓️ Añadir a mi Agenda» del modal solo muestra un aviso
// (ver agregarAgendaSitio más abajo). A diferencia de los EVENTOS, los sitios
// NO se guardan en localStorage. Se dejó así para no cambiar el comportamiento.

function renderSitios(lista) {
  const grid = document.getElementById('sitios-grid');
  if (!grid) return;

  if (lista.length === 0) {
    grid.innerHTML = `<div class="no-results" style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--gris);">
      <span style="font-size:3rem; display:block; margin-bottom:1rem;">🔍</span>
      <p>No se encontraron sitios para ese filtro.</p>
    </div>`;
    return;
  }

  // Ruta corregida: la carpeta es "asset" (singular). Cada sitio de js/app.js
  // tiene un id y su imagen se llama exactamente asset/img/<id>.jpg.
  grid.innerHTML = lista.map(sitio => `
    <article class="card sitio-card" data-id="${sitio.id}" data-cat="${sitio.categoria}">
      <div class="card-img" style="background-image:url('asset/img/${sitio.id}.jpg'); background-color:var(--arena);">
        <span class="card-tag">${categoriaLabel(sitio.categoria)}</span>
        <div class="card-emoji-bg">${sitio.emoji}</div>
      </div>
      <div class="card-body">
        <h3>${sitio.nombre}</h3>
        <p>${sitio.resumen}</p>
        <div class="card-meta">
          <span>⏰ ${sitio.horario}</span>
          <span>🎫 ${sitio.entrada}</span>
        </div>
        <button class="card-link btn-ver" onclick="abrirModal('${sitio.id}')">Ver detalle →</button>
      </div>
    </article>
  `).join('');

  // Add card-emoji-bg style if not present
  if (!document.getElementById('emoji-style')) {
    const st = document.createElement('style');
    st.id = 'emoji-style';
    st.textContent = `
      .card-emoji-bg {
        position: absolute;
        bottom: .5rem;
        right: 1rem;
        font-size: 2.5rem;
        opacity: .25;
        z-index: 0;
      }
      .card-meta {
        display: flex;
        flex-direction: column;
        gap: .25rem;
        font-size: .82rem;
        color: var(--gris);
        margin-bottom: 1rem;
      }
      .btn-ver {
        background: none;
        border: none;
        cursor: pointer;
        font-family: var(--ff-body);
      }
    `;
    document.head.appendChild(st);
  }
}

function categoriaLabel(cat) {
  const labels = {
    historia: 'Historia',
    naturaleza: 'Naturaleza',
    cultura: 'Cultura',
    playa: 'Playa',
    museo: 'Museo',
    noche: 'Vida Nocturna',
    gastronomia: 'Gastronomía'
  };
  return labels[cat] || cat;
}

function filtrarSitios(cat) {
  if (!window.SITIOS) return;
  const lista = cat === 'todos' ? SITIOS : SITIOS.filter(s => s.categoria === cat);
  renderSitios(lista);

  document.querySelectorAll('.filter-btn[data-cat]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === cat);
  });
}

function abrirModal(id) {
  const sitio = SITIOS.find(s => s.id === id);
  if (!sitio) return;

  let modal = document.getElementById('sitio-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'sitio-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header" id="modal-img">
          <button class="modal-close" onclick="cerrarModal()">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-meta" id="modal-meta"></div>
          <h2 id="modal-title"></h2>
          <p id="modal-desc"></p>
          <div class="modal-meta" id="modal-info"></div>
          <button class="btn-primary" onclick="agregarAgendaSitio('${id}')">🗓️ Añadir a mi Agenda</button>
        </div>
      </div>
    `;
    modal.addEventListener('click', e => { if (e.target === modal) cerrarModal(); });
    document.body.appendChild(modal);
  }

  // Se usa la misma convención que en las tarjetas: asset/img/<id>.jpg.
  // Así el modal muestra la imagen del sitio que se abrió.
  document.getElementById('modal-img').style.backgroundImage = `url('asset/img/${sitio.id}.jpg')`;
  document.getElementById('modal-img').style.backgroundColor = 'var(--arena)';
  document.getElementById('modal-title').textContent = `${sitio.emoji} ${sitio.nombre}`;
  document.getElementById('modal-desc').textContent = sitio.descripcion;
  document.getElementById('modal-meta').innerHTML = `<span class="modal-badge">${categoriaLabel(sitio.categoria)}</span>`;
  document.getElementById('modal-info').innerHTML = `
    <span class="modal-badge">⏰ ${sitio.horario}</span>
    <span class="modal-badge">🎫 ${sitio.entrada}</span>
  `;

  requestAnimationFrame(() => modal.classList.add('open'));
}

function cerrarModal() {
  const modal = document.getElementById('sitio-modal');
  if (modal) modal.classList.remove('open');
}

function agregarAgendaSitio(id) {
  // No hay localStorage.setItem aquí: es solo feedback visual + cerrar el modal.
  if (typeof showToast === 'function') showToast('Sitio añadido a tu agenda 🗺️');
  cerrarModal();
}

document.addEventListener('DOMContentLoaded', () => {
  if (!window.SITIOS) return;

  // Check URL param
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat') || 'todos';

  renderSitios(SITIOS);
  filtrarSitios(cat);

  document.querySelectorAll('.filter-btn[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => filtrarSitios(btn.dataset.cat));
  });
});

window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;
window.filtrarSitios = filtrarSitios;
