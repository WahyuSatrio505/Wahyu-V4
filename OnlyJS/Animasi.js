/**
 * GYM Olahraga - Animations JavaScript
 * Author: v0
 * Version: 1.0
 */

// Animate elements when they come into view
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Testimonials slider
function initTestimonialsSlider() {
  const slider = document.getElementById("testimonialsSlider");
  const prevButton = document.getElementById("prevTestimonial");
  const nextButton = document.getElementById("nextTestimonial");

  if (!slider || !prevButton || !nextButton) return;

  const testimonials = slider.querySelectorAll(".testimonial-card");
  let currentIndex = 0;
  let slideWidth;

  // Calculate how many testimonials to show based on screen width
  function calculateSlidesPerView() {
    if (window.innerWidth < 768) {
      return 1;
    } else if (window.innerWidth < 992) {
      return 2;
    } else {
      return 3;
    }
  }

  // Update slide width based on screen size
  function updateSlideWidth() {
    const slidesPerView = calculateSlidesPerView();
    slideWidth = slider.clientWidth / slidesPerView;

    testimonials.forEach((testimonial) => {
      testimonial.style.flex = `0 0 ${slideWidth}px`;
    });
  }

  // Move to specific slide
  function goToSlide(index) {
    if (index < 0) {
      index = testimonials.length - calculateSlidesPerView();
    } else if (index > testimonials.length - calculateSlidesPerView()) {
      index = 0;
    }

    currentIndex = index;
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Initialize slider
  function initSlider() {
    updateSlideWidth();
    slider.style.transition = "transform 0.5s ease";
    goToSlide(0);
  }

  // Event listeners
  prevButton.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
  });

  window.addEventListener("resize", () => {
    updateSlideWidth();
    goToSlide(currentIndex);
  });

  // Initialize slider
  initSlider();
}

// Tabs functionality
function initTabs() {
  const tabItems = document.querySelectorAll(".tab-item");
  const authTabItems = document.querySelectorAll(".auth-tab-item");

  // Regular tabs (schedule page)
  tabItems.forEach((item) => {
    item.addEventListener("click", () => {
      const tabId = item.getAttribute("data-tab");

      // Remove active class from all tabs and contents
      document.querySelectorAll(".tab-item").forEach((tab) => {
        tab.classList.remove("active");
      });

      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
      });

      // Add active class to clicked tab and corresponding content
      item.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Auth tabs (login/register page)
  authTabItems.forEach((item) => {
    item.addEventListener("click", () => {
      const tabId = item.getAttribute("data-tab");

      // Remove active class from all tabs and contents
      document.querySelectorAll(".auth-tab-item").forEach((tab) => {
        tab.classList.remove("active");
      });

      document.querySelectorAll(".auth-tab-pane").forEach((content) => {
        content.classList.remove("active");
      });

      // Add active class to clicked tab and corresponding content
      item.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll();
  initTestimonialsSlider();
  initTabs();
});
