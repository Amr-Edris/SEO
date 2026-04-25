
// const BASE_PATH = "";
// const DEBUG = true; // 🔥 turn OFF in production

// const log = (...args) => DEBUG && console.log("[DEBUG]", ...args);
// const warn = (...args) => DEBUG && console.warn("[WARN]", ...args);
// const error = (...args) => DEBUG && console.error("[ERROR]", ...args);

// /* =====================================================
//    GLOBAL CACHE
// ===================================================== */
// const DOM = {};

// /* =====================================================
//    INIT
// ===================================================== */
// document.addEventListener("DOMContentLoaded", () => {
//   log("DOM loaded");

//   log("Mobile check:", window.innerWidth < 768 ? "YES (mobile)" : "NO (desktop)");

//   try {
//     initTheme();
//     initNavigation();
//     initLanguage();
//     initScrollSystem();
//     initUI();
//   } catch (e) {
//     error("INIT FAILED:", e);
//   }
// });

// /* =====================================================
//    THEME SYSTEM
// ===================================================== */
// function initTheme() {
//   log("initTheme()");

//   const params = new URLSearchParams(window.location.search);
//   const savedTheme = localStorage.getItem("theme");
//   const theme = params.get("theme") || savedTheme || "light";

//   log("Theme detected:", { url: params.get("theme"), savedTheme, final: theme });

//   localStorage.setItem("theme", theme);

//   DOM.themeIcon = document.getElementById("themeIcon");
//   if (!DOM.themeIcon) warn("themeIcon not found");

//   applyTheme(theme);
//   updateFooterLinks(theme);

//   const themeBtn = document.getElementById("themeToggle");

//   if (!themeBtn) warn("themeToggle button missing");

//   themeBtn?.addEventListener("click", () => {
//     const isDark = document.documentElement.classList.contains("dark");
//     const newTheme = isDark ? "light" : "dark";

//     log("Theme toggle clicked:", newTheme);

//     localStorage.setItem("theme", newTheme);
//     applyTheme(newTheme);
//     updateURL(newTheme);
//     updateFooterLinks(newTheme);
//   });
// }

// function applyTheme(theme) {
//   log("applyTheme:", theme);

//   document.documentElement.classList.remove("dark", "light");
//   document.documentElement.classList.add(theme);

//   if (DOM.themeIcon) {
//     DOM.themeIcon.src =
//       theme === "dark"
//         ? "../assets/icons/light.svg"
//         : "../assets/icons/dark.svg";
//   }
// }

// function updateURL(theme) {
//   const url = new URL(window.location);
//   url.searchParams.set("theme", theme);
//   window.history.replaceState({}, "", url);
// }

// function updateFooterLinks(theme) {
//   const links = document.querySelectorAll("footer a");

//   log("updateFooterLinks count:", links.length);

//   links.forEach(link => {
//     let href = link.getAttribute("href");
//     if (!href) return;

//     href = href.split("?")[0];

//     const url = href.startsWith("http")
//       ? new URL(href)
//       : new URL(BASE_PATH + href, window.location.origin);

//     url.searchParams.set("theme", theme);
//     link.href = url.toString();
//   });
// }

// /* =====================================================
//    NAVIGATION
// ===================================================== */
// function initNavigation() {
//   log("initNavigation()");

//   const burger = document.querySelector(".burger");
//   const nav = document.querySelector(".nav-links");
//   const overlay = document.getElementById("overlay");

//   DOM.nav = nav;
//   DOM.burger = burger;
//   DOM.overlay = overlay;

//   if (!burger) warn("burger missing");
//   if (!nav) warn("nav-links missing");
//   if (!overlay) warn("overlay missing");

//   burger?.addEventListener("click", () => {
//     log("burger clicked");

//     nav?.classList.toggle("active");
//     overlay?.classList.toggle("active");
//   });

//   overlay?.addEventListener("click", closeNav);

//   function closeNav() {
//     log("closeNav()");
//     nav?.classList.remove("active");
//     overlay?.classList.remove("active");
//     burger?.classList.remove("active");
//   }

//   document.querySelectorAll(".nav-links a[href^='#']").forEach(link => {
//     link.addEventListener("click", e => {
//       e.preventDefault();

//       const id = link.getAttribute("href").replace("#", "");
//       const target = document.getElementById(id);

//       log("nav click:", id, target ? "FOUND" : "MISSING");

//       if (!target) return;

