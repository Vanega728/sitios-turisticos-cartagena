// =====================================================
// AGENDA.JS – Agenda personal del usuario
// =====================================================
// DÓNDE SE GUARDA: localStorage['agenda'] es una lista SOLO con números de id
// de eventos (por ejemplo [1, 4]). Aquí se LEE y se puede QUITAR un número.
// Quien AGREGA IDs es eventos.js → agregarAgenda().
// Los nombres/fechas no se guardan: se buscan en EVENTOS (eventos.js) por su id.

function renderAgendaPage() {
  const container = document.getElementById('agenda-container');
  if (!container) return;

  // Leemos los IDs guardados. Si no hay nada, mostramos el estado vacío.
  const saved = JSON.parse(localStorage.getItem('agenda') || '[]');

  if (saved.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 5rem 2rem; color: var(--gris);">
        <span style="font-size:4rem; display:block; margin-bottom:1.5rem;">📅</span>
        <h3 style="font-family:var(--ff-display); font-size:1.8rem; margin-bottom:.5rem;">Tu agenda está vacía</h3>
        <p style="margin-bottom:2rem;">Explora los eventos y sitios turísticos de Cartagena y añádelos aquí.</p>
        <a href="eventos.html" class="btn-primary">Ver Eventos</a>
        <a href="sitios.html" class="btn-outline" style="margin-left:1rem;">Ver Sitios</a>
      </div>
    `;
    return;
  }

  // Buscamos cada número guardado en EVENTOS para obtener el evento completo.
  // Por eso la agenda depende de que eventos.js se cargue ANTES (ver agenda.html).
  const eventosEnAgenda = (window.EVENTOS || []).filter(ev => saved.includes(ev.id));

  container.innerHTML = `
    <div class="agenda-list">
      ${eventosEnAgenda.map(ev => `
        <div class="agenda-item">
          <div class="event-date">
            <span class="day">${ev.dia}</span>
            <span class="month">${ev.mes}</span>
          </div>
          <div class="event-info" style="flex:1;">
            <h4>${ev.nombre}</h4>
            <p>📍 ${ev.lugar} &nbsp;·&nbsp; 🕐 ${ev.hora}</p>
          </div>
          <button class="btn-remove" onclick="removeFromAgenda(${ev.id})">✕ Eliminar</button>
        </div>
      `).join('')}
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .agenda-list { display: flex; flex-direction: column; gap: 1rem; }
    .agenda-item {
      display: flex; align-items: center; gap: 1.5rem;
      background: var(--blanco); border-radius: var(--radius);
      padding: 1.25rem 1.5rem; box-shadow: var(--shadow);
    }
    .btn-remove {
      background: none; border: 1.5px solid var(--terracota);
      color: var(--terracota); padding: .4rem 1rem;
      border-radius: 50px; cursor: pointer;
      font-family: var(--ff-body); font-size: .85rem;
      transition: all .3s;
    }
    .btn-remove:hover { background: var(--terracota); color: white; }
  `;
  document.head.appendChild(style);
}

function removeFromAgenda(id) {
  // Borrar = leer la lista, quitar ese ID y VOLVER A GUARDAR la lista completa.
  const saved = JSON.parse(localStorage.getItem('agenda') || '[]');
  const updated = saved.filter(i => i !== id);
  localStorage.setItem('agenda', JSON.stringify(updated)); // ← persistencia
  renderAgendaPage();
  if (typeof showToast === 'function') showToast('Evento eliminado de tu agenda');
}

document.addEventListener('DOMContentLoaded', () => {
  renderAgendaPage();
});

window.removeFromAgenda = removeFromAgenda;
