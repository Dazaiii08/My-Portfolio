// Portfolio interactions — dependency-free vanilla JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const navMenu = document.getElementById("nav-links");
  const menuToggle = document.getElementById("menu-toggle");
  const progressBar = document.getElementById("scroll-progress");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the intro as soon as the document is ready (with a short visual pause).
  window.setTimeout(() => loadingScreen?.classList.add("hidden"), 450);

  // Mobile navigation.
  menuToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Reliable in-page navigation (including fixed-header offset and mobile menu close).
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const id = link.getAttribute("href");
      const target = id && document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      navMenu?.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      if (window.location.hash !== id) history.pushState(null, "", id);
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    });
  });

  // Active section highlighting.
  const sections = [...document.querySelectorAll("main section[id]")];
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
  sections.forEach(section => sectionObserver.observe(section));

  // Scroll progress indicator.
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = `${Math.min(100, percent)}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // Reveal content as it enters the viewport.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Typing effect.
  const typingTarget = document.querySelector(".typing-text");
  const phrases = [
    "intelligent ML systems.",
    "computer vision pipelines.",
    "full-stack applications.",
    "software that solves problems."
  ];
  if (typingTarget) {
    let phraseIndex = 0, characterIndex = 0, deleting = false;
    const type = () => {
      const phrase = phrases[phraseIndex];
      typingTarget.textContent = phrase.slice(0, characterIndex);
      if (!deleting && characterIndex < phrase.length) {
        characterIndex++;
        window.setTimeout(type, 72);
      } else if (deleting && characterIndex > 0) {
        characterIndex--;
        window.setTimeout(type, 34);
      } else if (!deleting) {
        deleting = true;
        window.setTimeout(type, 1350);
      } else {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        window.setTimeout(type, 260);
      }
    };
    if (reducedMotion) {
      typingTarget.textContent = phrases[0];
    } else {
      type();
    }
  }

  // Current year.
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

  // Small easter egg: Konami code.
  const konami = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"
  ];
  let keySequence = [];
  document.addEventListener("keydown", event => {
    if (event.target.matches("input, textarea, select")) return;
    keySequence.push(event.code);
    keySequence = keySequence.slice(-konami.length);
    if (keySequence.join("|") === konami.join("|")) {
      document.body.style.animation = "hueParty 2.5s linear 3";
      showToast("Easter egg unlocked. Nice one!");
      window.setTimeout(() => { document.body.style.animation = ""; }, 7500);
      keySequence = [];
    }
  });

  function showToast(message) {
    const toast = document.getElementById("toast");
    const text = toast?.querySelector(".toast-message");
    if (!toast || !text) return;
    text.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 3500);
  }
});