//       window.scrollTo({
//         top: target.offsetTop - 100,
//         behavior: "smooth"
//       });

//       setTimeout(setActiveNav, 150);
//     });
//   });
// }

// /* =====================================================
//    LANGUAGE
// ===================================================== */
// function initLanguage() {
//   log("initLanguage()");

//   const btn = document.getElementById("langToggle");

//   if (!btn) {
//     warn("langToggle missing");
//     return;
//   }

//   btn.addEventListener("click", () => {
//     log("language toggle clicked");

//     sessionStorage.setItem("scrollPos", window.scrollY);

//     const theme = localStorage.getItem("theme");
//     const query = theme ? `?theme=${theme}` : "";

//     const isArabic = location.pathname.includes("/ar/");
//     const target = isArabic ? "/en/" : "/ar/";

//     log("switching language:", { isArabic, target });

//     window.location.href = `${BASE_PATH}${target}${query}`;
//   });
// }

// /* =====================================================
//    SCROLL SYSTEM
// ===================================================== */
// function initScrollSystem() {
//   log("initScrollSystem()");

//   let ticking = false;

//   window.addEventListener("scroll", () => {
//     if (!ticking) {
//       requestAnimationFrame(() => {
//         setActiveNav();
//         updateHeader();
//         ticking = false;
//       });
//       ticking = true;
//     }
//   });

//   window.addEventListener("load", setActiveNav);
//   window.addEventListener("resize", setActiveNav);
// }

// /* =====================================================
//    ACTIVE NAV
// ===================================================== */
// function setActiveNav() {
//   const sections = document.querySelectorAll("section[id], footer[id]");
//   const scrollY = window.scrollY;
//   const vh = window.innerHeight;
//   const fullHeight = document.body.scrollHeight;

//   let current = "home";

//   sections.forEach(sec => {
//     const top = sec.offsetTop - 130;
//     const bottom = top + sec.offsetHeight;

//     if (scrollY >= top && scrollY < bottom) {
//       current = sec.id;
//     }
//   });

//   if (scrollY + vh >= fullHeight - 5) {
//     current = "contact";
//   }

//   document.querySelectorAll(".nav-links a").forEach(link => {
//     link.classList.toggle(
//       "active",
//       link.getAttribute("href") === `#${current}`
//     );
//   });

//   log("active section:", current);
// }

// /* =====================================================
//    HEADER
// ===================================================== */
// function updateHeader() {
//   const header = document.querySelector(".header");
//   if (!header) return;

//   header.classList.toggle("scrolled", window.scrollY > 30);
// }

// /* =====================================================
//    UI
// ===================================================== */
// function initUI() {
//   log("initUI()");

//   document.addEventListener("click", e => {
//     if (
//       DOM.nav &&
//       DOM.burger &&
//       !DOM.nav.contains(e.target) &&
//       !DOM.burger.contains(e.target)
//     ) {
//       DOM.nav.classList.remove("active");
//       DOM.burger.classList.remove("active");
//     }
//   });

//   const faders = document.querySelectorAll(".fade");

//   log("fade elements:", faders.length);

//   const observer = new IntersectionObserver(
//     entries => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("show");
//         }
//       });
//     },
//     { threshold: 0.2 }
//   );

//   faders.forEach(el => observer.observe(el));
// }
const BASE_PATH = "";
const DEBUG = true;

const log = (...args) => DEBUG && console.log("[DEBUG]", ...args);
const warn = (...args) => DEBUG && console.warn("[WARN]", ...args);
const error = (...args) => DEBUG && console.error("[ERROR]", ...args);

/* =====================================================
   GLOBAL CACHE
===================================================== */
const DOM = {};

