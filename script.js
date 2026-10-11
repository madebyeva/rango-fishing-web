
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // MENÚ PARA MÓVILES
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.innerHTML = isOpen
        ? 'Cerrar <span aria-hidden="true">✕</span>'
        : 'Menú <span aria-hidden="true">☰</span>';
    });

    // Cerrar el menú al elegir una página.
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = 'Menú <span aria-hidden="true">☰</span>';
      });
    });
  }

  // MODO SPORT
  const sportToggle = document.querySelector("#sport-toggle");
  const sportStorageKey = "rangowild-modo-sport";

  function setSportMode(enabled) {
    body.classList.toggle("modo-sport", enabled);

    if (sportToggle) {
      sportToggle.setAttribute("aria-pressed", String(enabled));
    }

    try {
      localStorage.setItem(sportStorageKey, String(enabled));
    } catch (error) {
      // El modo sigue funcionando aunque el navegador
      // no permita guardar preferencias.
    }
  }

  let savedSportMode = false;

  try {
    savedSportMode = localStorage.getItem(sportStorageKey) === "true";
  } catch (error) {
    savedSportMode = false;
  }

  setSportMode(savedSportMode);

  if (sportToggle) {
    sportToggle.addEventListener("click", () => {
      const isEnabled = body.classList.contains("modo-sport");
      setSportMode(!isEnabled);
    });
  }

  // MARCAR LA PÁGINA ACTUAL EN EL MENÚ
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".main-nav a").forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
});
