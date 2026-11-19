/* ============================================
   DOM Ready
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initActiveNav();
  renderDynamicContent();
  initProjectModal();
  initContactForm();
  initFooterYear();
});

/* ============================================
   Theme
   ============================================ */
function readStoredTheme() {
  try {
    return localStorage.getItem("portfolio-theme");
  } catch (error) {
    return null;
  }
}

function writeStoredTheme(theme) {
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch (error) {
    /* Private mode can block storage. The toggle still applies for this visit. */
  }
}

function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  const stored = readStoredTheme();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(stored || (prefersDark ? "dark" : "light"));

  toggle?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
    writeStoredTheme(next);
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (!readStoredTheme()) {
      setTheme(event.matches ? "dark" : "light");
    }
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    const dark = theme === "dark";
    toggle.setAttribute("aria-pressed", dark ? "true" : "false");
    toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", theme === "dark" ? "#070b12" : "#0c1222");
  }
}

/* ============================================
   Navigation
   ============================================ */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    const dock = document.querySelector(".hero__dock");
    const navHeight = navbar.offsetHeight || 64;
    if (!dock) {
      navbar.classList.toggle("is-scrolled", window.scrollY > 24);
      return;
    }
    navbar.classList.toggle("is-scrolled", dock.getBoundingClientRect().top <= navHeight);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileMenu() {
  const hamburger = document.getElementById("navbar-hamburger");
  const nav = document.getElementById("navbar-nav");
  if (!hamburger || !nav) return;

  const links = nav.querySelectorAll(".navbar__link");

  const sync = () => {
    const menuOpen = nav.classList.contains("is-open");
    const modal = document.getElementById("project-modal");
    const modalOpen = modal && !modal.hidden;
    document.body.classList.toggle("is-locked", menuOpen || modalOpen);
  };

  const navbar = document.getElementById("navbar");

  const closeMenu = () => {
    hamburger.classList.remove("is-open");
    nav.classList.remove("is-open");
    navbar?.classList.remove("is-menu");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
    sync();
  };

  const openMenu = () => {
    hamburger.classList.add("is-open");
    nav.classList.add("is-open");
    navbar?.classList.add("is-menu");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close menu");
    sync();
  };

  hamburger.addEventListener("click", () => {
    if (nav.classList.contains("is-open")) closeMenu();
    else openMenu();
  });

  links.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      hamburger.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860 && nav.classList.contains("is-open")) {
      closeMenu();
    }
  });

  window.__syncScrollLock = sync;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
      if (target.hasAttribute("tabindex")) {
        target.focus({ preventScroll: true });
      }
    });
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".navbar__link[data-section]");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          const active = link.dataset.section === id;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ============================================
   Render
   ============================================ */
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isPublicUrl(url) {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  return trimmed !== "#" && !trimmed.startsWith("[") && trimmed !== "";
}

function hasPhotograph(src) {
  return typeof src === "string" && /\.(jpe?g|png|webp)$/i.test(src);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
}

function splitFirstSentence(text) {
  const source = String(text || "").trim();
  const match = source.match(/^(.+?[.!?])\s+([\s\S]+)$/);
  if (!match) return { lead: source, rest: "" };
  return { lead: match[1], rest: match[2] };
}