/* =====================================================
   INIT (MOBILE SAFE)
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  log("DOM loaded");

  log("Mobile check:", window.innerWidth < 768 ? "YES" : "NO");

  try {
    initTheme();
    initNavigation();
    initLanguage();
    initScrollSystem();
    initUI();
  } catch (e) {
    error("INIT FAILED:", e);
  }

  // 🔥 IMPORTANT: delay first layout-dependent calls (mobile fix)
  setTimeout(() => {
    setActiveNav();
    updateHeader();
  }, 150);
});

/* =====================================================
   THEME SYSTEM
===================================================== */
function initTheme() {
  log("initTheme()");

  const params = new URLSearchParams(window.location.search);
  const savedTheme = localStorage.getItem("theme");
  const theme = params.get("theme") || savedTheme || "light";

  localStorage.setItem("theme", theme);

  DOM.themeIcon = document.getElementById("themeIcon");

  applyTheme(theme);
  updateFooterLinks(theme);

  const themeBtn = document.getElementById("themeToggle");

  themeBtn?.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    updateURL(newTheme);
    updateFooterLinks(newTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(theme);

  if (DOM.themeIcon) {
    DOM.themeIcon.src =
      theme === "dark"
        ? "../assets/icons/light.svg"
        : "../assets/icons/dark.svg";
  }
}

function updateURL(theme) {
  const url = new URL(window.location);
  url.searchParams.set("theme", theme);
  window.history.replaceState({}, "", url);
}

function updateFooterLinks(theme) {
  document.querySelectorAll("footer a").forEach(link => {
    let href = link.getAttribute("href");
    if (!href) return;

    href = href.split("?")[0];

    const url = href.startsWith("http")
      ? new URL(href)
      : new URL(BASE_PATH + href, window.location.origin);

    url.searchParams.set("theme", theme);
    link.href = url.toString();
  });
}

/* =====================================================
   NAVIGATION (MOBILE SAFE)
===================================================== */
function initNavigation() {
  log("initNavigation()");

  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const overlay = document.getElementById("overlay");

  DOM.nav = nav;
  DOM.burger = burger;
  DOM.overlay = overlay;

  burger?.addEventListener("click", () => {
    nav?.classList.toggle("active");
    overlay?.classList.toggle("active");
  });

  overlay?.addEventListener("click", closeNav);

  function closeNav() {
    nav?.classList.remove("active");
    overlay?.classList.remove("active");
    burger?.classList.remove("active");
  }

  document.querySelectorAll(".nav-links a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const id = link.getAttribute("href").replace("#", "");
      const target = document.getElementById(id);

      if (!target) return;

      window.scrollTo({
        top: target.offsetTop - 90,
        behavior: "smooth"
      });

      setTimeout(setActiveNav, 200);
    });
  });
}

/* =====================================================
   LANGUAGE
===================================================== */
function initLanguage() {
  log("initLanguage()");

  const btn = document.getElementById("langToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    sessionStorage.setItem("scrollPos", window.scrollY);

    const theme = localStorage.getItem("theme");
    const query = theme ? `?theme=${theme}` : "";

    const isArabic = location.pathname.includes("/ar/");
    const target = isArabic ? "/en/" : "/ar/";

    window.location.href = `${BASE_PATH}${target}${query}`;
  });
}

/* =====================================================
   SCROLL SYSTEM (FIXED MOBILE PERFORMANCE)
===================================================== */
function initScrollSystem() {
  log("initScrollSystem()");

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {
      setActiveNav();
      updateHeader();
      ticking = false;
    });
  }, { passive: true });

  window.addEventListener("load", () => {
    setTimeout(setActiveNav, 100);
  });

  window.addEventListener("resize", () => {
    setTimeout(setActiveNav, 100);
  });
}

/* =====================================================
   ACTIVE NAV (STABILIZED)
===================================================== */
function setActiveNav() {
  const sections = document.querySelectorAll("section[id], footer[id]");
  const scrollY = window.scrollY;
  const vh = window.innerHeight;
  const fullHeight = document.body.scrollHeight;

  let current = "home";

  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const bottom = top + sec.offsetHeight;

    if (scrollY >= top && scrollY < bottom) {
      current = sec.id;
    }
  });

  if (scrollY + vh >= fullHeight - 5) {
    current = "contact";
  }

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });

  log("active section:", current);
}

/* =====================================================
   HEADER
===================================================== */
function updateHeader() {
  const header = document.querySelector(".header");
  if (!header) return;

  header.classList.toggle("scrolled", window.scrollY > 30);
}

/* =====================================================
   UI (MOBILE SAFE OBSERVER)
===================================================== */
function initUI() {
  log("initUI()");

  document.addEventListener("click", e => {
    if (
      DOM.nav &&
      DOM.burger &&
      !DOM.nav.contains(e.target) &&
      !DOM.burger.contains(e.target)
    ) {
      DOM.nav.classList.remove("active");
      DOM.burger.classList.remove("active");
    }
  });

  const faders = document.querySelectorAll(".fade");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 } // 🔥 better for mobile
  );

  faders.forEach(el => observer.observe(el));
}