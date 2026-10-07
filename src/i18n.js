import { createContext, useContext } from 'react'

export const LANGS = ['es', 'en']

// 1) elección guardada (:lang) · 2) idioma del navegador · 3) inglés
export function detectLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (LANGS.includes(saved)) return saved
  } catch {
    /* modo privado */
  }
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const l of prefs) {
    const code = (l || '').slice(0, 2).toLowerCase()
    if (LANGS.includes(code)) return code
  }
  return 'en'
}

export const UI = {
  es: {
    welcomeTitle: 'Bienvenido 👋',
    welcome: 'Escribe : para usar comandos, pulsa <Espacio> para el menú o ? para la ayuda. También puedes hacer click en todo.',
    langSwitched: 'Idioma: español',
    readonlyTitle: 'Solo lectura',
    readonlyBang: 'Buen intento. Este portafolio no se puede modificar 🔒',
    quitTitle: '¿Salir de Vim?',
    quit: 'Nadie ha conseguido salir de Vim jamás. Mejor quédate y echa un vistazo a :projects 😉',
    scan: 'Escaneando… 1 host activo: tú 👀  Recuerda: solo con autorización por escrito.',
    rm: 'Permission denied. Me tomo la seguridad en serio 🛡️',
    cvOnRequest: 'Disponible bajo petición. Escríbeme desde :contact 📬',
    recording: 'recording @… es broma, este buffer es de solo lectura 😄',
    dash: {
      about: 'Sobre mí', experience: 'Experiencia', projects: 'Proyectos', skills: 'Skills',
      certs: 'Formación y certificaciones', contact: 'Contacto', find: 'Buscar archivo', theme: 'Cambiar tema', help: 'Ayuda y comandos',
    },
    plugins: (n, ms) => ['Neovim cargó ', n, ' plugins en ', ms],
    quote: '“La seguridad es un proceso, no un producto.” — Bruce Schneier',
    noVim: '¿No usas Vim?',
    noVimHint: 'Haz click en cualquier opción, o escribe',
    tomoko: ['e-eh…', '¿v-vas a contratarlo?'],
    leader: {
      explorer: 'Explorador', find: 'buscar', findFiles: 'Buscar archivos', findBuffer: 'Buscar en el buffer',
      about: 'Sobre mí', experience: 'Experiencia', projects: 'Proyectos', skills: 'Skills', certs: 'Certificaciones', contact: 'Contacto',
      buffer: 'buffer', next: 'Siguiente', prev: 'Anterior', close: 'Cerrar',
      ui: 'ui', colorscheme: 'Cambiar colorscheme', relnum: 'Números relativos', wrap: 'Ajuste de línea', lang: 'English',
      cmdline: 'Línea de comandos', dashboard: 'Dashboard', help: 'Ayuda',
    },
    wkClose: 'cerrar', wkBack: 'atrás',
    cmdHint: ['escribe ', ':help', ' y pulsa ', '<Enter>', ' para ver los comandos'],
    sidebarOpen: 'abrir', sidebarClose: 'cerrar', sidebarModified: '= proyecto en curso',
    tsPlaceholder: 'Busca un archivo…', tsEmpty: 'Sin resultados',
    secretClose: ['o', 'para cerrar'],
    menuAria: 'Menú de atajos', cmdAria: 'Línea de comandos', readonlyAria: 'solo lectura',
  },
  en: {
    welcomeTitle: 'Welcome 👋',
    welcome: 'Type : to run commands, press <Space> for the menu or ? for help. You can also click on everything.',
    langSwitched: 'Language: English',
    readonlyTitle: 'Read-only',
    readonlyBang: "Nice try. This portfolio can't be modified 🔒",
    quitTitle: 'Quit Vim?',
    quit: 'Nobody has ever managed to quit Vim. Better stay and check out :projects 😉',
    scan: 'Scanning… 1 host up: you 👀  Remember: only with written authorization.',
    rm: 'Permission denied. I take security seriously 🛡️',
    cvOnRequest: 'Available on request. Reach me via :contact 📬',
    recording: "recording @… just kidding, this buffer is read-only 😄",
    dash: {
      about: 'About me', experience: 'Experience', projects: 'Projects', skills: 'Skills',
      certs: 'Education & certifications', contact: 'Contact', find: 'Find file', theme: 'Change theme', help: 'Help & commands',
    },
    plugins: (n, ms) => ['Neovim loaded ', n, ' plugins in ', ms],
    quote: '“Security is a process, not a product.” — Bruce Schneier',
    noVim: "Don't use Vim?",
    noVimHint: 'Click any option, or type',
    tomoko: ['u-uh…', 'a-are you hiring him?'],
    leader: {
      explorer: 'Explorer', find: 'find', findFiles: 'Find files', findBuffer: 'Search in buffer',
      about: 'About me', experience: 'Experience', projects: 'Projects', skills: 'Skills', certs: 'Certifications', contact: 'Contact',
      buffer: 'buffer', next: 'Next', prev: 'Previous', close: 'Close',
      ui: 'ui', colorscheme: 'Change colorscheme', relnum: 'Relative numbers', wrap: 'Line wrap', lang: 'Español',
      cmdline: 'Command line', dashboard: 'Dashboard', help: 'Help',
    },
    wkClose: 'close', wkBack: 'back',
    cmdHint: ['type ', ':help', ' and press ', '<Enter>', ' to see the commands'],
    sidebarOpen: 'open', sidebarClose: 'close', sidebarModified: '= ongoing project',
    tsPlaceholder: 'Search for a file…', tsEmpty: 'No results',
    secretClose: ['or', 'to close'],
    menuAria: 'Keymap menu', cmdAria: 'Command line', readonlyAria: 'read-only',
  },
}

export const LangContext = createContext('es')
export const useLang = () => useContext(LangContext)
export const useT = () => UI[useContext(LangContext)]