function displayHost(url) {
  return String(url).replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function renderDynamicContent() {
  const { personal } = portfolioData;
  applyDocumentMeta(personal);
  populatePersonal(personal);
  renderSkills();
  renderProjects();
  renderExperience();
  renderEducation();
}

function applyDocumentMeta(personal) {
  const description = `${personal.name} — ${personal.role} in ${personal.locationShort || "Malang"}. ${personal.headline || personal.tagline}`;
  document.title = `${personal.name} | ${personal.role}`;

  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.setAttribute("content", description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (ogTitle) ogTitle.setAttribute("content", document.title);
  if (twTitle) twTitle.setAttribute("content", document.title);

  const summary = personal.heroIntro || personal.tagline;
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (ogDesc) ogDesc.setAttribute("content", summary);
  if (twDesc) twDesc.setAttribute("content", summary);

  const author = document.querySelector('meta[name="author"]');
  if (author) author.setAttribute("content", personal.name);

  const origin = (personal.siteUrl || "").trim().replace(/\/$/, "");
  if (origin) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${origin}/`;

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", `${origin}/`);

    const image = `${origin}/${String(personal.profileImage || "assets/images/me.jpeg").replace(/^\.\//, "")}`;
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", image);
    document.querySelector('meta[name="twitter:image"]')?.setAttribute("content", image);
  }

  const sameAs = [personal.linkedin, personal.github].filter(isPublicUrl);
  const structured = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.role,
    email: personal.email ? `mailto:${personal.email}` : undefined,
    telephone: personal.phone || undefined,
    description: personal.bio || undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Malang",
      addressRegion: "East Java",
      addressCountry: "Indonesia"
    },
    sameAs
  };
  if (origin) {
    structured.url = `${origin}/`;
    structured.image = `${origin}/${String(personal.profileImage || "").replace(/^\.\//, "")}`;
  }
  const jsonLd = document.getElementById("person-jsonld");
  if (jsonLd) jsonLd.textContent = JSON.stringify(structured);
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (el && href) el.href = href;
}

function populatePersonal(personal) {
  const about = splitFirstSentence(personal.bio);
  const nameEl = document.getElementById("hero-name");
  if (nameEl) {
    const parts = String(personal.name).trim().split(/\s+/).filter(Boolean);
    nameEl.innerHTML = parts.map((part) => `<span class="hero__name-line">${escapeHtml(part)}</span>`).join("");
  }
  const logoText = document.querySelector(".navbar__logo-text");
  if (logoText) logoText.textContent = personal.name;
  setText("hero-eyebrow", `${personal.role} · ${personal.locationShort || personal.location}`);
  setText("hero-headline", personal.headline || personal.tagline);
  setText("hero-lede", personal.heroIntro || personal.tagline);
  setText("about-lead", about.lead);
  setText("about-rest", about.rest);
  setText("about-snippet", personal.aboutSnippet || "");
  setText("contact-location", personal.location);
  setText("footer-name", personal.name);

  const photo = document.getElementById("hero-photo");
  if (photo && personal.profileImage) {
    photo.src = personal.profileImage;
    photo.alt = `Portrait of ${personal.name}`;
  }

  setHref("hero-email", `mailto:${personal.email}`);
  setText("hero-email", personal.email);
  setHref("footer-email", `mailto:${personal.email}`);
  setHref("contact-email", `mailto:${personal.email}`);
  setText("contact-email", personal.email);

  if (personal.phone && personal.phoneHref) {
    setHref("contact-phone", personal.phoneHref);
    setText("contact-phone", personal.phone);
  }

  setHref("hero-linkedin", personal.linkedin);
  setHref("contact-linkedin", personal.linkedin);
  setText("contact-linkedin", displayHost(personal.linkedin));
  setHref("footer-linkedin", personal.linkedin);

  setHref("hero-resume", personal.resume);
  setHref("contact-resume", personal.resume);
  setHref("footer-resume", personal.resume);

  const githubRow = document.getElementById("contact-github-row");
  const githubLink = document.getElementById("contact-github");
  const footerGithub = document.getElementById("footer-github");
  const heroLinks = document.getElementById("hero-links");

  if (isPublicUrl(personal.github)) {
    if (githubRow) githubRow.hidden = false;
    if (githubLink) {
      githubLink.href = personal.github;
      githubLink.textContent = displayHost(personal.github);
    }
    if (footerGithub) {
      footerGithub.hidden = false;
      footerGithub.href = personal.github;
    }
    if (heroLinks && !document.getElementById("hero-github")) {
      const link = document.createElement("a");
      link.id = "hero-github";
      link.href = personal.github;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "GitHub";
      const resume = document.getElementById("hero-resume");
      heroLinks.insertBefore(link, resume || null);
    }
  } else {
    githubRow?.remove();
    footerGithub?.remove();
  }
}

function renderSkills() {
  const container = document.getElementById("skills-grid");
  if (!container) return;

  container.innerHTML = Object.values(portfolioData.skills)
    .map(
      (category) => `
      <div class="skill-category">
        <h3 class="skill-category__title">${escapeHtml(category.title)}</h3>
        <p class="skill-category__items">${category.items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</p>
      </div>`
    )
    .join("");
}

function renderExperience() {
  const container = document.getElementById("experience-timeline");
  if (!container) return;

  container.innerHTML = portfolioData.experience
    .map(
      (job) => `
      <article class="career__item">
        <div class="career__meta">
          <span class="career__duration">${escapeHtml(job.duration)}</span>
          <span class="career__location">${escapeHtml(job.location)}</span>
        </div>
        <div class="career__body">
          <h3 class="career__company">${escapeHtml(job.company)}</h3>
          <p class="career__title">${escapeHtml(job.title)}</p>
          <p class="career__description">${escapeHtml(job.description)}</p>
          ${
            job.achievements?.length
              ? `<ul class="career__list">${job.achievements.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
              : ""
          }
          ${
            job.technologies?.length
              ? `<p class="career__tech">${escapeHtml(job.technologies.join(", "))}</p>`
              : ""
          }
        </div>
      </article>`
    )
    .join("");
}

function renderEducation() {
  const block = document.getElementById("education-block");
  const container = document.getElementById("education-list");
  if (!container || !block) return;
  if (!portfolioData.education?.length) {
    block.remove();
    return;
  }

  block.hidden = false;
  container.innerHTML = portfolioData.education
    .map((edu) => {
      const credential = [edu.degree, edu.major].filter(Boolean).join(", ");
      const gpa = edu.gpa ? ` · GPA ${escapeHtml(edu.gpa)}` : "";
      return `
        <div class="education__line">
          <span class="education__year">${escapeHtml(edu.year)}</span>
          <p class="education__detail">
            <strong>${escapeHtml(credential)}</strong> — ${escapeHtml(edu.institution)}${gpa}
            ${edu.location ? `<span class="education__place">${escapeHtml(edu.location)}</span>` : ""}
          </p>
        </div>`;
    })
    .join("");
}

function renderProjects() {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  const featured = portfolioData.projects.filter((project) => project.featured);
  const other = portfolioData.projects.filter((project) => !project.featured);

  const openAttrs = (project) =>
    `type="button" data-project-id="${escapeHtml(project.id)}" aria-haspopup="dialog" aria-label="Case notes: ${escapeHtml(project.name)}"`;

  const featuredHtml = featured
    .map((project, index) => {
      const number = String(index + 1).padStart(2, "0");
      const tone = index % 2 === 0 ? "case--navy" : "case--stone";
      const showDetail = index < 3;
      return `<article class="case ${tone}">
        <button class="case__open" ${openAttrs(project)}>
          <span class="case__num">${number}</span>
          <span class="case__copy">
            <span class="case__name">${escapeHtml(project.name)}</span>
            <span class="case__desc">${escapeHtml(project.description)}</span>
            ${showDetail && project.problem ? `<span class="case__detail">${escapeHtml(project.problem)}</span>` : ""}
            ${showDetail && project.role ? `<span class="case__role">${escapeHtml(project.role)}</span>` : ""}
          </span>
          <span class="case__side">
            <span class="case__stack">${escapeHtml((project.technologies || []).join("  /  "))}</span>
            <span class="case__cta">Open case notes</span>
          </span>
        </button>
      </article>`;
    })
    .join("");

  const earlierHtml = other.length
    ? `
      <div class="work-earlier">
        <h3 class="work-earlier__title">Other client and platform work</h3>
        <ul class="work-earlier__list">
          ${other
            .map(
              (project) => `
            <li>
              <button type="button" class="work-earlier__item" data-project-id="${escapeHtml(project.id)}" aria-haspopup="dialog" aria-label="Case notes: ${escapeHtml(project.name)}">
                <span class="work-earlier__name">${escapeHtml(project.name)}</span>
                <span class="work-earlier__summary">${escapeHtml(project.description)}</span>
              </button>
            </li>`
            )
            .join("")}
        </ul>
      </div>`
    : "";

  container.innerHTML = `${featuredHtml}${earlierHtml}`;
}

/* ============================================
   Project modal
   ============================================ */
let lastFocusedElement = null;
let releaseFocusTrap = null;

function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const overlay = document.getElementById("modal-overlay");
  const closeBtn = document.getElementById("modal-close");
  const grid = document.getElementById("projects-grid");
  if (!modal || !grid || !closeBtn) return;

  grid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-project-id]");
    if (!trigger) return;
    openProjectModal(trigger.dataset.projectId);
  });

  grid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const trigger = event.target.closest("[data-project-id]");
    if (!trigger || event.target !== trigger) return;
    event.preventDefault();
    openProjectModal(trigger.dataset.projectId);
  });

  closeBtn.addEventListener("click", closeProjectModal);
  overlay?.addEventListener("click", closeProjectModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeProjectModal();
  });
}

function modalBlock(title, body) {
  if (!body) return "";
  return `<div class="modal__block"><h3 class="modal__kicker">${escapeHtml(title)}</h3>${body}</div>`;
}

function modalParagraph(text) {
  if (!text) return "";
  return `<p class="modal__text">${escapeHtml(text)}</p>`;
}

function modalList(items) {
  if (!items?.length) return "";
  return `<ul class="modal__list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function openProjectModal(projectId) {
  const project = portfolioData.projects.find((item) => item.id === projectId);
  const modal = document.getElementById("project-modal");
  const content = document.getElementById("modal-content");
  if (!project || !modal || !content) return;

  lastFocusedElement = document.activeElement;

  const links = [
    isPublicUrl(project.liveDemo)
      ? `<a class="btn btn--primary" href="${escapeHtml(project.liveDemo)}" target="_blank" rel="noopener noreferrer">Live deployment</a>`
      : "",
    isPublicUrl(project.github)
      ? `<a class="btn btn--secondary" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>`
      : ""
  ].join("");

  const photo = hasPhotograph(project.image)
    ? `<figure class="modal__figure"><img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.name)}"></figure>`
    : "";

  const title = document.getElementById("modal-title");
  if (title) title.textContent = project.name;

  content.innerHTML = `
    ${photo}
    ${modalBlock("Overview", modalParagraph(project.description))}
    ${modalBlock("Problem", modalParagraph(project.problem))}
    ${modalBlock("Approach", modalParagraph(project.solution))}
    ${modalBlock("Role", modalParagraph(project.role))}
    ${modalBlock("Technologies", modalParagraph(project.technologies?.join(", ")))}
    ${modalBlock("Features", modalList(project.features))}
    ${modalBlock("Challenges", modalList(project.challenges))}
    ${modalBlock("Results", modalParagraph(project.results))}
    ${links ? `<div class="modal__actions">${links}</div>` : ""}
  `;

  modal.hidden = false;
  setPageInert(true);
  if (typeof window.__syncScrollLock === "function") window.__syncScrollLock();
  else document.body.classList.add("is-locked");

  const panel = modal.querySelector(".modal__panel");
  releaseFocusTrap?.();
  releaseFocusTrap = trapFocus(panel);

  requestAnimationFrame(() => {
    document.getElementById("modal-close")?.focus();
  });
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  setPageInert(false);
  releaseFocusTrap?.();
  releaseFocusTrap = null;
  if (typeof window.__syncScrollLock === "function") window.__syncScrollLock();
  else document.body.classList.remove("is-locked");
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;
}

function setPageInert(on) {
  document.querySelectorAll("body > *:not(#project-modal)").forEach((el) => {
    if (on) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
  });
}

function trapFocus(container) {
  if (!container) return () => {};

  const onKey = (event) => {
    if (event.key !== "Tab") return;
    const focusable = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  container.addEventListener("keydown", onKey);
  return () => container.removeEventListener("keydown", onKey);
}

/* ============================================
   Contact form
   ============================================ */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const error = document.getElementById("form-error");
  const emailTo = portfolioData.personal.email;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.querySelector("#contact-name");
    const emailInput = form.querySelector("#contact-email-input");
    const subject = form.querySelector("#contact-subject");
    const message = form.querySelector("#contact-message");
    const fields = [name, emailInput, subject, message];
    let valid = true;

    fields.forEach((field) => {
      const empty = !field.value.trim();
      const badEmail = field === emailInput && field.validity.typeMismatch;
      const invalid = empty || badEmail;
      field.classList.toggle("is-invalid", invalid);
      field.setAttribute("aria-invalid", invalid ? "true" : "false");
      if (invalid) valid = false;
    });

    if (!valid) {
      if (error) error.hidden = false;
      fields.find((field) => field.classList.contains("is-invalid"))?.focus();
      return;
    }

    if (error) error.hidden = true;
    const body = `Name: ${name.value}\nEmail: ${emailInput.value}\n\n${message.value}`;
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(body)}`;
  });
}

function initFooterYear() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}
