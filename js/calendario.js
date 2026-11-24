// =====================================================
// CALENDARIO.JS – Mini calendario de eventos
// =====================================================
// DÓNDE SE GUARDA: EN NINGÚN LADO. Solo lee EVENTOS (eventos.js) y dibuja
// el calendario en el contenedor que indique dashboard.html.
// El mes/año mostrado (calMes, calAno) son variables en memoria: al recargar
// la página vuelven al mes actual.

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS_CORTOS = ['D','L','M','M','J','V','S'];

let calMes = new Date().getMonth();
let calAno = new Date().getFullYear();

function getDiasConEventos() {
  if (!window.EVENTOS) return {};
  const dias = {};
  EVENTOS.forEach(ev => {
    const key = `${ev.fecha.getFullYear()}-${ev.fecha.getMonth()}-${ev.fecha.getDate()}`;
    dias[key] = (dias[key] || []);
    dias[key].push(ev);
  });
  return dias;
}

function renderCalendario(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const diasConEventos = getDiasConEventos();
  const primerDia = new Date(calAno, calMes, 1).getDay();
  const totalDias = new Date(calAno, calMes + 1, 0).getDate();
  const hoy = new Date();

  let html = `
    <div class="cal-nav" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
      <button onclick="cambiarMes(-1)" style="background:none; border:none; font-size:1.2rem; cursor:pointer; color:var(--oscuro);">◀</button>
      <strong style="font-family:var(--ff-display);">${MESES[calMes]} ${calAno}</strong>
      <button onclick="cambiarMes(1)" style="background:none; border:none; font-size:1.2rem; cursor:pointer; color:var(--oscuro);">▶</button>
    </div>
    <div class="cal-grid" style="display:grid; grid-template-columns:repeat(7,1fr); gap:4px; text-align:center;">
  `;

  // Nombres de los días (D, L, M, M...)
  DIAS_CORTOS.forEach(d => {
    html += `<div style="font-size:.7rem; font-weight:700; color:var(--gris); padding:.3rem 0;">${d}</div>`;
  });

  // Espacios vacíos antes del primer día
  for (let i = 0; i < primerDia; i++) {
    html += `<div></div>`;
  }

  // Días del mes
  for (let d = 1; d <= totalDias; d++) {
    const key = `${calAno}-${calMes}-${d}`;
    const tieneEvento = !!diasConEventos[key];
    const esHoy = d === hoy.getDate() && calMes === hoy.getMonth() && calAno === hoy.getFullYear();

    let cellStyle = `
      padding: .35rem; border-radius: 6px; font-size: .85rem; cursor: ${tieneEvento ? 'pointer' : 'default'};
      background: ${esHoy ? 'var(--oro)' : tieneEvento ? 'var(--arena)' : 'transparent'};
      color: ${esHoy ? 'var(--oscuro)' : 'inherit'};
      border: 1.5px solid ${tieneEvento ? 'var(--oro)' : 'transparent'};
      font-weight: ${esHoy ? '700' : 'normal'};
    `;

    html += `<div style="${cellStyle}" 
              onclick="${tieneEvento ? `mostrarEventosDia(${calAno}, ${calMes}, ${d})` : ''}"
              title="${tieneEvento ? diasConEventos[key].map(e=>e.nombre).join(', ') : ''}">${d}
              ${tieneEvento ? '<span style="display:block;width:5px;height:5px;background:var(--terracota);border-radius:50%;margin:0 auto;"></span>' : ''}
            </div>`;
  }

  html += `</div>`;
  container.innerHTML = html;
}

function cambiarMes(delta) {
  calMes += delta;
  if (calMes > 11) { calMes = 0; calAno++; }
  if (calMes < 0)  { calMes = 11; calAno--; }
  const containerId = document.querySelector('[id*="calendario"]')?.id;
  if (containerId) renderCalendario(containerId);
}

function mostrarEventosDia(ano, mes, dia) {
  const key = `${ano}-${mes}-${dia}`;
  const diasConEventos = getDiasConEventos();
  const eventos = diasConEventos[key] || [];

  const msg = eventos.map(e => `• ${e.nombre} – ${e.hora}`).join('\n');
  if (typeof showToast === 'function') {
    showToast(`${eventos.length} evento(s) el ${dia}/${mes+1}`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const calEl = document.getElementById('mini-calendario') || document.getElementById('calendario-full');
  if (calEl) renderCalendario(calEl.id);
});

window.cambiarMes = cambiarMes;
window.renderCalendario = renderCalendario;
window.mostrarEventosDia = mostrarEventosDia;
