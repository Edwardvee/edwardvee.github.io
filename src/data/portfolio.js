// ╭────────────────────────────────────────────────────────────────╮
// │  portfolio.js — TODO el contenido del portafolio vive aquí.     │
// │  Edita estos datos y el resto de la web se regenera sola.       │
// ╰────────────────────────────────────────────────────────────────╯

export const profile = {
  name: 'Iván',
  fullName: 'Lautaro Iván Quiroga',
  handle: 'ivan', // usuario que aparece en rutas y prompt: ~/ivan
  role: 'Cybersecurity Analyst',
  tagline: 'Redes · Linux · Hardening · Respuesta a incidentes',
  location: 'Buenos Aires, Argentina',
  status: 'Open to work — buscando mi primer rol en ciberseguridad',
  cv: `${import.meta.env.BASE_URL}cv.pdf`, // archivo en /public (respeta la ruta base de GitHub Pages)

  // Cabecera ASCII del dashboard (fuente "ANSI Shadow").
  // Genera la tuya en https://patorjk.com/software/taag/ si cambias el nombre.
  ascii: [
    '██╗██╗   ██╗ █████╗ ███╗   ██╗',
    '██║██║   ██║██╔══██╗████╗  ██║',
    '██║██║   ██║███████║██╔██╗ ██║',
    '██║╚██╗ ██╔╝██╔══██║██║╚██╗██║',
    '██║ ╚████╔╝ ██║  ██║██║ ╚████║',
    '╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝',
  ],

  // Admite **negrita**, `código` y [enlaces](https://...)
  about: [
    'Estudiante de **Ciencias de la Computación (UBA)** y **Técnico en Computación**, con base sólida en soporte técnico, administración de sistemas **Linux/Windows**, redes y scripting con `Python` y `Bash`.',
    'Tengo experiencia en soporte de conectividad y gestión de incidentes, QA de aplicaciones y desarrollo frontend con `React` y `TypeScript`. Me formé en hardening de servidores, gestión de logs y respuesta a incidentes, y monto mis propios laboratorios para practicar.',
    'Perfil analítico y metódico, con buena documentación técnica e **inglés C2**.',
  ],
  lookingFor: [
    'Un primer rol en **ciberseguridad**: SOC Analyst L1, Blue Team o seguridad de infraestructura',
    'Un equipo donde aplicar lo que sé de redes, Linux y gestión de incidentes',
    'Seguir creciendo en hardening, monitoreo y respuesta a incidentes',
  ],
  now: [
    'Cursando la **Licenciatura en Ciencias de la Computación** en la UBA',
    'Ampliando mi **homelab** con Windows Server, Active Directory y Linux',
    'Automatizando tareas de mantenimiento con `Bash` y `Python`',
  ],
  interests: ['Hardening', 'Respuesta a incidentes', 'Gestión de logs', 'Redes', 'Active Directory', 'Automatización'],
}

// ── Experiencia ──────────────────────────────────────────────────────
// Se muestra como `git log` en experience.log (la más reciente primero)
export const experience = [
  {
    role: 'Soporte Técnico de Redes y Conectividad L1',
    company: 'CAT Technologies',
    dates: 'Jul 2026 – Ago 2026',
    bullets: [
      'Diagnóstico y resolución de incidencias de conectividad de red y servicios para usuarios finales, cumpliendo los SLAs establecidos.',
      'Documentación de tickets y escalamiento oportuno de incidentes a niveles superiores de ingeniería.',
    ],
  },
  {
    role: 'QA Automation & Testing Trainee',
    company: 'A1QA',
    dates: 'Dic 2025 – Mar 2026',
    bullets: [
      'Ejecución de pruebas funcionales y automatizadas sobre endpoints y servicios RESTful con Postman y scripts de prueba.',
      'Análisis de errores, aislamiento de bugs y gestión del ciclo de vida de incidencias en Jira.',
      'Documentación técnica de procesos funcionales y flujos de trabajo.',
    ],
  },
  {
    role: 'Frontend Developer (Pasantía)',
    company: 'Bewise',
    dates: 'Ago 2024 – Oct 2024',
    bullets: [
      'Desarrollo y corrección de bugs en interfaces web con React y TypeScript, integrando APIs RESTful (JSON).',
      'Diagnóstico de errores de comunicación cliente-servidor.',
      'Trabajo en equipo ágil (Scrum) con Git y participación en revisiones de código.',
    ],
  },
  {
    role: 'Soporte IT y Homelab de Sistemas',
    company: 'Proyectos independientes',
    dates: 'Ene 2023 – presente',
    bullets: [
      'Despliegue y administración de laboratorios con Windows Server y Active Directory (usuarios, GPOs básicas) y Linux (Debian/Arch).',
      'Configuración de redes locales, VPNs y acceso remoto; diagnóstico de hardware y problemas de sistema operativo para clientes particulares.',
      'Automatización de tareas de mantenimiento con scripts en Bash y Python.',
    ],
  },
]

