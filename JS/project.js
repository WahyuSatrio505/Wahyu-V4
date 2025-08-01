// Typing Animation
const typedTextSpan = document.querySelector(".typed-text")
const cursorSpan = document.querySelector(".cursor")

const textArray = ["Web Developer", "UI/UX Designer", "Frontend Developer", "Backend Developer"]
const typingDelay = 200
const erasingDelay = 100
const newTextDelay = 2000
let textArrayIndex = 0
let charIndex = 0

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex)
    charIndex++
    setTimeout(type, typingDelay)
  } else {
    cursorSpan.classList.remove("typing")
    setTimeout(erase, newTextDelay)
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1)
    charIndex--
    setTimeout(erase, erasingDelay)
  } else {
    cursorSpan.classList.remove("typing")
    textArrayIndex++
    if (textArrayIndex >= textArray.length) textArrayIndex = 0
    setTimeout(type, typingDelay + 1100)
  }
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation link
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Counter animation for stats
function animateCounter(element, target) {
  let current = 0
  const increment = target / 100
  const timer = setInterval(() => {
    current += increment
    element.textContent = Math.floor(current)
    if (current >= target) {
      element.textContent = target
      clearInterval(timer)
    }
  }, 20)
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated")

      // Animate skill bars
      if (entry.target.classList.contains("skill-progress")) {
        const width = entry.target.getAttribute("data-width")
        setTimeout(() => {
          entry.target.style.width = width
        }, 200)
      }

      // Animate counters
      if (entry.target.classList.contains("stat-number")) {
        const target = Number.parseInt(entry.target.getAttribute("data-target"))
        animateCounter(entry.target, target)
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  // Add animation class to elements
  const animateElements = document.querySelectorAll(
    ".about-card, .skill-category, .certificate-card, .project-card, .contact-item",
  )
  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll")
    observer.observe(el)
  })

  // Observe skill bars
  document.querySelectorAll(".skill-progress").forEach((el) => {
    observer.observe(el)
  })

  // Observe stat numbers
  document.querySelectorAll(".stat-number").forEach((el) => {
    observer.observe(el)
  })
})

// Import GSAP and plugins
const gsap = window.gsap
const ScrollTrigger = window.gsap.ScrollTrigger
const TextPlugin = window.gsap.TextPlugin

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin)

// Cyberpunk Color Palette
const colors = {
  neonCyan: "#00ffff",
  neonPink: "#ff00ff",
  neonGreen: "#00ff41",
  neonPurple: "#8a2be2",
  neonYellow: "#ffff00",
  neonRed: "#ff073a",
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeAnimations()
  initializeParticles()
  initializeDigitalRain()
  initializeTypewriter()
  initializeFilters()
  initializeCardInteractions()
  console.log("🤖 CYBERPUNK SYSTEM INITIALIZED")
})

