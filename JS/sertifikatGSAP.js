// certificates.js
document.addEventListener('DOMContentLoaded', function() {
  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Get references to elements
  const sectionRef = document.getElementById('certificates');
  const titleRef = document.getElementById('cert-title');
  const cardsRef = document.getElementById('cert-cards');
  const cards = document.querySelectorAll('.certificate-card');
  
  // Title animation with glitch effect
  const titleAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: titleRef,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
  
  titleAnimation
    .fromTo(
      titleRef,
      { opacity: 0, y: -50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
    )
    .to(
      titleRef,
      {
        textShadow: "0 0 10px #8a2be2, 0 0 20px #8a2be2, 0 0 30px #8a2be2",
        color: "#fff",
        duration: 0.3,
        repeat: 1,
        yoyo: true
      },
      "-=0.2"
    );
  
  // Cards animation
  // Initial animation when scrolling to the section
  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 100,
      rotationY: 15,
      scale: 0.8
    },
    {
      opacity: 1,
      y: 0,
      rotationY: 0,
      scale: 1,
      stagger: 0.3,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardsRef,
        start: "top 75%"
      }
    }
  );
  
  // Floating animation that runs continuously
  gsap.to(cards, {
    y: "10px",
    duration: 2,
    ease: "sine.inOut",
    stagger: 0.2,
    repeat: -1,
    yoyo: true
  });
  
  // Add hover effects for each card
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(138, 43, 226, 0.4)",
        borderColor: "rgba(138, 43, 226, 0.6)",
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Glow effect on hover
      gsap.to(card.querySelector('.certificate-glow'), {
        opacity: 1,
        duration: 0.4
      });
      
      // Show overlay with button
      gsap.to(card.querySelector('.certificate-overlay'), {
        opacity: 1,
        duration: 0.3
      });
      
      // Zoom image slightly
      gsap.to(card.querySelector('.certificate-img'), {
        scale: 1.1,
        duration: 0.5
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Remove glow effect
      gsap.to(card.querySelector('.certificate-glow'), {
        opacity: 0,
        duration: 0.4
      });
      
      // Hide overlay
      gsap.to(card.querySelector('.certificate-overlay'), {
        opacity: 0,
        duration: 0.3
      });
      
      // Reset image zoom
      gsap.to(card.querySelector('.certificate-img'), {
        scale: 1,
        duration: 0.5
      });
    });
  });
});