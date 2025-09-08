// Pastikan untuk menyertakan GSAP di halaman Anda
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js"></script>

document.addEventListener("DOMContentLoaded", function () {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Typing effect for subtitle
  const typedTextElement = document.querySelector(".typed-text");
  const cursorElement = document.querySelector(".cursor");
  const textArray = ["Student🏫", "UI/UX Designer🛸", "Frontend Developer🫧", "Gamer🎮"];
  let textArrayIndex = 0;
  let charIndex = 0;
  let typingDelay = 100;
  let erasingDelay = 50;
  let newTextDelay = 2000;
  let isDeleting = false;

  function type() {
    const currentText = textArray[textArrayIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(type, newTextDelay);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? erasingDelay : typingDelay);
    }
  }

  // Start typing effect
  setTimeout(type, newTextDelay);

  // GSAP Animations

  // About Image Animation
  gsap.from(".about-image-wrapper", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });

  // Tech Tags Animation
  gsap.from(".tech-tag", {
    scrollTrigger: {
      trigger: ".tech-tags",
      start: "top 90%",
      toggleActions: "play none none none",
    },
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: "back.out(1.7)",
  });

  // About Text Animation
  gsap.to(".about-text-wrapper", {
    scrollTrigger: {
      trigger: ".about-text-container",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 1,
    duration: 1,
    ease: "power2.out",
  });

  // About Headings Animation
  gsap.from(".about-heading", {
    scrollTrigger: {
      trigger: ".about-text-container",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    x: -50,
    opacity: 0,
    stagger: 0.3,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.5,
  });

  // About Paragraphs Animation
  gsap.from(".about-paragraph", {
    scrollTrigger: {
      trigger: ".about-text-container",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 30,
    opacity: 0,
    stagger: 0.3,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.7,
  });

  // Personal Info Animation
  gsap.to(".info-item", {
    scrollTrigger: {
      trigger: ".personal-info",
      start: "top 85%",
      toggleActions: "play none none none",
    },
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "power2.out",
    delay: 1,
  });

  // Experience Bars Animation
  gsap.to(".experience-item", {
    scrollTrigger: {
      trigger: ".experience-bars",
      start: "top 85%",
      toggleActions: "play none none none",
    },
    opacity: 1,
    x: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out",
    delay: 1.2,
  });

  // Progress Fill Animation
  document.querySelectorAll(".progress-fill").forEach((fill) => {
    const width = fill.getAttribute("data-width");

    gsap.to(fill, {
      scrollTrigger: {
        trigger: fill,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      width: width,
      duration: 1.5,
      ease: "power2.out",
      delay: 1.5,
    });
  });

  // CTA Button Animation
  gsap.to(".about-cta", {
    scrollTrigger: {
      trigger: ".experience-bars",
      start: "bottom 85%",
      toggleActions: "play none none none",
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "back.out(1.7)",
    delay: 2,
  });

  // Parallax Effect for Image
  gsap.to(".about-image", {
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
    y: -50,
    ease: "none",
  });

  // Mouse move effect for image
  const imageWrapper = document.querySelector(".about-image-wrapper");

  document.addEventListener("mousemove", (e) => {
    if (!imageWrapper) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = imageWrapper.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    gsap.to(".about-image", {
      rotationY: x * 10,
      rotationX: -y * 10,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power1.out",
    });
  });

  // Reset rotation when mouse leaves
  document.addEventListener("mouseleave", () => {
    gsap.to(".about-image", {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "power1.out",
    });
  });
});

const text = "Mahasiswa Aktif   (Computer Science)";
const typingElement = document.getElementById("typing");

let i = 0;
function typeWriter() {
  if (i < text.length) {
    typingElement.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 550); // kecepatan ngetik
  }
}

window.onload = typeWriter;
