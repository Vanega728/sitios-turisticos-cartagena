// =====================================================
// USUARIOS.JS – Autenticación Cartagena
// =====================================================
// DÓNDE SE GUARDA (lo más importante de este archivo):
//   • localStorage['ctg_users']     → TODAS las cuentas registradas.
//                                     Permanece al cerrar el navegador.
//   • sessionStorage['ctg_session'] → la cuenta logueada AHORA.
//                                     Se borra al cerrar la pestaña.
// Todo vive en ESTE navegador: no hay base de datos ni servidor.
// Aviso: la contraseña se guarda en texto plano; es solo para la práctica académica.

const USERS_KEY = 'ctg_users';      // clave de localStorage (permanente)
const SESSION_KEY = 'ctg_session';  // clave de sessionStorage (temporal)

// Lee la lista de cuentas desde localStorage. Si no existe, devuelve [].
// JSON.parse es necesario porque en el almacenamiento todo se guarda como TEXTO.
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

// Lee la sesión actual desde sessionStorage (null = nadie logueado).
function getSession() {
  return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
}

// Guarda la sesión actual. JSON.stringify convierte el objeto en texto.
function setSession(user) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

// Cerrar sesión = borrar SOLO la sesión; las cuentas siguen en localStorage.
function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.href = 'login.html';
}

// ── Login ─────────────────────────────────────────
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const pass  = document.getElementById('password').value;

  const users = getUsers();
  const user  = users.find(u => u.email === email && u.password === pass);

  if (!user) {
    showFormError('Correo o contraseña incorrectos.');
    return;
  }

  setSession(user);
  window.location.href = 'dashboard.html';
}

// ── Register ───────────────────────────────────--
function handleRegister(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const email  = document.getElementById('email').value.trim();
  const pass   = document.getElementById('password').value;
  const pass2  = document.getElementById('password2')?.value;

  if (pass2 && pass !== pass2) {
    showFormError('Las contraseñas no coinciden.');
    return;
  }

  const users = getUsers();
  if (users.find(u => u.email === email)) {
    showFormError('Ya existe una cuenta con ese correo.');
    return;
  }

  // Account nueva. Se agrega a la lista y ESA LISTA COMPLETA se vuelve a guardar
  // en localStorage bajo la clave 'ctg_users' (no se guarda cada usuario por separado).
  const newUser = { id: Date.now(), nombre, email, password: pass, agenda: [] };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users)); // ← persistencia permanente
  setSession(newUser);                                    // ← sesión temporal
  window.location.href = 'dashboard.html';
}

function showFormError(msg) {
  let err = document.getElementById('form-error');
  if (!err) {
    err = document.createElement('div');
    err.id = 'form-error';
    err.style.cssText = `
      background: #fde8e4; color: var(--terracota); border: 1px solid var(--terracota);
      border-radius: 8px; padding: .75rem 1rem; font-size: .9rem; margin-bottom: 1rem;
    `;
    const form = document.querySelector('form') || document.querySelector('.auth-form-box');
    if (form) form.insertBefore(err, form.querySelector('.form-group'));
  }
  err.textContent = msg;
}

// ── Dashboard init ────────────────────────────────
function initDashboard() {
  const session = getSession();
  const name = document.getElementById('user-name');
  if (name) name.textContent = session ? session.nombre : 'Viajero';

  // El contador del dashboard lee la MISMA clave 'agenda' que usan
  // eventos.js (añadir) y agenda.js (quitar). Ojo: es global, no por usuario.
  const agendaCount = document.getElementById('agenda-count');
  if (agendaCount && session) {
    const saved = JSON.parse(localStorage.getItem('agenda') || '[]');
    agendaCount.textContent = saved.length;
  }
}

// ── Logout button ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const loginForm    = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const logoutBtn    = document.getElementById('logout-btn');

  if (loginForm)    loginForm.addEventListener('submit', handleLogin);
  if (registerForm) registerForm.addEventListener('submit', handleRegister);
  if (logoutBtn)    logoutBtn.addEventListener('click', logout);

  if (document.querySelector('.dashboard-layout')) initDashboard();
});

window.logout = logout;
