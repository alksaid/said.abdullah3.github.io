/**
 * Portfolio Data — Edit all content from this single object.
 * Replace placeholder values with your real information.
 */
const portfolioData = {
  personal: {
    name: "Said Abdullah",
    role: "Software Engineer",
    tagline: "Go, MongoDB, React · Malang",
    headline: "Ten years on client web applications.",
    heroIntro:
      "I build web software for analytics, MIS, and reporting—mostly Go, MongoDB, and React. Based in Malang. Most of the last decade was client work at EACIIT (remote, 2020–2026) and before that Wiyasa, Epson, and smaller shops in East Java.",
    locationShort: "Malang, Indonesia",
    aboutSnippet:
      "Ten years in client-facing web apps: APIs, MongoDB schemas, React front ends, and whatever keeps production stable. Banks, manufacturers, and ops teams—not greenfield demos. I like code that's easy to change six months later. Earlier stack: C#/ASP.NET, Vue, Knockout, Kendo.",
    bio: "Software engineer based in Malang. I work mainly in Go, MongoDB, and React on analytics, MIS, data quality, and reporting systems. From 2020 to 2026 I was at EACIIT, remote, on products for banking, manufacturing, and healthcare clients. Before that: Wiyasa (Go/React), a short stint at KANO, Epson Batam (C#/ASP.NET), and my first role in Malang. Happy to talk about full-stack or backend-heavy roles.",
    location: "Malang, East Java, Indonesia",
    email: "said.abdullah3@gmail.com",
    phone: "+62 852 3022 6810",
    phoneHref: "tel:+6285230226810",
    github: "[GITHUB URL]",
    linkedin: "https://www.linkedin.com/in/said-abdullah-595045105",
    resume: "./assets/documents/resume.pdf",
    // Set to the public origin after deploy, e.g. "https://username.github.io"
    siteUrl: "",
    // Ganti file di assets/images/ (mis. profile.jpg) lalu sesuaikan path di bawah
    profileImage: "./assets/images/me.jpeg",
    logoInitial: "S"
  },

  skills: {
    daily: {
      title: "Day-to-day",
      items: ["Go", "MongoDB", "React", "JavaScript", "REST & WebSocket APIs", "Git", "Production support"]
    },
    data: {
      title: "Data & platforms",
      items: ["Apache Drill", "Apache Hive", "Solr", "MySQL", "PostgreSQL", "SQL Server", "Docker", "Nginx"]
    },
    also: {
      title: "Also in my toolkit",
      items: ["Python", "FastAPI", "LangGraph", "AWS Bedrock", "C# / ASP.NET", "Vue", "Knockout / Kendo UI", "PHP", "Java"]
    }
  },

  experience: [
    {
      title: "Software Engineer",
      company: "EACIIT",
      location: "Surabaya, East Java, Indonesia · Remote",
      duration: "Sep 2020 — Sep 2026",
      description:
        "Full-stack on Go, MongoDB, and React client products: analytics, MIS, data quality, and reporting. Feature work, releases, and production fixes.",
      achievements: [
        "JKLC: sales and dealer analytics—forecasting, KPI dashboards, data pipelines (Go, React, MongoDB); Ask EPM language queries via Python behind the Go API",
        "Continued development and maintenance of long-running client projects including Al Mansoori DDS Reporter",
        "Built and improved product modules such as user management, user analytics, and chat",
        "Worked on data-oriented solutions including SMARTDQ, RIDE (PetroAnalytica), and related platform features"
      ],
      technologies: ["Golang", "MongoDB", "React", "Python", "FastAPI", "LangGraph", "AWS Bedrock", "REST APIs", "WebSocket", "JavaScript"]
    },
    {
      title: "Software Engineer",
      company: "PT KANO",
      location: "Surabaya, East Java, Indonesia",
      duration: "Apr 2020 — Aug 2020",
      description: "Full-stack on an active delivery team.",
      achievements: [
        "Built features with Go, MongoDB, and React alongside the rest of the team."
      ],
      technologies: ["Golang", "JavaScript", "MongoDB", "React"]
    },
    {
      title: "Software Engineer",
      company: "PT Wiyasa Teknologi Nusantara",
      location: "Surabaya, East Java, Indonesia",
      duration: "Feb 2016 — Mar 2020",
      description: "Client projects: REST APIs, frontend modules, MongoDB integration, and application maintenance.",
      achievements: [
        "Delivered solutions for projects including Melon, Ostro Contract Management, Nagarjuna Fertilizers, and SCB Pay",
        "Built and maintained REST APIs, frontend modules, and integrated application workflows",
        "Supported troubleshooting, system maintenance, and ongoing feature development"
      ],
      technologies: ["Golang", "MongoDB", "React", "JavaScript", "REST APIs", "C#"]
    },
    {
      title: "Staff Programmer",
      company: "PT Epson Batam",
      location: "Batam, Kepulauan Riau, Indonesia",
      duration: "Aug 2013 — Nov 2015",
      description: "Web and mobile enterprise applications.",
      achievements: [
        "Contributed to ELOBBY Application and GAPURO System Web & Mobile",
        "Supported SWA Analysis and related application development activities",
        "Participated in full-stack implementation, maintenance, and system improvement efforts"
      ],
      technologies: ["JavaScript", "HTML5", "CSS", "C#", "ASP.NET MVC", "PHP"]
    },
    {
      title: "Programmer",
      company: "CV Software Indonesia",
      location: "Malang, East Java, Indonesia",
      duration: "Apr 2011 — Oct 2011",
      description: "Entry-level software development.",
      achievements: [
        "Application development using Java, PHP, JavaScript, and MySQL",
        "Exposure to data mining coursework/projects"
      ],
      technologies: ["Java", "PHP", "JavaScript", "MySQL"]
    }
  ],

  education: [
    {
      institution: "STMIK PPKIA Pradnya Paramita",
      degree: "Bachelor's degree",
      major: "Information Technology",
      location: "Malang, East Java, Indonesia",
      year: "2006 — 2010",
      gpa: "3.11"
    },
    {
      institution: "SMK Telkom Darul Ulum",
      degree: "Vocational high school",
      major: "",
      location: "Jombang, East Java, Indonesia",
      year: "2003 — 2006",
      gpa: ""
    }
  ],

  projects: [
    {
      id: "jklc-sales-dealer-analytics",
      featured: true,
      name: "JKLC Sales & Dealer Analytics Platform",
      category: "fullstack",
      categoryLabel: "Fullstack",
      description: "Sales and dealer analytics for JK Lakshmi Cement—forecasting, KPIs, dashboards, data pipelines, plus a language-based query feature (“Ask EPM”).",
      problem: "Sales and dealer teams were juggling spreadsheets and one-off reports for targets, forecasts, and KPIs.",
      solution: "Go (Gin) + MongoDB + React for sales planning, KPI dashboards, and data pipelines; batch CLIs and schedulers for ingestion. Ask EPM (optional language queries) calls a Python service (LangGraph, Bedrock) through the main API.",
      role: "Software Engineer — sales planning screens, data browser, APIs, MongoDB aggregations, caching, and wiring the Python query service.",
      technologies: [
        "Golang",
        "Gin",
        "MongoDB",
        "React",
        "Vite",
        "MUI",
        "Python",
        "FastAPI",
        "AWS Bedrock",
        "LangGraph",
        "REST APIs",
        "WebSocket",
        "JWT"
      ],
      features: [
        "Sales planning & forecasting (simulations, LightGBM/ESF-style models, forecast insights)",
        "AO (Account Owner) performance vs target, escalations, and root-cause analysis",
        "Executive KPI dashboards and dealer analysis (shortfall, issues, reconciliation)",
        "Data browser for sales exploration and export",
        "Data staging, validation, and spreadsheet upload pipelines",
        "User management with roles, rights, and data access control (DAC)",
        "In-app notifications, chat integration, and scheduled alerts",
        "Initiatives & improvement tracking (growth, degrowth, functional kanban, cost-savings register)",
        "Wholesale price (WSP) trend analysis",
        "Natural-language BI search (“Ask EPM”) via authenticated proxy to AI services"
      ],
      challenges: [
        "Heavy MongoDB aggregations with central and precomputed caching for responsive UI",
        "Many business domains (forecasting, dealers, logistics, initiatives) in one modular monolith",
        "Coordinating Go services, schedulers, ingestion CLIs, and Python AI microservices",
        "Role- and geography-scoped data access across large dealer hierarchies",
        "Evolving reporting and email workflows (AO performance, validation, logistics SLA)"
      ],
      results: "In use for sales planning, dealer ops, and leadership dashboards (JK Lakshmi Cement).",
      github: "#",
      liveDemo: "#",
      image: "./assets/images/project-jklc.svg"
    },
    {
      id: "healthium-optimus-mis",
      featured: true,
      name: "Healthium Optimus (HML)",
      category: "fullstack",
      categoryLabel: "Fullstack",
      description: "Enterprise MIS automation platform for Healthium Medtech, unifying financial reporting, data ingestion, reconciliation, receivables analytics, and CEO/CFO/CXO dashboards in a single web application.",
      problem: "Finance and operations teams needed a centralized system to ingest SAP and trial-balance data, validate mappings, reconcile multi-entity sales (HML+, UK, intercompany), and deliver timely MIS and executive insights instead of manual spreadsheets and fragmented tools.",
      solution: "Delivered a modular full-stack platform with Golang REST services, MongoDB data layer, and a React (Vite + MUI) UI covering data management, automated validation, Group MIS, reconciliation, receivables, planning/ESF, role-based access, and deployment workflows across dev/UAT/production.",
      role: "Software Engineer — full-stack development, backend services, frontend modules, data workflows, and production support.",
      technologies: [
        "Golang",
        "Gin",
        "MongoDB",
        "React",
        "Vite",
        "Material UI",
        "Highcharts",
        "REST APIs",
        "AWS S3",
        "SFTP"
      ],
      features: [
        "Data management: PL/TB/AR/MIS file uploads and mapping tables",
        "Automated data validation and control sheets",
        "Financial reconciliation (monthly sales, balance sheet)",
        "Group MIS: income statement, balance sheet, cash flow",
        "Receivables: aging reports, DSO, customer analysis",
        "CEO / CFO / CXO dashboards",
        "Planning & forecasting (ESF)",
        "User management, ACL, and module permissions"
      ],
      challenges: [
        "Complex multi-entity finance rules and reconciliation logic",
        "Large-volume file ingestion and validation pipelines",
        "Keeping long-lived production data and UI modules consistent across releases"
      ],
      results: "Production enterprise platform supporting Healthium’s MIS automation and executive reporting workflows, with structured UAT/release and MongoDB backup/restore processes.",
      github: "#",
      liveDemo: "#",
      image: "./assets/images/project-healthium-optimus.svg"
    },
    {
      id: "tbc-tboms",
      featured: true,
      name: "TBOMS — True Buddy Operations Management System",
      category: "fullstack",
      categoryLabel: "Fullstack",
      description:
        "Enterprise investigation and case-management platform that unifies pre-investigation workflows, multi-source intelligence databases, reporting, and mobile access for consulting and compliance teams.",
      problem:
        "Investigation teams needed one place to manage cases end-to-end, query disparate public and commercial data sources, collaborate on findings, and produce reports—without juggling separate tools and manual exports.",
      solution:
        "Delivered a modular full-stack platform: a Go-based API layer with domain modules (case management, user access, notifications, and specialized data services), a React web client with dashboards and rich editors, supporting Node.js microservices for PDF export and web scraping, optional Python document services, plus PWA and Android for field use.",
      role:
        "Software Engineer — backend services, frontend modules, integrations, production support.",
      technologies: [
        "Golang",
        "Gin",
        "MongoDB",
        "React",
        "Material UI",
        "REST APIs",
        "WebSockets",
        "Node.js",
        "TypeScript",
        "Python",
        "Mapbox GL",
        "D3.js",
        "Docker",
        "PWA",
        "React Native (Android)"
      ],
      features: [
        "Case management — setup, administration, templates, archived cases, geolocation dashboard",
        "Investigating databases — GST, CIBIL, MCA, ECI, keyword search, TB-OM offender/network views",
        "Pre-investigation — proposal management with document/PDF workflows",
        "User management, ACL, notifications, and administration (scheduler, file access)",
        "Auxiliary services — PDF generation and targeted web scraping",
        "Mobile — PWA daily updates and native Android shell"
      ],
      challenges: [
        "Orchestrating many domain modules and external data integrations behind consistent APIs",
        "Balancing rich UI (maps, network graphs, report editors) with performance and maintainability",
        "Operating a multi-runtime stack (Go, Node, Python) in production with Docker/PM2-style deployment"
      ],
      results:
        "Production platform for investigation and case workflows across web and mobile.",
      github: "#",
      liveDemo: "#",
      image: "./assets/images/project-tboms.svg"
    },
    {
      id: "smart-dq-platform",
      featured: true,
      name: "SmartDQ — Data Quality Platform",
      category: "fullstack",
      categoryLabel: "Fullstack",
      description:
        "Enterprise data quality platform for defining, profiling, executing, and monitoring DQ rules across large analytical datasets, delivered as multiple Go microservices with a React web UI.",
      problem:
        "The organization needed a centralized way to govern data quality on Hive and other analytical sources—discover metadata, define validation rules, run checks on schedule, track failures, and manage remediation—not ad-hoc SQL and spreadsheets.",
      solution:
        "Designed and built a full-stack DQ suite: metadata and rule definition, profiling and analytics dashboards, rule execution engine, issue management, and user/ACL integration—querying federated data through Apache Drill and persisting configuration and results in MongoDB.",
      role:
        "Software Engineer — backend microservices (Go), API design, data integration (Drill/Hive/MongoDB), frontend features (React), deployment support, and production troubleshooting.",
      technologies: [
        "Golang",
        "Gin",
        "MongoDB",
        "React",
        "Redux",
        "Material UI",
        "Apache Drill",
        "Apache Hive",
        "REST APIs",
        "Nginx",
        "Dolphin Scheduler"
      ],
      features: [
        "Metadata catalog and dataset configuration",
        "Data profiling and quality dashboards",
        "Configurable DQ rules (null/empty, uniqueness, regex, enum, range, date format, and more)",
        "Scheduled rule execution and result export (Excel/CSV)",
        "Issue management with action plans",
        "Role-based access via integrated user management"
      ],
      challenges: [
        "Federated queries and performance across Drill, Hive, and MongoDB",
        "Operating multiple backend services reliably in production",
        "Evolving rule types and scheduling without breaking existing workflows",
        "Aligning UI workflows with complex DQ domain logic"
      ],
      results:
        "Production-grade platform deployed on Linux with systemd-managed services, supporting ongoing enterprise data quality operations and scheduled monitoring.",
      github: "#",
      liveDemo: "#",
      image: "./assets/images/project-smartdq.svg"
    },
    {
      id: "scb-data-mapping-tool",
      featured: true,
      name: "SCB Data Mapping Tool (DMT)",
      category: "fullstack",
      categoryLabel: "Fullstack",
      description: "Enterprise data-mapping platform for Standard Chartered Bank (SCB), supporting metadata governance, source-to-target mapping, and export to downstream ETL (Informatica).",
      problem: "The bank needed a centralized tool to define data objects, maintain mappings across source systems, analyze gaps, and export mapping artifacts consistently for integration teams.",
      solution: "Delivered a full-stack web application with role-based access, rich CRUD for masters and mappings, visualization and statistics, bulk import/export, dynamic metadata via General Master, and structured logging for operations and audit.",
      role: "Software Engineer — full-stack development on Go backend and progressive web UI, feature work, maintenance, and production support.",
      technologies: [
        "Golang",
        "MongoDB",
        "Kendo UI",
        "Knockout.js",
        "Bootstrap",
        "D3.js",
        "REST APIs",
        "JavaScript",
        "LDAP/ACL"
      ],
      features: [
        "Visualization, statistics, and gap analysis dashboards",
        "Object definition, data processing rules, and source-to-target mapping",
        "Project, general, database, and source-system master data",
        "Single and bulk import/export (including export to Informatica)",
        "Authentication, groups/roles, and menu-based access control",
        "Server and admin logging with JSON logs for third-party integration",
        "Auto database setup, semver versioning, and unit tests with isolated simulation"
      ],
      challenges: [
        "Modeling flexible, meta-driven data structures for evolving bank standards",
        "Keeping a large mapping UI performant and maintainable (Kendo/Knockout)",
        "Ensuring reliable bulk operations and export pipelines for ETL consumers",
        "Operating a long-lived enterprise app with CI, coverage, and DB versioning"
      ],
      results: "Production mapping tool with live deployments, CI build/coverage badges, semver releases (e.g. v1.0.3), and sustained maintenance by the SCB-DMT team.",
      github: "#",
      liveDemo: "http://scbmappingtool.eaciitapp.com/",
      image: "./assets/images/project-scb-dmt.svg"
    },      
    {
      id: "amalia-aml-platform",
      featured: true,
      name: "AMALIA — Anti-Money Laundering Platform",
      category: "fullstack",
      categoryLabel: "Fullstack",
      description: "Enterprise anti–money laundering (AML) platform for investigating corporate and officer relationships, searching multi-source entity data, and supporting compliance workflows (AMALIA v1).",
      problem: "Compliance teams needed a unified system to search large corporate registries, visualize ownership and officer networks, resolve duplicate entities, and run investigations without sacrificing acceptable query performance on very large datasets.",
      solution: "Delivered a Go-based web application with REST APIs and a browser UI, plus separate data-ingestion and orchestration pipelines that load, transform, and merge OpenCorporates-style and commercial registry (BvD) data into MongoDB. Implemented search (Single Search, Nexus), lazy-loaded network charts (D3), data browser, entity resolution, investigation and case management, risk scoring, and role-based access.",
      role: "Software Engineer — full-stack development, MongoDB search and indexing strategy, API design, data pipeline integration, performance tuning (timeouts, lazy loading), and ongoing feature work.",
      technologies: [
        "Golang",
        "MongoDB",
        "REST APIs",
        "JavaScript",
        "Knockout.js",
        "D3.js",
        "LDAP",
        "AWS S3",
        "Excel import/export",
        "Cobra CLI"
      ],
      features: [
        "Multi-source single search (companies & officers)",
        "Nexus / network relationship visualization with lazy loading",
        "Data browser with advanced filters",
        "Entity resolution across data sources",
        "Investigation workflows and case management",
        "Risk scoring and typology / flow modules",
        "Bulk data ingest, transform, and merge pipelines",
        "User and role management with ACL"
      ],
      challenges: [
        "Search accuracy vs. performance on multi-million-record MongoDB collections",
        "Designing distinct search strategies for short vs. long query terms and red-alert precision",
        "Loading deep relationship graphs without blocking the UI (level-based lazy APIs)",
        "Orchestrating long-running ETL from raw CSV through source to application databases"
      ],
      results: "Production-oriented AML investigation platform integrating corporate registry data at scale, with documented module behavior, indexing strategy, and iterative performance improvements for search and network visualization.",
      github: "#",
      liveDemo: "#",
      image: "./assets/images/project-amalia-aml.svg"
    },
    {
      id: "al-mansoori-dds-reporter",
      featured: true,
      name: "Al Mansoori DDS Reporter",
      category: "fullstack",
      categoryLabel: "Fullstack",
      description:
        "Enterprise web platform for drilling and field operations reporting (DDS Reporter), covering daily/MWD reports, dashboards, asset and logistics workflows, and supporting modules maintained as a long-lived production system.",
      problem:
        "Operations teams needed one integrated system to capture drilling and field data, produce operational reports, and coordinate assets, jobs, logistics, and compliance—not scattered spreadsheets and ad hoc tools.",
      solution:
        "Delivered a modular full-stack application: Go HTTP services with role-based access, MongoDB-backed data layers, and rich browser UIs for reporting, dashboards, master data, and operational modules—with batch utilities for Excel/CSV ingestion where needed.",
      role:
        "Software Engineer — full-stack development, feature delivery, production maintenance, and troubleshooting across backend APIs, data models, and frontend reporting screens.",
      technologies: [
        "Golang",
        "MongoDB",
        "Knockout.js",
        "Kendo UI",
        "JavaScript",
        "REST-style web controllers",
        "Excel/CSV tooling"
      ],
      features: [
        "Drilling daily reports and MWD-related reporting workflows",
        "Operational dashboards and analytics-oriented reporting",
        "Asset, component, and register management",
        "Job and operation management",
        "Logistics (shipments, equipment receive/send)",
        "HSEQ and non-conformance reporting",
        "Data master, finance, and timesheet modules",
        "Data health check, import/export, and role-based access control"
      ],
      challenges: [
        "Breadth of domain modules in a single long-lived codebase",
        "Evolving reporting and operational requirements over years",
        "Keeping data consistency and reliability across MongoDB-backed workflows and UI layers"
      ],
      results:
        "Production-grade client platform (DDS Reporter) spanning dozens of functional areas—from field reporting to asset and logistics—suitable to describe as an ongoing enterprise engagement rather than a one-off MVP.",
      github: "#",
      liveDemo: "#",
      image: "./assets/images/project-1.svg"
    },
    {
      id: "ride-petroanalytica",
      name: "RIDE (PetroAnalytica)",
      category: "fullstack",
      categoryLabel: "Fullstack",
      description: "Analytics-oriented application developed under the PetroAnalytica initiative, supporting data processing and application workflows for operational use.",
      problem: "The project required a software platform to support analytics-related workflows and application features for business users.",
      solution: "Contributed to full-stack development including backend services, data integration, and frontend application modules.",
      role: "Software Engineer — application development, integration, and ongoing improvements.",
      technologies: ["Golang", "MongoDB", "React", "REST APIs", "JavaScript"],
      features: ["Analytics application workflows", "Backend API services", "Frontend application modules"],
      challenges: ["Supporting analytics-related data flows", "Building maintainable full-stack modules for evolving requirements"],
      results: "Continued development as part of the PetroAnalytica product line.",
      github: "#",
      liveDemo: "#",
      image: "./assets/images/project-3.svg"
    },
    {
      id: "product-suite",
      name: "Product Suite — User Mgmt, Analytics & Chat",
      category: "fullstack",
      categoryLabel: "Fullstack",
      description: "Internal product modules including user management, user analytics, and chat functionality, built as reusable platform components.",
      problem: "The platform needed shared modules for user administration, usage analytics, and communication features across products.",
      solution: "Developed and maintained modular full-stack components for user management, analytics, and chat as part of the broader product ecosystem.",
      role: "Software Engineer — module design, implementation, integration, and maintenance.",
      technologies: ["Golang", "MongoDB", "React", "REST APIs", "WebSocket"],
      features: ["User management", "User analytics", "Chat functionality", "Shared platform modules"],
      challenges: ["Designing reusable modules across products", "Integrating authentication, analytics, and real-time communication needs"],
      results: "Delivered core platform modules used across multiple product features.",
      github: "#",
      liveDemo: "#",
      image: "./assets/images/project-1.svg"
    },
    {
      id: "nagarjuna-fertilizers",
      name: "Nagarjuna Fertilizers Project",
      category: "fullstack",
      categoryLabel: "Fullstack",
      description: "Enterprise application project delivered between 2017 and 2018, supporting business workflows for Nagarjuna Fertilizers.",
      problem: "The client required a software solution to support operational and business workflow needs.",
      solution: "Contributed to full-stack application development including backend services, frontend interfaces, and system integration.",
      role: "Software Engineer — implementation, integration, and project delivery support.",
      technologies: ["Golang", "MongoDB", "JavaScript", "REST APIs"],
      features: ["Business workflow support", "Backend services", "Frontend application modules"],
      challenges: ["Delivering application features within client project timelines", "Integrating application layers with business processes"],
      results: "Completed client project delivery during 2017–2018 engagement.",
      github: "#",
      liveDemo: "#",
      image: "./assets/images/project-2.svg"
    },
    {
      id: "gapuro-system",
      name: "GAPURO System Web & Mobile",
      category: "fullstack",
      categoryLabel: "Fullstack",
      description: "Web and mobile system developed between 2014 and 2015, supporting GAPURO business operations across multiple application layers.",
      problem: "The client needed an integrated web and mobile solution to support operational workflows.",
      solution: "Contributed to the development of web and mobile application components, backend integration, and system maintenance.",
      role: "Software Engineer — web and mobile application development.",
      technologies: ["JavaScript", "HTML5", "CSS", "C#", "ASP.NET MVC"],
      features: ["Web application modules", "Mobile application support", "Integrated business workflows"],
      challenges: ["Supporting both web and mobile application requirements", "Maintaining consistency across application layers"],
      results: "Delivered as part of a multi-year client engagement at PT Epson Batam.",
      github: "#",
      liveDemo: "#",
      image: "./assets/images/project-3.svg"
    }
  ],

  services: [
    {
      title: "Full-Stack Web Apps",
      description: "Go backends, React UIs, MongoDB—features through to production support.",
      icon: "globe"
    },
    {
      title: "APIs & Data Layers",
      description: "REST, WebSockets, aggregations, caching, and integrations that have to stay up.",
      icon: "code"
    },
    {
      title: "React Frontends",
      description: "SPAs and older Knockout/Kendo screens on the same products.",
      icon: "layout"
    },
    {
      title: "Python When Needed",
      description: "ML study plus in-app features such as language-based queries, kept behind the same auth as the Go API.",
      icon: "spark"
    },
    {
      title: "Maintenance & Performance",
      description: "Debugging, tuning, and extending systems that are already live.",
      icon: "zap"
    }
  ]
};




