// =====================================================
// EVENTOS.JS – Cartagena de Indias
// =====================================================
// DÓNDE SE GUARDA:
//   • EVENTOS (abajo) NO se guarda: es un arreglo fijo escrito en el código y
//     se recrea en cada carga de página.
//   • Al dar «+ Agenda» se escribe localStorage['agenda'] con los IDs elegidos.
//     Ese mismo arreglo lo lee agenda.js y el contador del dashboard.

const EVENTOS = [
  {
    id: 1,
    nombre: 'Festival de Música del Caribe',
    tipo: 'Festival',
    lugar: 'Plaza de los Coches',
    dia: '18',
    mes: 'May',
    hora: '6:00 PM',
    descripcion: 'Conciertos en vivo con los mejores exponentes de la música caribeña: champeta, porro, vallenato y cumbia. Entrada libre para el público general.',
    fecha: new Date(2026, 4, 18)
  },
  {
    id: 2,
    nombre: 'Tour Nocturno: Murallas y Leyendas',
    tipo: 'Tour',
    lugar: 'Torre del Reloj',
    dia: '21',
    mes: 'May',
    hora: '7:30 PM',
    descripcion: 'Recorre la Ciudad Amurallada de noche escuchando las leyendas y misterios coloniales de La Heroica. Guía experto incluido.',
    fecha: new Date(2026, 4, 21)
  },
  {
    id: 3,
    nombre: 'Feria Gastronómica del Mar',
    tipo: 'Gastronomía',
    lugar: 'Barrio Getsemaní',
    dia: '25',
    mes: 'May',
    hora: '12:00 PM',
    descripcion: 'Degustación de los mejores platos de la cocina caribeña: ceviche, cazuela de mariscos, carimañolas y postres tradicionales.',
    fecha: new Date(2026, 4, 25)
  },
  {
    id: 4,
    nombre: 'Caminata Histórica al Castillo San Felipe',
    tipo: 'Cultural',
    lugar: 'Castillo San Felipe',
    dia: '28',
    mes: 'May',
    hora: '9:00 AM',
    descripcion: 'Visita guiada a la fortaleza más importante de América colonial. Recorre sus túneles secretos y aprende sobre las batallas históricas.',
    fecha: new Date(2026, 4, 28)
  },
  {
    id: 5,
    nombre: 'Crucero al Atardecer por la Bahía',
    tipo: 'Náutico',
    lugar: 'Muelle de los Pegasos',
    dia: '01',
    mes: 'Jun',
    hora: '5:30 PM',
    descripcion: 'Navega por la bahía de Cartagena mientras el sol se pone sobre las fortificaciones históricas. Bebidas y música en vivo incluidas.',
    fecha: new Date(2026, 5, 1)
  },
  {
    id: 6,
    nombre: 'Taller de Cocina Caribeña',
    tipo: 'Taller',
    lugar: 'Getsemaní',
    dia: '05',
    mes: 'Jun',
    hora: '10:00 AM',
    descripcion: 'Aprende a preparar arepas de huevo, carimañolas y sancocho de pescado con un chef local. Incluye degustación de los platos preparados.',
    fecha: new Date(2026, 5, 5)
  }
];

// ── Render eventos page ───────────────────────────
function renderEventosPage() {
  const grid = document.getElementById('eventos-grid');
  if (!grid) return;

  grid.innerHTML = EVENTOS.map(ev => `
    <article class="evento-card" data-tipo="${ev.tipo.toLowerCase()}">
      <div class="evento-header">
        <div class="evento-fecha-box">
          <span class="dia">${ev.dia}</span>
          <span class="mes">${ev.mes}</span>
        </div>
        <span class="evento-tipo">${ev.tipo}</span>
      </div>
      <div class="evento-body">
        <h3>${ev.nombre}</h3>
        <p>${ev.descripcion}</p>
      </div>
      <div class="evento-footer">
        <span class="evento-lugar">📍 <span>${ev.lugar}</span> &nbsp;·&nbsp; 🕐 ${ev.hora}</span>
        <button class="btn-evento" onclick="agregarAgenda(${ev.id})">+ Agenda</button>
      </div>
    </article>
  `).join('');
}

// ── Add to agenda (localStorage) ─────────────────
// Guarda SOLAMENTE el número de id del evento, no el evento completo.
function agregarAgenda(id) {
  const saved = JSON.parse(localStorage.getItem('agenda') || '[]'); // lee
  if (saved.includes(id)) {          // evita duplicados
    showToast('Ya está en tu agenda ✓');
    return;
  }
  saved.push(id);
  localStorage.setItem('agenda', JSON.stringify(saved)); // ← escribe
  showToast('Evento añadido a tu agenda 🗓️');
}

// ── Filter eventos ────────────────────────────────
function filterEventos(tipo) {
  const cards = document.querySelectorAll('.evento-card');
  cards.forEach(card => {
    if (tipo === 'todos' || card.dataset.tipo === tipo.toLowerCase()) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === tipo);
  });
}

// ── Toast notification ────────────────────────────
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:2rem; left:50%; transform:translateX(-50%);
      background:var(--oscuro); color:var(--crema); padding:.75rem 1.5rem;
      border-radius:50px; font-family:var(--ff-body); font-size:.95rem;
      border:1px solid var(--oro); z-index:999; transition:opacity .3s;
      white-space:nowrap;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// ── Search eventos ────────────────────────────────
function searchEventos(query) {
  const q = query.toLowerCase();
  const cards = document.querySelectorAll('.evento-card');
  cards.forEach((card, i) => {
    const ev = EVENTOS[i];
    if (!ev) return;
    const match = ev.nombre.toLowerCase().includes(q) ||
                  ev.lugar.toLowerCase().includes(q) ||
                  ev.tipo.toLowerCase().includes(q);
    card.style.display = match ? '' : 'none';
  });
}

// ── Init ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderEventosPage();

  const searchInput = document.getElementById('search-eventos');
  if (searchInput) {
    searchInput.addEventListener('input', e => searchEventos(e.target.value));
  }

  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => filterEventos(btn.dataset.filter));
  });
});

window.EVENTOS = EVENTOS;
window.agregarAgenda = agregarAgenda;
window.filterEventos = filterEventos;