// Main Animations
function initializeAnimations() {
  // Animate title on load
  gsap.from(".title-glitch", {
    duration: 2,
    scale: 0.5,
    opacity: 0,
    ease: "power3.out",
    delay: 0.5,
  })

  // Animate navigation
  gsap.from(".cyber-nav", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "power2.out",
    delay: 1,
  })

  // Animate cards with stagger
  gsap.from(".project-card", {
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.2,
    ease: "power2.out",
    delay: 1.5,
    scrollTrigger: {
      trigger: ".projects-grid",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  })

  // Animate system status
  gsap.from(".system-status", {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: "power2.out",
    delay: 2,
    scrollTrigger: {
      trigger: ".system-status",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  })

  // Continuous corner animations
  animateCorners()
}

// Animate card corners
function animateCorners() {
  document.querySelectorAll(".corner").forEach((corner, index) => {
    gsap.to(corner, {
      scale: 1.2,
      opacity: 0.5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: index * 0.1,
    })
  })
}

// Neon Particles System
function initializeParticles() {
  const canvas = document.getElementById("neonParticles")
  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles = []
  const particleCount = 100

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      color: Object.values(colors)[Math.floor(Math.random() * Object.values(colors).length)],
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * 2,
    })
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width
      if (particle.x > canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = canvas.height
      if (particle.y > canvas.height) particle.y = 0

      // Update pulse
      particle.pulse += 0.02
      const currentOpacity = particle.opacity * (0.5 + 0.5 * Math.sin(particle.pulse))

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.globalAlpha = currentOpacity
      ctx.fill()

      // Add glow effect
      ctx.shadowBlur = 20
      ctx.shadowColor = particle.color
      ctx.fill()
      ctx.shadowBlur = 0

      // Connect nearby particles
      for (let j = index + 1; j < particles.length; j++) {
        const dx = particles[j].x - particle.x
        const dy = particles[j].y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = particle.color
          ctx.globalAlpha = 0.1 * (1 - distance / 100)
          ctx.stroke()
        }
      }
    })

    requestAnimationFrame(animateParticles)
  }

  animateParticles()

  // Resize handler
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// Digital Rain Effect
function initializeDigitalRain() {
  const canvas = document.getElementById("digitalRain")
  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const fontSize = 14
  const columns = canvas.width / fontSize
  const drops = Array(Math.floor(columns)).fill(1)

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?"

  function drawRain() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = colors.neonGreen
    ctx.font = fontSize + "px monospace"

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }

    requestAnimationFrame(drawRain)
  }

  drawRain()

  // Resize handler
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// Typewriter Effect
function initializeTypewriter() {
  const texts = [
    "DIGITAL_PORTFOLIO_LOADING...",
    "NEURAL_NETWORK_ACTIVE",
    "QUANTUM_PROJECTS_INITIALIZED",
    "CYBERPUNK_MODE_ENABLED",
    "SYSTEM_READY_FOR_ACCESS",
  ]

  let currentTextIndex = 0
  let currentCharIndex = 0
  let isDeleting = false

  const typewriterElement = document.querySelector(".typewriter-text")

  function typeWriter() {
    const currentText = texts[currentTextIndex]

    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1)
      currentCharIndex--
    } else {
      typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1)
      currentCharIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && currentCharIndex === currentText.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false
      currentTextIndex = (currentTextIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(typeWriter, typeSpeed)
  }

  typeWriter()
}

// Filter System
function initializeFilters() {
  const filterBtns = document.querySelectorAll(".cyber-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      const filter = btn.dataset.filter

      // Animate button click
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      })

      // Filter cards
      filterCards(filter, projectCards)
    })
  })
}

// Filter Cards Animation
function filterCards(filter, cards) {
  cards.forEach((card, index) => {
    const category = card.dataset.category
    const shouldShow = filter === "all" || category === filter

    if (shouldShow) {
      gsap.to(card, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: index * 0.1,
      })
      card.style.display = "block"
    } else {
      gsap.to(card, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          card.style.display = "none"
        },
      })
    }
  })

  // Update project count
  const visibleCards = Array.from(cards).filter((card) => filter === "all" || card.dataset.category === filter)
  document.getElementById("projectCount").textContent = visibleCards.length.toString().padStart(2, "0")
}

// Card Interactions
function initializeCardInteractions() {
  const cards = document.querySelectorAll(".project-card")

  cards.forEach((card) => {
    // Hover effects
    card.addEventListener("mouseenter", () => {
      // Animate card elevation
      gsap.to(card, {
        y: -15,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      })

      // Animate corners
      const corners = card.querySelectorAll(".corner")
      gsap.to(corners, {
        scale: 1.5,
        opacity: 1,
        duration: 0.3,
        stagger: 0.05,
      })

      // Animate data stream
      const streamLines = card.querySelectorAll(".stream-line")
      gsap.to(streamLines, {
        opacity: 1,
        duration: 0.3,
      })

      // Create particle burst
      createParticleBurst(card)
    })

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })

      const corners = card.querySelectorAll(".corner")
      gsap.to(corners, {
        scale: 1,
        opacity: 0.5,
        duration: 0.3,
      })

      const streamLines = card.querySelectorAll(".stream-line")
      gsap.to(streamLines, {
        opacity: 0.5,
        duration: 0.3,
      })
    })

    // Click effect
    card.addEventListener("click", () => {
      // Screen flash effect
      createScreenFlash()

      // Card pulse
      gsap.to(card, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })

      // Show access message
      showAccessMessage()
    })
  })
}