// ── Proyectos ────────────────────────────────────────────────────────
// slug → nombre del archivo en projects/<slug>.md
export const projects = [
  {
    slug: 'ad-hardening-lab',
    title: 'Laboratorio de Active Directory, Redes y Hardening',
    summary: 'Dominio de Active Directory, servidores Linux endurecidos con Bash y monitoreo de red.',
    status: 'terminado',
    year: 'Ago 2025 – Nov 2025',
    stack: ['Active Directory', 'Windows Server', 'Linux', 'Bash', 'Wireshark', 'Nmap'],
    description: [
      'Armado de un dominio de **Active Directory** en laboratorio, con usuarios, **GPOs** y permisos, junto con la administración de servidores **Linux**.',
      'Endurecimiento de los servidores Linux mediante scripts en `Bash` (políticas de contraseñas y auditoría) y monitoreo de la red con **Wireshark** y **Nmap**.',
    ],
    highlights: [
      'Dominio de AD con usuarios, GPOs y permisos configurados',
      'Scripts de hardening en Bash: políticas de contraseñas y auditoría',
      'Monitoreo y análisis de tráfico con Wireshark y Nmap',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/Edwardvee' }],
  },
  {
    slug: 'homelab',
    title: 'Homelab de Sistemas',
    summary: 'Laboratorio propio con Windows Server, Active Directory y Linux (Debian/Arch).',
    status: 'activo',
    year: 'Ene 2023 – presente',
    stack: ['Windows Server', 'Active Directory', 'Debian', 'Arch Linux', 'VPN', 'Python', 'Bash'],
    description: [
      'Laboratorio personal donde despliego y administro **Windows Server** con **Active Directory** (usuarios, GPOs básicas) y servidores **Linux** (Debian/Arch).',
      'Lo uso para practicar configuración de redes locales, **VPNs** y acceso remoto, y para automatizar tareas de mantenimiento con `Bash` y `Python`.',
    ],
    highlights: [
      'Administración de Windows Server y Active Directory',
      'Configuración de redes locales, VPNs y acceso remoto',
      'Automatización de mantenimiento con scripts en Bash y Python',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/Edwardvee' }],
  },
]

// ── Skills ───────────────────────────────────────────────────────────
export const skills = [
  {
    key: 'seguridad',
    items: ['Hardening de servidores', 'Gestión de logs', 'Respuesta a incidentes', 'iptables', 'Wireshark', 'Nmap'],
  },
  {
    key: 'redes',
    items: ['TCP/IP', 'DNS', 'DHCP', 'HTTP/S', 'VPN', 'SSH', 'Samba', 'NFS', 'FTP', 'Apache', 'Squid'],
  },
  {
    key: 'sistemas',
    items: ['Linux (Debian/Ubuntu, Arch)', 'Windows 10/11', 'Windows Server', 'Active Directory (GPOs)', 'RAID / LVM', 'Virtualización'],
  },
  {
    key: 'programacion',
    items: ['Python', 'Bash', 'SQL', 'JavaScript / TypeScript', 'React', 'Node.js', 'Git', 'Docker (básico)'],
  },
  {
    key: 'testing_soporte',
    items: ['Pruebas funcionales y automatizadas', 'Postman', 'APIs RESTful (JSON)', 'Jira', 'Tickets y SLAs', 'Diagnóstico HW/SW'],
  },
]

// ── Formación y certificaciones ──────────────────────────────────────
export const education = [
  {
    title: 'Licenciatura en Ciencias de la Computación',
    center: 'Universidad de Buenos Aires (UBA)',
    years: 'Mar 2025 - presente',
    note: 'Algoritmos, lógica, sistemas operativos y arquitectura de computadoras',
  },
  {
    title: 'Técnico en Computación',
    center: 'E.T N°26 "Confederación Suiza"',
    years: 'Mar 2019 - Dic 2024',
    note: 'Promedio 8.54 · redes (TCP/IP, routing, switching), diagnóstico HW/SW, cliente/servidor',
  },
]

// status: 'completado' | 'en curso' | 'planeado'
export const certifications = [
  {
    name: 'Diplomado en Administración de Redes',
    issuer: 'UTN-FRD',
    status: 'completado',
    year: 'Ago 2025 - Jul 2026',
    note: 'Linux/Debian, servicios de red (DHCP, DNS, SSH, Samba, Apache, Squid, iptables), hardening, logs y respuesta a incidentes',
  },
  { name: 'Cybersecurity Essentials (LFC108)', issuer: 'The Linux Foundation', status: 'completado', year: 'Ene 2025' },
  { name: 'Test Developer Certification', issuer: 'A1QA', status: 'completado', year: 'Mar 2026' },
]

export const languages = [
  { name: 'Español', level: 'nativo' },
  { name: 'Inglés', level: 'C2 (EF SET) — documentación técnica y reportes' },
]

// ── Contacto ─────────────────────────────────────────────────────────
export const contact = [
  { key: 'EMAIL', value: 'quirogalautaroivan@gmail.com', href: 'mailto:quirogalautaroivan@gmail.com' },
  { key: 'GITHUB', value: 'github.com/Edwardvee', href: 'https://github.com/Edwardvee' },
  { key: 'UBICACION', value: 'Buenos Aires, Argentina' },
  // Descomenta si quiere mostrar el teléfono públicamente:
  // { key: 'TELEFONO', value: '011 5705-4567', href: 'tel:+541157054567' },
]
