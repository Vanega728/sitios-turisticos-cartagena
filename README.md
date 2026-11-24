# 🏖️ Sitios Turísticos Cartagena de Indias

Proyecto web académico sobre los sitios turísticos de Cartagena de Indias, Colombia.
Referencia: [visitcartagena.com.co](https://www.visitcartagena.com.co/)

---

## 📁 Estructura del Proyecto

```
SitiosTuristicos_Cartagena/
│
├── index.html          ← Página principal / Home
├── sitios.html         ← Catálogo de sitios turísticos con filtros
├── eventos.html        ← Eventos y actividades próximas
├── agenda.html         ← Agenda personal del usuario
├── dashboard.html      ← Panel de usuario
├── login.html          ← Inicio de sesión
├── register.html       ← Registro de cuenta
│
├── css/
│   ├── style.css       ← Estilos principales (paleta, componentes)
│   ├── responsive.css  ← Media queries (tablet, móvil)
│   ├── eventos.css     ← Estilos específicos de la página de eventos
│   └── login.css       ← Estilos de autenticación
│
├── js/
│   ├── app.js          ← Datos de sitios + lógica general
│   ├── eventos.js      ← Datos y rendering de eventos
│   ├── filtros.js      ← Filtrado y modal de sitios
│   ├── usuarios.js     ← Autenticación (localStorage)
│   ├── agenda.js       ← Gestión de agenda personal
│   ├── calendario.js   ← Mini-calendario de eventos
│   ├── recomendaciones.js ← Motor de recomendaciones
│   └── grafo.js        ← Relaciones entre sitios
│
└── asset/              ← Nota: carpeta en singular (no "assets")
    ├── img/            ← Imágenes (ya incluidas; ver convención más abajo)
    └── video/          ← Videos (opcional)
```

---

## 🏛️ Sitios Turísticos incluidos (12)

| Sitio | Categoría |
|-------|-----------|
| Castillo San Felipe de Barajas | Historia |
| Ciudad Amurallada | Historia |
| Convento La Popa | Historia |
| Torre del Reloj | Historia |
| Islas del Rosario | Naturaleza |
| Isla Tierra Bomba | Naturaleza |
| Barrio Getsemaní | Cultura |
| Iglesia Santo Domingo | Cultura |
| Mercado de Bazurto | Cultura |
| Palacio de la Inquisición | Museo |
| Playa Blanca – Barú | Playa |
| Bocagrande | Playa |

---

## 🎉 Funcionalidades

- **Filtrado** de sitios por categoría (historia, playa, cultura, naturaleza, museo)
- **Modal de detalle** para cada sitio turístico
- **Búsqueda** de eventos por nombre o lugar
- **Agenda personal** guardada en localStorage
- **Mini-calendario** con marcadores de eventos
- **Sistema de autenticación** (registro/login) con localStorage
- **Dashboard** de usuario con estadísticas
- **Motor de recomendaciones** basado en preferencias
- **Grafo de relaciones** entre sitios cercanos
- **Diseño responsivo** para móvil, tablet y escritorio

---

## 🎨 Diseño

- **Paleta**: Ocre dorado (`#C9963A`), terracota (`#C1533A`), azul Caribe (`#1A5276`), crema (`#FAF6EE`)
- **Tipografías**: Playfair Display (headings) + Crimson Pro (body)
- **Estilo**: Luxury editorial con toques coloniales caribeños
- **Animaciones**: Fade-in del hero, hover cards, transiciones suaves

---

## 🖼️ Imágenes

> **Convención de nombres (importante):** la carpeta es `asset/` (singular). El catálogo de `js/app.js` genera la ruta de cada tarjeta con `asset/img/<id>.jpg` (ver `js/filtros.js`), por lo que el archivo debe llamarse exactamente como el `id` del sitio. `index.html` usa los nombres originales y `css/` usa `hero-bg.jpg` de fondo.

Imágenes incluidas en `asset/img/` (agrega las tuyas con estos nombres si quieres reemplazarlas):
- `hero-bg.jpg` — Vista aérea de Cartagena
- `castillo.jpg` — Castillo San Felipe
- `murallas.jpg` — Ciudad Amurallada
- `islas.jpg` — Islas del Rosario
- `getsemani.jpg` — Barrio Getsemaní
- `baru.jpg` — Playa Blanca Barú
- `inquisicion.jpg` — Palacio de la Inquisición
- `popa.jpg`, `bocagrande.jpg`, `torre-reloj.jpg`, etc.

### Créditos de las fotos corregidas (2026-11-23)

- `getsemani.jpg` — *Getsemani Street Scene, Cartagena, Colombia* © Joe Ross, [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/). [Archivo original](https://commons.wikimedia.org/wiki/File:Getsemani_Street_Scene,_Cartagena,_Colombia_(23957417154).jpg).
- `torre-reloj.jpg` — *Clock tower Plaza de la Paz in Cartagena* © JD Lasica, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). [Archivo original](https://commons.wikimedia.org/wiki/File:Clock_tower_Plaza_de_la_Paz_in_Cartagena_(40012936741).jpg). Antes esta foto era una copia de `murallas.jpg`, por eso se veía la muralla en lugar de la torre.

Ambas se redimensionaron a 1280 px y se guardaron como JPG progresivo para que carguen rápido.

Fuentes recomendadas para las demás: [Colombia Travel](https://colombia.travel/es/cartagena) o imágenes propias.

---

## 🚀 Cómo usar

1. Abre `index.html` en tu navegador (no requiere servidor)
2. Navega por los sitios turísticos en `sitios.html`
3. Regístrate en `register.html` para guardar tu agenda
4. Explora eventos en `eventos.html` y añádelos a tu agenda

---

## 🧠 ¿Dónde se guardan los datos?

No hay servidor ni base de datos: todo vive en **tu navegador**. Hay dos almacenamientos distintos:

| Clave | Dónde vive | Cuánto dura | Qué contiene | Quién la escribe |
|---|---|---|---|---|
| `ctg_users` | `localStorage` | Hasta que borres los datos del sitio | Lista de cuentas `{id, nombre, email, password, agenda: []}` | `js/usuarios.js` al registrarte |
| `ctg_session` | `sessionStorage` | Hasta cerrar la pestaña | La cuenta logueada | `js/usuarios.js` al entrar/salir |
| `agenda` | `localStorage` | Hasta que borres los datos del sitio | Array de **IDs** de eventos, ej. `[1, 4]` | `js/eventos.js` (añadir) y `js/agenda.js` (quitar) |

**Cosas que conviene saber:**

- `SITIOS` (`js/app.js`) y `EVENTOS` (`js/eventos.js`) son arreglos fijos en el código: **no se guardan**, se recrean en cada carga.
- La agenda guarda solo números de ID; los nombres y fechas se buscan en `EVENTOS`. Por eso `agenda.html` carga `eventos.js` antes que `agenda.js`.
- El botón **«Añadir a mi Agenda»** del modal de sitios (`js/filtros.js`) **no guarda nada**: solo muestra un aviso. Los sitios no se persisten (a diferencia de los eventos).
- `agenda` es una clave global, no por usuario: el contador del dashboard la comparte.
- Al cambiar de navegador, de equipo o al borrar datos del sitio, cuentas y agenda desaparecen. Las contraseñas se guardan en texto plano: es solo para la práctica académica.

Cada archivo tiene comentarios con estos mismos datos al inicio (`DÓNDE SE GUARDA`) y en las líneas donde se lee o escribe `localStorage` / `sessionStorage`.