// Create Particle Burst Effect
function createParticleBurst(card) {
  const rect = card.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div")
    particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: ${colors.neonCyan};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${centerX}px;
            top: ${centerY}px;
            box-shadow: 0 0 10px ${colors.neonCyan};
        `

    document.body.appendChild(particle)

    const angle = (i / 15) * Math.PI * 2
    const distance = 80 + Math.random() * 40
    const endX = centerX + Math.cos(angle) * distance
    const endY = centerY + Math.sin(angle) * distance

    gsap.to(particle, {
      x: endX - centerX,
      y: endY - centerY,
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => particle.remove(),
    })
  }
}

// Screen Flash Effect
function createScreenFlash() {
  const flash = document.createElement("div")
  flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${colors.neonCyan};
        opacity: 0;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: overlay;
    `

  document.body.appendChild(flash)

  gsap.to(flash, {
    opacity: 0.3,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    onComplete: () => flash.remove(),
  })
}

// Show Access Message
function showAccessMessage() {
  const message = document.createElement("div")
  message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px 40px;
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid ${colors.neonCyan};
        border-radius: 10px;
        color: ${colors.neonCyan};
        font-family: 'Orbitron', monospace;
        font-weight: 700;
        z-index: 10000;
        box-shadow: 0 0 30px ${colors.neonCyan};
        opacity: 0;
        scale: 0.8;
    `
  message.textContent = "ACCESS GRANTED - LOADING PROJECT..."

  document.body.appendChild(message)

  gsap.to(message, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    ease: "back.out(1.7)",
  })

  setTimeout(() => {
    gsap.to(message, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => message.remove(),
    })
  }, 2000)
}

// Random Glitch Effect
function addRandomGlitches() {
  setInterval(() => {
    if (Math.random() > 0.97) {
      const cards = document.querySelectorAll(".project-card")
      const randomCard = cards[Math.floor(Math.random() * cards.length)]

      gsap.to(randomCard, {
        x: Math.random() * 4 - 2,
        y: Math.random() * 4 - 2,
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(randomCard, { x: 0, y: 0 })
        },
      })
    }
  }, 100)
}

// Initialize random glitches
addRandomGlitches()

// Performance optimization
function optimizePerformance() {
  // Pause animations when tab is not visible
  document.addEventListener("visibilitychange", () => {
    const timelines = gsap.globalTimeline.getChildren()
    if (document.hidden) {
      timelines.forEach((tl) => tl.pause())
    } else {
      timelines.forEach((tl) => tl.resume())
    }
  })

  // Throttle resize events
  let resizeTimeout
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      // Refresh canvas sizes
      const neonCanvas = document.getElementById("neonParticles")
      const rainCanvas = document.getElementById("digitalRain")

      if (neonCanvas) {
        neonCanvas.width = window.innerWidth
        neonCanvas.height = window.innerHeight
      }

      if (rainCanvas) {
        rainCanvas.width = window.innerWidth
        rainCanvas.height = window.innerHeight
      }
    }, 250)
  })
}

// Initialize performance optimizations
optimizePerformance()

console.log("🚀 CYBERPUNK PROJECTS SYSTEM FULLY LOADED")



// beda lagi

// Service Worker for caching resources
const CACHE_NAME = "portfolio-v1"
const urlsToCache = [
  "/",
  "/styles.css",
  "/lazy-loading.css",
  "/script.js",
  "/lazy-loading.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
})

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request)
    }),
  )
})

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})
