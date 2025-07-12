// Class data
const classes = [
  {
    id: 1,
    name: "Strength Training",
    time: "07:00 - 08:00",
    instructor: "Budi Santoso",
    studio: "Studio 1",
    type: "strength",
  },
  {
    id: 2,
    name: "Yoga Flow",
    time: "09:00 - 10:15",
    instructor: "Dewi Putri",
    studio: "Studio 2",
    type: "yoga",
  },
  {
    id: 3,
    name: "HIIT Training",
    time: "18:00 - 19:00",
    instructor: "Ahmad Rizki",
    studio: "Studio 1",
    type: "hiit",
  },
  {
    id: 4,
    name: "Pilates",
    time: "19:30 - 20:30",
    instructor: "Sarah Lestari",
    studio: "Studio 2",
    type: "pilates",
  },
];

// DOM Elements
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");
const classesGrid = document.getElementById("classesGrid");
const classCount = document.getElementById("classCount");

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");

  if (mobileMenu.classList.contains("active")) {
    menuIcon.className = "fas fa-times";
  } else {
    menuIcon.className = "fas fa-bars";
  }
});

// Create class card HTML
function createClassCard(classItem) {
  return `
        <div class="class-card">
            <h3>${classItem.name}</h3>
            <div class="class-details">
                <div class="class-detail">
                    <i class="fas fa-clock"></i>
                    <span>${classItem.time}</span>
                </div>
                <div class="class-detail">
                    <i class="fas fa-user"></i>
                    <span>${classItem.instructor}</span>
                </div>
                <div class="class-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${classItem.studio}</span>
                </div>
            </div>
            <a href="daftar-kelas.html?id=${classItem.id}&name=${encodeURIComponent(classItem.name)}&time=${encodeURIComponent(classItem.time)}&instructor=${encodeURIComponent(classItem.instructor)}&studio=${encodeURIComponent(
    classItem.studio
  )}" 
               class="btn btn-primary btn-full">
                Daftar Kelas
            </a>
        </div>
    `;
}

// Render classes
function renderClasses() {
  if (classesGrid) {
    classesGrid.innerHTML = classes.map(createClassCard).join("");

    // Update class count
    if (classCount) {
      classCount.textContent = `${classes.length} kelas tersedia`;
    }
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  renderClasses();

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Add loading animation to buttons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.href && !this.href.includes("#")) {
        this.classList.add("loading");
        this.textContent = "Loading...";
      }
    });
  });
});

// Utility functions
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"),
    name: params.get("name"),
    time: params.get("time"),
    instructor: params.get("instructor"),
    studio: params.get("studio"),
  };
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { classes, getUrlParams };
}
