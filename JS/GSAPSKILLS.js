// GSAP Animations for Skills Section
document.addEventListener("DOMContentLoaded", function () {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Initialize animations when the page loads
  initSkillsAnimations();

  // Initialize radar chart
  initRadarChart();
});

function initSkillsAnimations() {
  // Animate section title with a glitch effect
  gsap.from(".section-title", {
    duration: 1,
    opacity: 0,
    y: -50,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#skills",
      start: "top 80%",
    },
    onComplete: () => {
      // Add glitch animation class after initial animation
      document.querySelector(".section-title").classList.add("glitch-animation");
    },
  });

  // Animate section line
  gsap.from(".section-line", {
    duration: 1.2,
    width: 0,
    ease: "power3.inOut",
    delay: 0.3,
    scrollTrigger: {
      trigger: "#skills",
      start: "top 80%",
    },
  });

  // Animate skills intro text
  gsap.from(".skills-intro", {
    duration: 1,
    opacity: 0,
    y: 30,
    ease: "power3.out",
    delay: 0.5,
    scrollTrigger: {
      trigger: "#skills",
      start: "top 80%",
    },
  });

  // Animate skills categories with stagger
  gsap.from(".skills-category", {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.2,
    ease: "back.out(1.7)",
    delay: 0.7,
    scrollTrigger: {
      trigger: ".skills-container",
      start: "top 80%",
    },
  });

  // Animate skill items within each category
  document.querySelectorAll(".skills-category").forEach((category, index) => {
    const skillItems = category.querySelectorAll(".skill-item");

    gsap.to(skillItems, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      stagger: 0.1,
      ease: "power3.out",
      delay: 1 + index * 0.2,
      scrollTrigger: {
        trigger: category,
        start: "top 80%",
      },
    });

    // Animate skill progress bars
    skillItems.forEach((item) => {
      const percentage = item.getAttribute("data-percentage");
      const progressBar = item.querySelector(".skill-progress-fill");

      gsap.to(progressBar, {
        width: percentage + "%",
        duration: 1.5,
        ease: "power3.inOut",
        delay: 1.2 + index * 0.2,
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
        },
      });
    });
  });

  // Animate radar chart
  gsap.to(".skills-radar", {
    duration: 1.2,
    opacity: 1,
    scale: 1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".skills-radar",
      start: "top 80%",
    },
  });

  // Animate skill cards with stagger
  gsap.to(".skill-card", {
    duration: 1,
    opacity: 1,
    y: 0,
    stagger: 0.15,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".skills-cards",
      start: "top 80%",
    },
  });

  // Add hover animations for skill cards
  document.querySelectorAll(".skill-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card.querySelector(".card-icon"), {
        duration: 0.5,
        scale: 1.1,
        rotation: 5,
        ease: "back.out(1.7)",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card.querySelector(".card-icon"), {
        duration: 0.5,
        scale: 1,
        rotation: 0,
        ease: "power3.out",
      });
    });
  });

  // Add floating animation to category icons
  gsap.to(".category-icon", {
    y: -10,
    duration: 2,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1,
  });
}

function initRadarChart() {
  const ctx = document.getElementById("skillRadar").getContext("2d");

  // Create gradient for radar chart
  const gradientBlue = ctx.createLinearGradient(0, 0, 0, 400);
  gradientBlue.addColorStop(0, "rgba(138, 43, 226, 0.8)");
  gradientBlue.addColorStop(1, "rgba(0, 180, 216, 0.8)");

  // Chart data
  const data = {
    labels: ["Frontend", "Backend", "UI/UX Design", "Mobile Dev", "Database", "Problem Solving"],
    datasets: [
      {
        label: "Skill Level",
        data: [90, 75, 85, 70, 80, 85],
        fill: true,
        backgroundColor: "rgba(138, 43, 226, 0.2)",
        borderColor: gradientBlue,
        pointBackgroundColor: "#00b4d8",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#8a2be2",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      r: {
        angleLines: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        pointLabels: {
          color: "#e6e6fa",
          font: {
            family: "'Rajdhani', sans-serif",
            size: 14,
          },
        },
        ticks: {
          backdropColor: "transparent",
          color: "rgba(255, 255, 255, 0.5)",
          z: 1,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Create the chart
  const radarChart = new Chart(ctx, {
    type: "radar",
    data: data,
    options: options,
  });

  // Animate chart on scroll
  ScrollTrigger.create({
    trigger: ".skills-radar",
    start: "top 80%",
    onEnter: () => {
      gsap.from(radarChart.data.datasets[0].data, {
        duration: 1.5,
        stagger: 0.1,
        ease: "power3.out",
        onUpdate: () => radarChart.update(),
      });
    },
  });
}

// Add glitch animation CSS
const style = document.createElement("style");
style.textContent = `
    .glitch-animation {
        animation: glitch 5s infinite;
    }
    
    @keyframes glitch {
        0% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 255, 0.75),
                        -0.05em -0.025em 0 rgba(0, 255, 255, 0.75),
                        -0.025em 0.05em 0 rgba(0, 255, 0, 0.75);
        }
        14% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 255, 0.75),
                        -0.05em -0.025em 0 rgba(0, 255, 255, 0.75),
                        -0.025em 0.05em 0 rgba(0, 255, 0, 0.75);
        }
        15% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 255, 0.75),
                        0.025em 0.025em 0 rgba(0, 255, 255, 0.75),
                        -0.05em -0.05em 0 rgba(0, 255, 0, 0.75);
        }
        49% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 255, 0.75),
                        0.025em 0.025em 0 rgba(0, 255, 255, 0.75),
                        -0.05em -0.05em 0 rgba(0, 255, 0, 0.75);
        }
        50% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 255, 0.75),
                        0.05em 0 0 rgba(0, 255, 255, 0.75),
                        0 -0.05em 0 rgba(0, 255, 0, 0.75);
        }
        99% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 255, 0.75),
                        0.05em 0 0 rgba(0, 255, 255, 0.75),
                        0 -0.05em 0 rgba(0, 255, 0, 0.75);
        }
        100% {
            text-shadow: -0.025em 0 0 rgba(255, 0, 255, 0.75),
                        -0.025em -0.025em 0 rgba(0, 255, 255, 0.75),
                        -0.025em -0.05em 0 rgba(0, 255, 0, 0.75);
        }
    }
`;
document.head.appendChild(style);
