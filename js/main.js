document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     Scroll Active Nav Links
  ========================== */
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinksItems = document.querySelectorAll(".nav-links a[href^='#']");

  const setActiveLink = (id) => {
    navLinksItems.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${id}`
      );
    });
  };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveLink(entry.target.id);
    }
  });
}, {
  threshold: 0.4
});

  sections.forEach(section => observer.observe(section));


  /* =========================
     Case Cards Click (Event Delegation)
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
     Burger Menu
  ========================== */
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector(".overlay");

  if (burger && navLinks && overlay) {

    const openMenu = () => {
      navLinks.classList.add("active");
      overlay.classList.add("active");
      document.body.classList.add("no-scroll");
    };

    const closeMenu = () => {
      navLinks.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    };

    burger.addEventListener("click", () => {
      navLinks.classList.contains("active") ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    // Close menu when clicking any nav link
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        closeMenu();
      }
    });
  }
});