/* Unused. The page is driven by js/_runtime.js. */
function retiredRenderProjects() {
  const container = document.getElementById("projects-grid-retired");
  if (!container) return;

  const featured = portfolioData.projects.filter((p) => p.featured);
  const other = portfolioData.projects.filter((p) => !p.featured);

  const featuredHtml = featured
    .map((project) => {
      const techLine = project.technologies.slice(0, 8).join(", ");
      const outcome = projectOutcome(project);

      return `
      <article class="project-entry" data-project-id="${project.id}" tabindex="0" role="button" aria-label="Read about ${project.name}">
        <div class="project-entry__media">
          <img src="${project.image}" alt="" class="project-entry__image" loading="lazy" width="480" height="300">
        </div>
        <div class="project-entry__body">
          <h3 class="project-entry__title">${project.name}</h3>
          <p class="project-entry__outcome">${outcome}</p>
          <p class="project-entry__meta">${techLine}</p>
          <span class="project-entry__more">Read notes</span>
        </div>
      </article>`;
    })
    .join("");

  const otherHtml =
    other.length > 0
      ? `
      <div class="project-more">
        <h3 class="project-more__title">Other client &amp; platform work</h3>
        <ul class="project-more__list">
          ${other
            .map(
              (project) => `
            <li>
              <button type="button" class="project-more__item" data-project-id="${project.id}">
                <span class="project-more__name">${project.name}</span>
                <span class="project-more__summary">${project.description}</span>
              </button>
            </li>`
            )
            .join("")}
        </ul>
      </div>`
      : "";

  container.innerHTML = `<div class="project-index">${featuredHtml}</div>${otherHtml}`;
}

