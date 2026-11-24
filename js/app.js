// =====================================================
// APP.JS – Cartagena de Indias: Sitios Turísticos
// =====================================================
// DÓNDE SE GUARDA: AQUÍ NO SE GUARDA NADA.
// SITIOS es un catálogo fijo escrito en este archivo; se crea de nuevo cada vez
// que carga la página. Al final se publica como window.SITIOS para que
// filtros.js, recomendaciones.js y grafo.js puedan leerlo.
// El id de cada sitio (castillo, baru, torre-reloj...) es también el nombre de
// su imagen en asset/img/<id>.jpg.

// ── Data ──────────────────────────────────────────
const SITIOS = [
  {
    id: 'castillo',
    nombre: 'Castillo San Felipe de Barajas',
    categoria: 'historia',
    descripcion: 'La fortaleza española más imponente de América Latina, construida en el siglo XVII sobre el Cerro de San Lorenzo. Sus túneles, cañones y miradores ofrecen una experiencia histórica única con vistas panorámicas de toda la ciudad y la bahía.',
    resumen: 'Fortaleza colonial del siglo XVII, considerada una de las 7 maravillas de Colombia.',
    emoji: '🏰',
    horario: 'Lun–Dom: 8am–5:30pm',
    entrada: 'Desde $25,000 COP',
    coords: { lat: 10.4226, lng: -75.5380 }
  },
  {
    id: 'murallas',
    nombre: 'Ciudad Amurallada',
    categoria: 'historia',
    descripcion: 'El casco histórico de Cartagena, declarado Patrimonio de la Humanidad por la UNESCO en 1984. Casi 11 km de murallas rodean plazas coloniales, iglesias barrocas, casonas con balcones floridos y callejones empedrados llenos de historia.',
    resumen: 'Patrimonio Mundial UNESCO (1984). Corazón colonial de La Heroica.',
    emoji: '🧱',
    horario: 'Abierto 24h (murallas)',
    entrada: 'Libre',
    coords: { lat: 10.4231, lng: -75.5504 }
  },
  {
    id: 'islas',
    nombre: 'Islas del Rosario',
    categoria: 'naturaleza',
    descripcion: 'Archipiélago a una hora en lancha de Cartagena, dentro del Parque Natural Nacional Corales del Rosario. Aguas cristalinas de 20+ tonos de azul, snorkeling entre corales vivos y una biodiversidad marina extraordinaria.',
    resumen: 'Parque Natural Nacional. Snorkeling, corales y playas paradisíacas.',
    emoji: '🏝️',
    horario: 'Salidas diarias 8am–9am',
    entrada: 'Tour desde $80,000 COP',
    coords: { lat: 10.1667, lng: -75.7667 }
  },
  {
    id: 'getsemani',
    nombre: 'Barrio Getsemaní',
    categoria: 'cultura',
    descripcion: 'El barrio más auténtico y bohemio de Cartagena, famoso por sus murales callejeros de talla internacional, la Plaza de la Trinidad, casas coloniales de colores y una vida nocturna vibrante. El alma verdadera de La Heroica.',
    resumen: 'Barrio bohemio con arte urbano, murales y la Plaza de la Trinidad.',
    emoji: '🎨',
    horario: 'Siempre activo',
    entrada: 'Libre',
    coords: { lat: 10.4225, lng: -75.5543 }
  },
  {
    id: 'baru',
    nombre: 'Playa Blanca – Barú',
    categoria: 'playa',
    descripcion: 'Una de las playas más bellas del mundo, con arena blanca fina, palmeras tropicales y aguas tranquilas color turquesa. Ubicada en la Isla Barú, a 45 minutos en lancha o 1.5h por carretera desde Cartagena.',
    resumen: 'Arena blanca y aguas turquesas. Una de las playas más hermosas del mundo.',
    emoji: '🏖️',
    horario: '6am–6pm',
    entrada: 'Libre (transporte aparte)',
    coords: { lat: 10.2314, lng: -75.6033 }
  },
  {
    id: 'inquisicion',
    nombre: 'Palacio de la Inquisición',
    categoria: 'museo',
    descripcion: 'Edificio barroco del siglo XVIII frente a la Plaza de Bolívar. Sede del Tribunal de la Inquisición hasta 1811, hoy alberga el Museo Histórico de Cartagena con colecciones sobre la Independencia, la colonia y artefactos únicos.',
    resumen: 'Museo histórico en un edificio barroco del XVIII. Frente a la Plaza de Bolívar.',
    emoji: '🏛️',
    horario: 'Lun–Sab: 9am–5pm',
    entrada: '$15,000 COP',
    coords: { lat: 10.4237, lng: -75.5484 }
  },
  {
    id: 'popa',
    nombre: 'Convento La Popa',
    categoria: 'historia',
    descripcion: 'Monasterio agustino del siglo XVII ubicado en la colina más alta de Cartagena (150 m). Ofrece las vistas más espectaculares de la ciudad, la bahía y el mar Caribe. Hogar de la venerada Virgen de la Candelaria.',
    resumen: 'Convento del siglo XVII a 150m de altura. Mejores vistas de la ciudad.',
    emoji: '⛪',
    horario: 'Lun–Dom: 8am–5:30pm',
    entrada: '$12,000 COP',
    coords: { lat: 10.4179, lng: -75.5254 }
  },
  {
    id: 'bocagrande',
    nombre: 'Bocagrande',
    categoria: 'playa',
    descripcion: 'El sector turístico más moderno de Cartagena, con playas urbanas, hoteles de lujo, restaurantes, centros comerciales y una animada vida nocturna. El frente de playa más accesible y concurrido de la ciudad.',
    resumen: 'Zona turística moderna con playa urbana, hoteles y restaurantes.',
    emoji: '🌅',
    horario: 'Siempre activo',
    entrada: 'Libre',
    coords: { lat: 10.3995, lng: -75.5502 }
  },
  {
    id: 'torre-reloj',
    nombre: 'Torre del Reloj',
    categoria: 'historia',
    descripcion: 'Puerta de entrada principal a la Ciudad Amurallada, símbolo icónico de Cartagena. Construida en el siglo XVIII, conecta la ciudad antigua con el barrio de Getsemaní a través de la Plaza de los Coches.',
    resumen: 'Icónico símbolo de Cartagena. Entrada principal a la Ciudad Amurallada.',
    emoji: '🕰️',
    horario: 'Abierto 24h',
    entrada: 'Libre',
    coords: { lat: 10.4243, lng: -75.5505 }
  },
  {
    id: 'santo-domingo',
    nombre: 'Iglesia Santo Domingo',
    categoria: 'cultura',
    descripcion: 'La iglesia más antigua de Cartagena (1539), joya del barroco colonial. Frente a ella se encuentra la famosa escultura de Botero "Mujer Recostada". Flanqueada por los mejores restaurantes y cafés de la ciudad.',
    resumen: 'Iglesia más antigua de la ciudad (1539). Frente a la escultura de Botero.',
    emoji: '🕍',
    horario: 'Misas diarias 6am y 6pm',
    entrada: 'Libre',
    coords: { lat: 10.4238, lng: -75.5489 }
  },
  {
    id: 'bazurto',
    nombre: 'Mercado de Bazurto',
    categoria: 'cultura',
    descripcion: 'El mercado más auténtico de Cartagena: jugos tropicales, mariscos frescos, frutas exóticas, especias y el caos vibrante del Caribe real. Para los viajeros que buscan la Cartagena de los locales, lejos de las rutas turísticas.',
    resumen: 'Mercado popular con la esencia auténtica del Caribe cartagenero.',
    emoji: '🛒',
    horario: 'Lun–Sab: 6am–3pm',
    entrada: 'Libre',
    coords: { lat: 10.4139, lng: -75.5297 }
  },
  {
    id: 'tierra-bomba',
    nombre: 'Isla Tierra Bomba',
    categoria: 'naturaleza',
    descripcion: 'Isla en la bahía de Cartagena con playas tranquilas lejos del turismo masivo, el Fuerte San Fernando de Bocachica y el ambiente auténtico de los pescadores locales. A solo 20 minutos en lancha.',
    resumen: 'Isla histórica en la bahía con el Fuerte San Fernando. 20 min en lancha.',
    emoji: '🚤',
    horario: 'Lanchas cada 30 min',
    entrada: 'Travesía ~$15,000 COP',
    coords: { lat: 10.3500, lng: -75.5667 }
  }
];

// ── Navbar scroll effect ──────────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ── Mobile menu toggle ────────────────────────────
const menuToggle = document.querySelector('.menu-toggle');
const navLinks   = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ── Render home events (últimos 3) ────────────────
function renderHomeEvents() {
  const container = document.getElementById('home-events');
  if (!container) return;

  const items = EVENTOS.slice(0, 3);
  container.innerHTML = items.map(ev => `
    <div class="event-item">
      <div class="event-date">
        <span class="day">${ev.dia}</span>
        <span class="month">${ev.mes}</span>
      </div>
      <div class="event-info">
        <h4>${ev.nombre}</h4>
        <p>📍 ${ev.lugar} &nbsp;·&nbsp; 🕐 ${ev.hora}</p>
      </div>
      <span class="event-tag-badge">${ev.tipo}</span>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof EVENTOS !== 'undefined') renderHomeEvents();
});

// Expose globally
window.SITIOS = SITIOS;
