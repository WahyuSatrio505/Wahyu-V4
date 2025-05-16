// Learning Section Animation Module
// This script is scoped to only affect the learning section
const LearningAnimation = (function() {
  // Private variables
  let learningSection;
  let cursor;
  let animations = [];
  
  // Initialize the module
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup);
    } else {
      setup();
    }
    
    // Return public methods
    return {
      refresh: refresh,
      cleanup: cleanup
    };
  }
  
  // Setup all animations
  function setup() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
      console.error('GSAP is not loaded. Please include the GSAP library.');
      return;
    }
    
    // Find learning section
    learningSection = document.querySelector('.learning-section');
    if (!learningSection) {
      console.error('Learning section not found. Make sure the element with class "learning-section" exists.');
      return;
    }
    
    // Setup custom cursor
    setupCursor();
    
    // Setup animations
    setupTitleAnimations();
    setupCardAnimations();
    setupParticles();
    setupParallax();
    setupScrollIndicator();
    
    console.log('Learning section animations initialized');
  }
  
  // Setup custom cursor
  function setupCursor() {
    // Create cursor element
    cursor = document.createElement('div');
    cursor.className = 'learning-section-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    cursor.style.mixBlendMode = 'difference';
    cursor.style.pointerEvents = 'none';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.zIndex = '9999';
    cursor.style.opacity = '0';
    cursor.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(cursor);
    
    // Show cursor only in learning section
    learningSection.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
    });
    
    learningSection.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
    
    // Move cursor
    learningSection.addEventListener('mousemove', (e) => {
      const animation = gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out'
      });
      
      animations.push(animation);
    });
  }
  
  // Setup title animations
  function setupTitleAnimations() {
    const sectionTitle = learningSection.querySelector('.section-title');
    const sectionSubtitle = learningSection.querySelector('.section-subtitle');
    
    if (sectionTitle) {
      const titleAnimation = gsap.fromTo(sectionTitle, 
        { opacity: 0, y: -30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out' 
        }
      );
      
      animations.push(titleAnimation);
    }
    
    if (sectionSubtitle) {
      const subtitleAnimation = gsap.fromTo(sectionSubtitle, 
        { opacity: 0, y: -20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          delay: 0.3
        }
      );
      
      animations.push(subtitleAnimation);
    }
  }
  
  // Setup card animations
  function setupCardAnimations() {
    const skillCards = learningSection.querySelectorAll('.skill-card');
    
    // Skip if no cards found
    if (!skillCards.length) return;
    
    // Entrance animation
    if (typeof gsap !== 'undefined' && gsap.ScrollTrigger) {
      const cardsAnimation = gsap.fromTo(skillCards, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: learningSection.querySelector('.skills-container') || learningSection,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );
      
      animations.push(cardsAnimation);
    }
    
    // Setup each card
    skillCards.forEach((card, index) => {
      // Add hover effects
      card.addEventListener('mouseenter', () => {
        // Change cursor
        cursor.classList.add('grow');
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        
        // Animate card
        const cardAnimation = gsap.to(card, {
          y: -10,
          scale: 1.03,
          boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        });
        
        animations.push(cardAnimation);
        
        // Animate icon
        const icon = card.querySelector('.skill-icon');
        if (icon) {
          const iconAnimation = gsap.to(icon, {
            scale: 1.2,
            rotation: 5,
            duration: 0.3,
            ease: 'back.out(1.5)'
          });
          
          animations.push(iconAnimation);
        }
      });
      
      card.addEventListener('mouseleave', () => {
        // Reset cursor
        cursor.classList.remove('grow');
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        
        // Reset card
        const cardResetAnimation = gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          duration: 0.5,
          ease: 'power2.out'
        });
        
        animations.push(cardResetAnimation);
        
        // Reset icon
        const icon = card.querySelector('.skill-icon');
        if (icon) {
          const iconResetAnimation = gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          animations.push(iconResetAnimation);
        }
      });
      
      // Add click interaction
      card.addEventListener('click', () => {
        const details = card.querySelector('.skill-details');
        if (!details) return;
        
        const isActive = details.classList.contains('active');
        
        // Close other details
        learningSection.querySelectorAll('.skill-details.active').forEach(el => {
          if (el !== details) {
            el.classList.remove('active');
            
            const closeAnimation = gsap.to(el, {
              height: 0,
              duration: 0.4,
              ease: 'power2.out'
            });
            
            animations.push(closeAnimation);
          }
        });
        
        // Toggle current details
        if (!isActive) {
          details.classList.add('active');
          
          const openAnimation = gsap.to(details, {
            height: 'auto',
            duration: 0.5,
            ease: 'power2.out'
          });
          
          animations.push(openAnimation);
          
          // Bounce card
          const bounceAnimation = gsap.to(card, {
            y: -5,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
          });
          
          animations.push(bounceAnimation);
          
          // Animate list items
          const listItems = details.querySelectorAll('li');
          if (listItems.length) {
            const listAnimation = gsap.fromTo(listItems, 
              { opacity: 0, x: -10 },
              { 
                opacity: 1, 
                x: 0, 
                stagger: 0.1, 
                duration: 0.3,
                ease: 'power2.out',
                delay: 0.2
              }
            );
            
            animations.push(listAnimation);
          }
        } else {
          details.classList.remove('active');
          
          const closeAnimation = gsap.to(details, {
            height: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
          
          animations.push(closeAnimation);
        }
      });
      
      // Add floating animation
      const floatAnimation = gsap.to(card, {
        y: `+=${Math.random() * 10 - 5}`,
        duration: 2 + index * 0.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.1
      });
      
      animations.push(floatAnimation);
      
      // Add highlight effect
      setupCardHighlight(card);
    });
    
    // Animate icons
    const icons = learningSection.querySelectorAll('.skill-icon');
    icons.forEach(icon => {
      const pulseAnimation = gsap.to(icon, {
        scale: 1.1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      animations.push(pulseAnimation);
    });
  }
  
  // Setup card highlight effect
  function setupCardHighlight(card) {
    // Create highlight element
    const highlight = document.createElement('div');
    highlight.className = 'learning-card-highlight';
    highlight.style.position = 'absolute';
    highlight.style.top = '0';
    highlight.style.left = '0';
    highlight.style.width = '100%';
    highlight.style.height = '100%';
    highlight.style.borderRadius = '20px';
    highlight.style.pointerEvents = 'none';
    highlight.style.background = 'radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)';
    highlight.style.opacity = '0';
    highlight.style.transition = 'opacity 0.3s ease';
    
    // Make sure card has position relative
    if (getComputedStyle(card).position === 'static') {
      card.style.position = 'relative';
    }
    
    card.appendChild(highlight);
    
    // Update highlight position
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      highlight.style.setProperty('--x', `${x}px`);
      highlight.style.setProperty('--y', `${y}px`);
      
      const highlightAnimation = gsap.to(highlight, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      animations.push(highlightAnimation);
    });
    
    card.addEventListener('mouseleave', () => {
      const hideAnimation = gsap.to(highlight, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      animations.push(hideAnimation);
    });
  }
  
  // Setup particles
  function setupParticles() {
    const particlesContainer = learningSection.querySelector('.particles');
    if (!particlesContainer) return;
    
    const colors = ['#4facfe', '#00f2fe', '#ff6b6b', '#8258ff', '#ffb44e', '#2ed573'];
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    // Create particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 6 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particle.style.pointerEvents = 'none';
      
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      
      particlesContainer.appendChild(particle);
      
      // Floating animation
      const particleAnimation = gsap.to(particle, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        duration: 10 + Math.random() * 20,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
      
      animations.push(particleAnimation);
    }
  }
  
  // Setup parallax effect
  function setupParallax() {
    learningSection.addEventListener('mousemove', (e) => {
      // Get mouse position relative to learning section
      const rect = learningSection.getBoundingClientRect();
      const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
      const yPercent = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Parallax for particles
      const particlesContainer = learningSection.querySelector('.particles');
      if (particlesContainer) {
        const particlesAnimation = gsap.to(particlesContainer, {
          x: xPercent * 30,
          y: yPercent * 30,
          duration: 1,
          ease: 'power2.out'
        });
        
        animations.push(particlesAnimation);
      }
      
      // Parallax for skills container
      const skillsContainer = learningSection.querySelector('.skills-container');
      if (skillsContainer) {
        const skillsAnimation = gsap.to(skillsContainer, {
          x: xPercent * -15,
          y: yPercent * -15,
          duration: 1,
          ease: 'power2.out'
        });
        
        animations.push(skillsAnimation);
      }
    });
  }
  
  // Setup scroll indicator
  function setupScrollIndicator() {
    if (learningSection.scrollHeight > window.innerHeight) {
      const scrollIndicator = document.createElement('div');
      scrollIndicator.className = 'learning-scroll-indicator';
      scrollIndicator.innerHTML = `
        <div class="scroll-dot"></div>
        <div class="scroll-dot"></div>
        <div class="scroll-dot"></div>
      `;
      
      // Style the scroll indicator
      scrollIndicator.style.position = 'absolute';
      scrollIndicator.style.bottom = '20px';
      scrollIndicator.style.left = '50%';
      scrollIndicator.style.transform = 'translateX(-50%)';
      scrollIndicator.style.display = 'flex';
      scrollIndicator.style.gap = '8px';
      scrollIndicator.style.zIndex = '5';
      
      // Add to learning section
      learningSection.appendChild(scrollIndicator);
      
      // Style the dots
      const scrollDots = scrollIndicator.querySelectorAll('.scroll-dot');
      scrollDots.forEach(dot => {
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
      });
      
      // Animate scroll indicator
      const dotsAnimation = gsap.to(scrollDots, {
        scale: 1.5,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      animations.push(dotsAnimation);
      
      // Hide on scroll
      if (typeof gsap !== 'undefined' && gsap.ScrollTrigger) {
        gsap.ScrollTrigger.create({
          trigger: learningSection,
          start: 'top top',
          end: 'bottom bottom-=100',
          onUpdate: (self) => {
            if (self.progress > 0.1) {
              const hideAnimation = gsap.to(scrollIndicator, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out'
              });
              
              animations.push(hideAnimation);
            } else {
              const showAnimation = gsap.to(scrollIndicator, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
              });
              
              animations.push(showAnimation);
            }
          }
        });
      }
    }
  }
  
  // Refresh animations
  function refresh() {
    cleanup();
    setup();
  }
  
  // Cleanup all animations
  function cleanup() {
    // Kill all animations
    animations.forEach(animation => {
      if (animation && animation.kill) {
        animation.kill();
      }
    });
    
    animations = [];
    
    // Remove custom cursor
    if (cursor && cursor.parentNode) {
      cursor.parentNode.removeChild(cursor);
    }
    
    // Remove scroll indicator
    const scrollIndicator = document.querySelector('.learning-scroll-indicator');
    if (scrollIndicator && scrollIndicator.parentNode) {
      scrollIndicator.parentNode.removeChild(scrollIndicator);
    }
    
    // Remove highlights
    const highlights = document.querySelectorAll('.learning-card-highlight');
    highlights.forEach(highlight => {
      if (highlight && highlight.parentNode) {
        highlight.parentNode.removeChild(highlight);
      }
    });
    
    console.log('Learning section animations cleaned up');
  }
  
  // Return public API
  return init();
})();