function retiredRenderEducation() {
  const block = document.querySelector(".education-block");
  const container = document.getElementById("education-list");
  if (!container) return;

  if (!portfolioData.education.length) {
    block?.remove();
    return;
  }

  container.innerHTML = portfolioData.education
    .map(
      (edu) => `
      <p class="education-line">
        <strong>${edu.degree}, ${edu.major}</strong> — ${edu.institution} (${edu.year}${edu.gpa ? `, GPA ${edu.gpa}` : ""})
      </p>`
    )
    .join("");

}

function renderServices() {
  const container = document.getElementById("services-grid");
  if (!container) return;

  const icons = {
    code: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    globe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    layout: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
    zap: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    spark: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z"/></svg>`
  };

  container.innerHTML = portfolioData.services
    .map(
      (service) => `
      <article class="service-card reveal">
        <div class="service-card__icon">${icons[service.icon] || icons.code}</div>
        <h3 class="service-card__title">${service.title}</h3>
        <p class="service-card__description">${service.description}</p>
      </article>`
    )
    .join("");

}

/* ============================================
   Project Filter (legacy — filters removed from UI)
   ============================================ */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll(".projects__filter-btn");
  const grid = document.getElementById("projects-grid");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });

      const cards = grid.querySelectorAll(".project-card");
      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !match);
        if (match) {
          card.classList.remove("is-filtering");
          void card.offsetWidth;
          card.classList.add("is-filtering");
        }
      });
    });
  });
}

