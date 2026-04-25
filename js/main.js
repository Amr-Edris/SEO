const BASE_PATH = "";
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     THEME INIT (IMPORTANT FIRST)
  ========================== */
  const params = new URLSearchParams(window.location.search);
  const savedTheme = localStorage.getItem("theme");
  const theme = params.get("theme") || savedTheme || "light";

  /* 🔥 SAVE FIRST */
  localStorage.setItem("theme", theme);

  /* =========================
     APPLY THEME
  ========================== */
  const themeIcon = document.getElementById("themeIcon");

  function applyTheme(theme) {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);

    if (themeIcon) {
      themeIcon.src =
        theme === "dark"
          ? "../assets/icons/light.svg"
          : "../assets/icons/dark.svg";
    }
  }

  function updateURL(theme) {
    const url = new URL(window.location);
    url.searchParams.set("theme", theme);
    window.history.replaceState({}, '', url);
  }
function updateFooterLinks(theme) {
  document.querySelectorAll(".footer-links a").forEach(link => {
    let href = link.getAttribute("href");
    if (!href) return;

    // Remove query params
    href = href.split("?")[0];

    let url;

    if (href.startsWith("http")) {
      // External links → leave as is
      url = new URL(href);
    } else {
      // Internal links → safely prepend BASE_PATH
      url = new URL(BASE_PATH + href, window.location.origin);
    }

    url.searchParams.set("theme", theme);
    link.href = url.toString();
  });
}
  applyTheme(theme);
  updateFooterLinks(theme);

  /* =========================
     THEME TOGGLE
  ========================== */
  const themeBtn = document.getElementById("themeToggle");

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.contains("dark");
      const newTheme = isDark ? "light" : "dark";

      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
      updateURL(newTheme);

      /* 🔥 IMPORTANT */
      updateFooterLinks(newTheme);
    });
  }

  /* =========================
     BURGER MENU
  ========================== */
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const overlay = document.getElementById("overlay");

if (burger && nav && overlay) {

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    nav.classList.remove("active");
    burger.classList.remove("active");
    overlay.classList.remove("active");
  });



}

document.querySelectorAll(".nav-links a[href^='#']").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href").replace("#", "");
    const target = document.getElementById(targetId);

    if (!target) return;

    const offset = 100; // adjust for header height

    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: "smooth"
    });

    setTimeout(setActiveNav, 300);
  });
});

  document.addEventListener("click", (e) => {
    if (nav && burger && !nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove("active");
      burger.classList.remove("active");
    }
  });


  /* =========================
     LANGUAGE TOGGLE
  ========================== */
  const langBtn = document.getElementById("langToggle");

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      window.sessionStorage.setItem("scrollPos", window.scrollY);

      const currentTheme = localStorage.getItem("theme");
      const query = currentTheme ? `?theme=${currentTheme}` : "";

      const isArabicPage = window.location.pathname.includes("/ar/");

      const target = isArabicPage ? "/en/" : "/ar/";
      window.location.href = `${BASE_PATH}${target}${query}`;
    });
  }

});
function setActiveNav() {
  const sections = document.querySelectorAll("section[id], footer[id]");
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const fullHeight = document.body.scrollHeight;

  let currentSectionId = "home";

  sections.forEach(section => {
    const top = section.offsetTop - 130;
    const bottom = top + section.offsetHeight;

    if (scrollY >= top && scrollY < bottom) {
      currentSectionId = section.getAttribute("id");
    }
  });

  // ✅ FORCE CONTACT WHEN AT PAGE BOTTOM
  if (scrollY + viewportHeight >= fullHeight - 5) {
    currentSectionId = "contact";
  }

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (href && href === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
}
// run on load
setActiveNav();

// run when hash changes
window.addEventListener("hashchange", setActiveNav);
window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);
window.addEventListener("resize", setActiveNav);

// ALSO run after clicking nav links (important fix)
document.querySelectorAll(".nav-links a[href^='#']").forEach(link => {
  link.addEventListener("click", () => {
    setTimeout(setActiveNav, 0);
  });
});

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
const faders = document.querySelectorAll(".fade");

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

faders.forEach(el => appearOnScroll.observe(el));