// English version of portfolio.js — keep both files in sync.
// Fields that don't depend on the language are reused from the Spanish file.
import { profile as es, contact as esContact } from './portfolio'

export const profile = {
  ...es,
  tagline: 'Networking · Linux · Hardening · Incident Response',
  location: 'Buenos Aires, Argentina',
  status: 'Open to work — looking for my first cybersecurity role',

  about: [
    '**Computer Science** student at the University of Buenos Aires (UBA) and **Computer Technician**, with a solid background in technical support, **Linux/Windows** systems administration, networking and scripting with `Python` and `Bash`.',
    'Experienced in connectivity support and incident management, application QA and frontend development with `React` and `TypeScript`. Trained in server hardening, log management and incident response, and I build my own labs to practice.',
    'Analytical and methodical, with strong technical writing skills and **C2 English**.',
  ],
  lookingFor: [
    'A first role in **cybersecurity**: SOC Analyst L1, Blue Team or infrastructure security',
    'A team where I can apply what I know about networking, Linux and incident management',
    'Keep growing in hardening, monitoring and incident response',
  ],
  now: [
    'Studying a **BSc in Computer Science** at UBA',
    'Expanding my **homelab** with Windows Server, Active Directory and Linux',
    'Automating maintenance tasks with `Bash` and `Python`',
  ],
  interests: ['Hardening', 'Incident Response', 'Log Management', 'Networking', 'Active Directory', 'Automation'],
}

export const experience = [
  {
    role: 'L1 Network & Connectivity Technical Support',
    company: 'CAT Technologies',
    dates: 'Jul 2026 – Aug 2026',
    bullets: [
      'Diagnosed and resolved network connectivity and service incidents for end users, meeting the established SLAs.',
      'Documented tickets and escalated incidents to higher engineering tiers in a timely manner.',
    ],
  },
  {
    role: 'QA Automation & Testing Trainee',
    company: 'A1QA',
    dates: 'Dec 2025 – Mar 2026',
    bullets: [
      'Ran functional and automated tests against RESTful endpoints and services with Postman and test scripts.',
      'Analyzed errors, isolated bugs and managed the issue lifecycle in Jira.',
      'Wrote technical documentation for functional processes and workflows.',
    ],
  },
  {
    role: 'Frontend Developer (Internship)',
    company: 'Bewise',
    dates: 'Aug 2024 – Oct 2024',
    bullets: [
      'Built and fixed web interfaces with React and TypeScript, integrating RESTful APIs (JSON).',
      'Diagnosed client-server communication errors.',
      'Worked in an agile team (Scrum) with Git and took part in code reviews.',
    ],
  },
  {
    role: 'IT Support & Systems Homelab',
    company: 'Independent projects',
    dates: 'Jan 2023 – present',
    bullets: [
      'Deployed and administered labs with Windows Server and Active Directory (users, basic GPOs) and Linux (Debian/Arch).',
      'Set up local networks, VPNs and remote access; diagnosed hardware and operating system issues for private clients.',
      'Automated maintenance tasks with Bash and Python scripts.',
    ],
  },
]

export const projects = [
  {
    slug: 'ad-hardening-lab',
    title: 'Active Directory, Networking & Hardening Lab',
    summary: 'Active Directory domain, Linux servers hardened with Bash and network monitoring.',
    status: 'done',
    year: 'Aug 2025 – Nov 2025',
    stack: ['Active Directory', 'Windows Server', 'Linux', 'Bash', 'Wireshark', 'Nmap'],
    description: [
      'Built an **Active Directory** domain in a lab, with users, **GPOs** and permissions, alongside the administration of **Linux** servers.',
      'Hardened the Linux servers with `Bash` scripts (password policies and auditing) and monitored the network with **Wireshark** and **Nmap**.',
    ],
    highlights: [
      'AD domain with users, GPOs and permissions configured',
      'Bash hardening scripts: password policies and auditing',
      'Traffic monitoring and analysis with Wireshark and Nmap',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/Edwardvee' }],
  },
  {
    slug: 'homelab',
    title: 'Systems Homelab',
    summary: 'Personal lab with Windows Server, Active Directory and Linux (Debian/Arch).',
    status: 'active',
    year: 'Jan 2023 – present',
    stack: ['Windows Server', 'Active Directory', 'Debian', 'Arch Linux', 'VPN', 'Python', 'Bash'],
    description: [
      'Personal lab where I deploy and manage **Windows Server** with **Active Directory** (users, basic GPOs) and **Linux** servers (Debian/Arch).',
      'I use it to practice local network setup, **VPNs** and remote access, and to automate maintenance tasks with `Bash` and `Python`.',
    ],
    highlights: [
      'Windows Server and Active Directory administration',
      'Local networks, VPNs and remote access setup',
      'Maintenance automation with Bash and Python scripts',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/Edwardvee' }],
  },
]

export const skills = [
  {
    key: 'security',
    items: ['Server hardening', 'Log management', 'Incident response', 'iptables', 'Wireshark', 'Nmap'],
  },
  {
    key: 'networking',
    items: ['TCP/IP', 'DNS', 'DHCP', 'HTTP/S', 'VPN', 'SSH', 'Samba', 'NFS', 'FTP', 'Apache', 'Squid'],
  },
  {
    key: 'systems',
    items: ['Linux (Debian/Ubuntu, Arch)', 'Windows 10/11', 'Windows Server', 'Active Directory (GPOs)', 'RAID / LVM', 'Virtualization'],
  },
  {
    key: 'programming',
    items: ['Python', 'Bash', 'SQL', 'JavaScript / TypeScript', 'React', 'Node.js', 'Git', 'Docker (basic)'],
  },
  {
    key: 'testing_support',
    items: ['Functional & automated testing', 'Postman', 'RESTful APIs (JSON)', 'Jira', 'Tickets & SLAs', 'HW/SW troubleshooting'],
  },
]

export const education = [
  {
    title: 'BSc in Computer Science',
    center: 'University of Buenos Aires (UBA)',
    years: 'Mar 2025 - present',
    note: 'Algorithms, logic, operating systems and computer architecture',
  },
  {
    title: 'Computer Technician',
    center: 'E.T N°26 "Confederación Suiza" (technical high school)',
    years: 'Mar 2019 - Dec 2024',
    note: 'GPA 8.54/10 · networking (TCP/IP, routing, switching), HW/SW troubleshooting, client/server',
  },
]

export const certifications = [
  {
    name: 'Network Administration Diploma',
    issuer: 'UTN-FRD',
    status: 'completed',
    year: 'Aug 2025 - Jul 2026',
    note: 'Linux/Debian, network services (DHCP, DNS, SSH, Samba, Apache, Squid, iptables), hardening, logs and incident response',
  },
  { name: 'Cybersecurity Essentials (LFC108)', issuer: 'The Linux Foundation', status: 'completed', year: 'Jan 2025' },
  { name: 'Test Developer Certification', issuer: 'A1QA', status: 'completed', year: 'Mar 2026' },
]

export const languages = [
  { name: 'Spanish', level: 'native' },
  { name: 'English', level: 'C2 (EF SET) — technical documentation and reports' },
]

export const contact = esContact.map((c) => (c.key === 'UBICACION' ? { ...c, key: 'LOCATION' } : c))
