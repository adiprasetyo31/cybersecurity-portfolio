# Adi Prasetyo · Cybersecurity Portfolio

Personal portfolio of an entry-level SOC analyst. It collects my case studies, lab reports, credentials and a monthly learning log in one place.

**Live site:** _coming soon_

![Astro](https://img.shields.io/badge/Astro-7-ff5d01?logo=astro&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.180-000000?logo=threedotjs&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88ce02?logo=greensock&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)

---

## What's inside

**Case studies**, each written as problem → action → outcome:

| # | Case study | Focus |
|---|---|---|
| 1 | A password strength classifier that explains itself (thesis) | Security engineering, ML |
| 2 | Pivoting from one suspicious VPN login to a wider malware campaign | Threat intel, MITRE ATT&CK |
| 3 | Triaging a reported phishing email | Email headers, SPF/DKIM/DMARC, IOCs |
| 4 | Hunting through VPN logs in Kibana and Splunk | SIEM, KQL, SPL |
| 5 | SOC home lab, built in phases | Up next |

**Lab reports** (PDF, in [`public/reports/`](public/reports/)):

- Threat Intel: VPN Login Investigation
- Phishing Analysis
- VPN Log Investigation in Kibana
- OSINT Image Geolocation

**Also on the site:** credentials (TryHackMe, Cisco NetAcad, OPSWAT), a toolkit overview, a skills-to-roles map and a monthly learning log.

> Lab work comes from TryHackMe rooms. Reports describe method and findings, and never include flags or room answers.

---

## Tech stack

- **[Astro 7](https://astro.build)**: static site generation, with content collections validated by a schema
- **[Three.js](https://threejs.org)**: the interactive 3D globe in the hero
- **[Lenis](https://lenis.darkroom.engineering)**: smooth scrolling
- **[GSAP](https://gsap.com)**: scroll-triggered reveal animations

Accessibility: visitors who have "reduce motion" turned on get a version with no animation.

---

## Run locally

Requires **Node.js 22.23+**.

```bash
git clone https://github.com/adiprasetyo31/cybersecurity-portfolio.git
cd cybersecurity-portfolio
npm install
npm run dev        # http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview the production build |

---

## Project structure

```
src/
├── content/work/     Case studies, one Markdown file each
├── data/             Reports, credentials, rooms, log, toolkit, roles (JSON)
├── components/       One component per page section
├── layouts/          Base layout, <head> and SEO
├── scripts/          globe.ts (Three.js), motion.ts (Lenis + GSAP)
└── styles/           Design tokens and global styles
public/
└── reports/          Lab report PDFs
```

Content lives in `src/content` and `src/data`, and presentation lives in `src/components`, so updating the portfolio rarely means touching code.

---

## Contact

- GitHub: [@adiprasetyo31](https://github.com/adiprasetyo31)
- For email, LinkedIn and TryHackMe, see the Contact section on the live site.

---

© 2026 Adi Prasetyo. The code is free to use as a reference. The written content, reports and personal details are mine, so please don't republish them as your own.
