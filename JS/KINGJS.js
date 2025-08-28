// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");

  mobileMenuBtn.addEventListener("click", function () {
    mobileNav.classList.toggle("active");
    const icon = mobileMenuBtn.querySelector("i");
    if (mobileNav.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Scroll to top button
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('header a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (mobileNav.classList.contains("active")) {
          mobileNav.classList.remove("active");
          const icon = mobileMenuBtn.querySelector("i");
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  });

  // Update active navigation link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Add active class to current section link
        const activeLink = document.querySelector(`header a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }

  // Animate skill bars and progress bars when they come into view
  const skillProgress = document.querySelectorAll(".skill-progress");
  const progressFill = document.querySelectorAll(".progress-fill");

  // Initialize Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("skill-progress")) {
            const width = entry.target.getAttribute("data-width");
            entry.target.style.width = `${width}%`;
          }

          if (entry.target.classList.contains("progress-fill")) {
            const width = entry.target.getAttribute("data-width");
            entry.target.style.width = `${width}%`;
          }

          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe all skill and progress bars
  skillProgress.forEach((bar) => {
    observer.observe(bar);
  });

  progressFill.forEach((bar) => {
    observer.observe(bar);
  });

  // Form submission (you can replace this with FormSpace integration)
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Here you would typically send the form data to a server or service
      // For now, we'll just log it and show an alert
      console.log({
        name,
        email,
        subject,
        message,
      });

      alert("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
    });
  }

  // Add animation to skill cards and project cards
  const skillCards = document.querySelectorAll(".skill-card");
  const projectCards = document.querySelectorAll(".project-card");

  // Create observer for cards
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          cardObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Set initial styles and observe cards
  skillCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.5s ease";
    card.style.transitionDelay = `${index * 0.1}s`;
    cardObserver.observe(card);
  });

  projectCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.5s ease";
    card.style.transitionDelay = `${index * 0.1}s`;
    cardObserver.observe(card);
  });

  // Call updateActiveNavLink on page load
  updateActiveNavLink();
});

// Tunggu sampai semua konten selesai ke-load
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");
  preloader.classList.add("hidden");
  setTimeout(() => {
    preloader.style.display = "none";
    content.style.display = "block";
  }, 2900); // tunggu animasi fade-out selesai
});
