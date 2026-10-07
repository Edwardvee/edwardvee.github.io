# ivan.nvim — portafolio estilo Neovim

Portafolio para un **Cybersecurity Analyst** con la interfaz de Neovim y el tema
[Catppuccin](https://catppuccin.com). Hecho con **React + Vite + Tailwind CSS v4**.

## Arrancar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera /dist para desplegar (Vercel, Netlify, GitHub Pages…)
```

## Publicar en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub (rama `main`).
2. En el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Cada `push` a `main` ejecuta [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
   que compila y publica en `https://<usuario>.github.io/<repo>/`.

La configuración usa `base: './'` y rutas con `#` (`#/projects/homelab`), así que funciona en
cualquier subruta sin `404.html` ni ajustes extra.

## Personalizar

**Todo el contenido está en [`src/data/portfolio.js`](src/data/portfolio.js).**
Busca los comentarios `// TODO` y reemplaza los datos de ejemplo (nombre, proyectos,
certificaciones, enlaces de contacto…). Los textos admiten `**negrita**`, `` `código` ``
y `[enlaces](https://...)`.

- **Nombre en ASCII:** genera el tuyo en <https://patorjk.com/software/taag/> con la fuente *ANSI Shadow*.
- **CV:** copia el PDF a `public/cv.pdf` y pon `cv: '/cv.pdf'` en `profile`.
- **Proyectos:** cada objeto del array `projects` crea su propio archivo `projects/<slug>.md`.
- **Tomoko del dashboard:** se genera desde `assets/tomoko.jpg` con `npm run tomoko`
  (script [`scripts/img2braille.mjs`](scripts/img2braille.mjs): imagen → Braille coloreado con Catppuccin).
  Para usar otra imagen: `node scripts/img2braille.mjs otra.jpg 64 src/data/tomoko.js`.
  Funciona mejor con fondo blanco liso; los colores se ajustan en `ANCHORS`.

## Idiomas

La web está en **español e inglés** y elige sola: usa el idioma del navegador del visitante
(`es-*` → español, cualquier otro → inglés). Se puede cambiar con `:lang en` / `:lang es` o
`Espacio` + `l`, y la elección se recuerda.

- Contenido en español: [`src/data/portfolio.js`](src/data/portfolio.js)
- Contenido en inglés: [`src/data/portfolio.en.js`](src/data/portfolio.en.js) — si cambias uno, actualiza el otro.
- Textos de la interfaz: [`src/i18n.js`](src/i18n.js)

## Cómo se navega

| Comando / tecla        | Acción                                  |
| ---------------------- | --------------------------------------- |
| `:about` `:projects` `:skills` `:certs` `:contact` | Abrir sección |
| `:e <archivo>`         | Abrir archivo (con `<Tab>` autocompleta) |
| `:Telescope` / `Ctrl+p`| Buscador difuso de archivos             |
| `:Neotree` / `Ctrl+n`  | Mostrar / ocultar explorador            |
| `:colorscheme catppuccin-latte` | Cambiar sabor (mocha, macchiato, frappe, latte) |
| `:set nornu` `:set nowrap` | Opciones del editor                 |
| `j` `k` `gg` `G` `Ctrl+d/u` `{` `}` | Moverse                    |
| `Enter`                | Abrir enlace / archivo de la línea      |
| `/texto` `n` `N`       | Buscar                                  |
| `H` / `L`              | Buffer anterior / siguiente             |
| `Espacio`              | Menú which-key                          |
| `?` / `:help`          | Ayuda                                   |

También hay algunos easter eggs (prueba `:q`, `:w`, `:sudo`…). En móvil aparecen
botones flotantes para el menú y la línea de comandos, y todo es clicable.

## Estructura

```
src/
├─ data/portfolio.js     ← contenido (lo único que hay que editar)
├─ lib/
│  ├─ buffers.js         genera los "archivos" (about.md, skills.lua…) desde los datos
│  ├─ syntax.js          resaltado de sintaxis y helpers de líneas
│  └─ commands.js        comandos, autocompletado y búsqueda difusa
├─ components/           Tabline, Sidebar (neo-tree), Editor, Statusline (lualine),
│                        Cmdline, Telescope, WhichKey, Notifications, Dashboard
└─ App.jsx               estado, modos y atajos de teclado
```
