/*
  Portfolio interactions
  - Loading screen fade-out
  - Mobile nav toggle
  - Smooth scrolling enhancements
  - Active nav highlighting
  - Scroll reveal animations
  - Skill bar animation
  - Typing effect
  - Back-to-top button
  - Contact form UI handling
  - Resume download generation
*/

document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.querySelector(".loading-screen");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = Array.from(document.querySelectorAll(".nav-menu a"));
  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  const skillItems = Array.from(document.querySelectorAll(".skill-item"));
  const backToTop = document.querySelector(".back-to-top");
  const toast = document.getElementById("toast");
  const contactForm = document.getElementById("contact-form");
  const typingText = document.getElementById("typing-text");
  const resumeDownload = document.getElementById("resume-download");

  const typingPhrases = [
    "AI research and prompt engineering",
    "data analysis and visualization",
    "Python, C, and SQL fundamentals",
    "communication and leadership",
  ];

  const resumeData = {
    name: "Abhiram Madire",
    title: "Data Science and Statistics student at UCF",
    contact: {
      email: "madire.abhiram@googlemail.com",
      phone: "+1 (904) 484-8439",
      linkedin: "Abhiram Madire",
    },
    education: [
      "University of Central Florida — B.S. Data Science | B.S. Statistics (Expected May 2029)",
      "Beachside High School — High School Diploma | Unweighted GPA: 3.8/4.0",
    ],
    projects: [
      "Prompt Engineering Research Study — analyzed how prompt structure affects AI response quality using Google NotebookLM.",
      "Mortgage Calculator — Python calculator for monthly payments, amortization, and payment strategy comparisons.",
    ],
  };

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.hideTimer);
    showToast.hideTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2400);
  }

  function closeMenu() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        skillItems.forEach((skillItem) => {
          const level = skillItem.getAttribute("data-level") || "0";
          const bar = skillItem.querySelector(".skill-bar span");
          if (bar) bar.style.width = `${level}%`;
        });
        skillsObserver.disconnect();
      });
    },
    { threshold: 0.4 }
  );

  const skillsSection = document.getElementById("skills");
  if (skillsSection) skillsObserver.observe(skillsSection);

  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { threshold: 0.5, rootMargin: "-20% 0px -30% 0px" }
  );

  sections.forEach((section) => activeObserver.observe(section));

  function updateBackToTop() {
    if (!backToTop) return;
    const shouldShow = window.scrollY > 700;
    backToTop.classList.toggle("is-visible", shouldShow);
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (typingText) {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function animateTyping() {
      const currentPhrase = typingPhrases[phraseIndex];
      typingText.textContent = currentPhrase.slice(0, charIndex);

      if (!deleting && charIndex < currentPhrase.length) {
        charIndex += 1;
      } else if (deleting && charIndex > 0) {
        charIndex -= 1;
      } else if (!deleting && charIndex === currentPhrase.length) {
        deleting = true;
        window.setTimeout(animateTyping, 1200);
        return;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      }

      const speed = deleting ? 34 : 58;
      window.setTimeout(animateTyping, speed);
    }

    animateTyping();
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      contactForm.reset();
      showToast("Message UI ready. Connect via email or LinkedIn.");
    });
  }

  if (resumeDownload) {
    resumeDownload.addEventListener("click", (event) => {
      event.preventDefault();
      const content = [
        `${resumeData.name}`,
        `${resumeData.title}`,
        "",
        `Email: ${resumeData.contact.email}`,
        `Phone: ${resumeData.contact.phone}`,
        `LinkedIn: ${resumeData.contact.linkedin}`,
        "",
        "Education:",
        ...resumeData.education.map((item) => `- ${item}`),
        "",
        "Projects:",
        ...resumeData.projects.map((item) => `- ${item}`),
      ].join("\n");

      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "Abhiram_Madire_Resume.txt";
      anchor.click();
      URL.revokeObjectURL(url);
      showToast("Resume download started.");
    });
  }

  window.setTimeout(() => {
    if (loadingScreen) loadingScreen.classList.add("is-hidden");
  }, 650);
});