/* ============================================
   Project Modal
   ============================================ */
function retiredInitProjectModal() {
  const modal = document.getElementById("project-modal");
  const overlay = document.getElementById("modal-overlay");
  const closeBtn = document.getElementById("modal-close");
  const grid = document.getElementById("projects-grid");

  const openFromEvent = (e) => {
    const trigger = e.target.closest("[data-project-id]");
    if (!trigger || e.target.closest("a[href]")) return;
    openProjectModal(trigger.dataset.projectId);
  };

  grid.addEventListener("click", openFromEvent);

  grid.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const trigger = e.target.closest("[data-project-id]");
      if (!trigger) return;
      e.preventDefault();
      openProjectModal(trigger.dataset.projectId);
    }
  });

  closeBtn.addEventListener("click", closeProjectModal);
  overlay.addEventListener("click", closeProjectModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
      closeProjectModal();
    }
  });
}

function retiredOpenProjectModal(projectId) {
  const project = portfolioData.projects.find((p) => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById("project-modal");
  const content = document.getElementById("modal-content");
  lastFocusedElement = document.activeElement;

  content.innerHTML = `
    <img src="${project.image}" alt="${project.name}" class="modal__image">
    <h2 class="modal__title" id="modal-title">${project.name}</h2>

    <div class="modal__section">
      <h3 class="modal__section-title">Overview</h3>
      <p class="modal__section-text">${project.description}</p>
    </div>

    <div class="modal__section">
      <h3 class="modal__section-title">Problem</h3>
      <p class="modal__section-text">${project.problem}</p>
    </div>

    <div class="modal__section">
      <h3 class="modal__section-title">Solution</h3>
      <p class="modal__section-text">${project.solution}</p>
    </div>

    <div class="modal__section">
      <h3 class="modal__section-title">My Role</h3>
      <p class="modal__section-text">${project.role}</p>
    </div>

    <div class="modal__section">
      <h3 class="modal__section-title">Technologies</h3>
      <p class="modal__section-text">${project.technologies.join(", ")}</p>
    </div>

    <div class="modal__section">
      <h3 class="modal__section-title">Features</h3>
      <ul class="modal__features">
        ${project.features.map((f) => `<li>${f}</li>`).join("")}
      </ul>
    </div>

    <div class="modal__section">
      <h3 class="modal__section-title">Challenges</h3>
      <ul class="modal__challenges">
        ${project.challenges.map((c) => `<li>${c}</li>`).join("")}
      </ul>
    </div>

    <div class="modal__section">
      <h3 class="modal__section-title">Results</h3>
      <p class="modal__section-text">${project.results}</p>
    </div>

    ${
      isPublicUrl(project.github) || isPublicUrl(project.liveDemo)
        ? `<div class="modal__actions">
            ${
              isPublicUrl(project.github)
                ? `<a href="${project.github}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">GitHub</a>`
                : ""
            }
            ${
              isPublicUrl(project.liveDemo)
                ? `<a href="${project.liveDemo}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Live demo</a>`
                : ""
            }
          </div>`
        : ""
    }`;

  modal.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("modal-close").focus();
}

function retiredCloseProjectModal() {
  const modal = document.getElementById("project-modal");
  modal.hidden = true;
  document.body.style.overflow = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

/* ============================================
   Contact Form (mailto fallback)
   ============================================ */
function retiredInitContactForm() {
  const form = document.getElementById("contact-form");
  const email = portfolioData.personal.email;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#contact-name");
    const emailInput = form.querySelector("#contact-email-input");
    const subject = form.querySelector("#contact-subject");
    const message = form.querySelector("#contact-message");

    let valid = true;

    [name, emailInput, subject, message].forEach((field) => {
      field.classList.remove("is-invalid");
      if (!field.value.trim()) {
        field.classList.add("is-invalid");
        valid = false;
      }
    });

    if (!valid) return;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(
      `Name: ${name.value}\nEmail: ${emailInput.value}\n\n${message.value}`
    )}`;

    window.location.href = mailtoLink;
  });
}

/* ============================================
   Footer Year
   ============================================ */
function retiredInitFooterYear() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
