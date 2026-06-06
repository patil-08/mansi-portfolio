const header = document.querySelector(".site-header");
const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-link");
const scrollLinks = document.querySelectorAll('a[href^="#"]');
const sections = document.querySelectorAll("main section[id]");
const animatedItems = document.querySelectorAll(".fade-in");
const counters = document.querySelectorAll(".counter");
const typingText = document.querySelector(".typing-text");
const progressBar = document.querySelector(".progress-bar");
const backToTop = document.querySelector(".back-to-top");

// Mobile navigation
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Smooth scrolling for internal links
scrollLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (!targetSection) {
      return;
    }

    event.preventDefault();
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// One lightweight scroll handler for progress, header state, and back-to-top.
let ticking = false;

const updateScrollUi = () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  const isScrolled = scrollTop > 20;

  progressBar.style.width = `${progress}%`;
  header.classList.toggle("scrolled", isScrolled);
  navbar.classList.toggle("scrolled", isScrolled);
  backToTop.classList.toggle("show", scrollTop > 300);

  ticking = false;
};

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollUi);
      ticking = true;
    }
  },
  { passive: true }
);

window.addEventListener("load", updateScrollUi);

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Section and element reveal animations
const revealTargets = new Set([...sections, ...animatedItems]);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show", "visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -70px 0px",
  }
);

revealTargets.forEach((item) => revealObserver.observe(item));

// Active navigation highlight
const setActiveLink = (sectionId) => {
  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
  });
};

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  {
    threshold: 0.35,
    rootMargin: "-25% 0px -50% 0px",
  }
);

sections.forEach((section) => activeObserver.observe(section));

// Hero typing animation
const typeHeroText = () => {
  if (!typingText) {
    return;
  }

  const fullText = typingText.dataset.text || "";
  let index = 0;
  typingText.textContent = "";
  typingText.classList.add("cursor");

  const typeNextCharacter = () => {
    typingText.textContent = fullText.slice(0, index);
    index += 1;

    if (index <= fullText.length) {
      window.setTimeout(typeNextCharacter, 62);
    } else {
      window.setTimeout(() => typingText.classList.remove("cursor"), 900);
    }
  };

  typeNextCharacter();
};

window.addEventListener("load", typeHeroText);

// Animated hero stat counters
const animateCounter = (counter) => {
  const target = Number(counter.dataset.target);
  const decimals = Number(counter.dataset.decimals || 0);
  const duration = 1300;
  const startTime = performance.now();

  const tick = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const value = target * easedProgress;

    counter.textContent = value.toFixed(decimals);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      counter.textContent = target.toFixed(decimals);
    }
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.65 }
);

counters.forEach((counter) => counterObserver.observe(counter));
