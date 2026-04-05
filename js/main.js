const BASE_PATH = "/SEO";
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

  /* 🔥 UPDATE FOOTER LINKS (NO REFRESH FIX) */
  function updateFooterLinks(theme) {
    document.querySelectorAll(".footer-links a").forEach(link => {
      const baseUrl = link.getAttribute("href").split("?")[0];
      const url = new URL(BASE_PATH + baseUrl, window.location.origin);

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

  /* ✅ Overlay click = always close */
  overlay.addEventListener("click", () => {
    nav.classList.remove("active");
    burger.classList.remove("active");
    overlay.classList.remove("active");
  });

  /* ✅ Prevent closing when clicking inside sidebar */
  // nav.addEventListener("click", (e) => {
  //   e.stopPropagation();
  // });

}

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      burger.classList.remove("active");
      overlay.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (nav && burger && !nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove("active");
      burger.classList.remove("active");
    }
  });

  /* =========================
     CASE CARDS CLICK
  ========================== */
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".case-card");
    if (!card) return;

    const link = card.dataset.link;
    if (link) {
      window.location.href = link;
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

      if (isArabicPage) {
      window.location.href = `${BASE_PATH}/en/${query}`;
      } else {
      window.location.href = `${BASE_PATH}/ar/${query}`;
      }
    });
  }

});


function setActiveNav() {
  const hash = window.location.hash || "#home";

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === hash) {
      link.classList.add("active");
    }
  });
}

// run on load
setActiveNav();

// run when hash changes
window.addEventListener("hashchange", setActiveNav);

// ALSO run after clicking nav links (important fix)
document.querySelectorAll(".nav-links a[href^='#']").forEach(link => {
  link.addEventListener("click", () => {
    setTimeout(setActiveNav, 0);
  });
});
