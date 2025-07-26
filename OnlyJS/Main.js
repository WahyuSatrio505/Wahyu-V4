/**
 * GYM Olahraga - Main JavaScript
 * Author: v0
 * Version: 1.0
 */

// DOM Elements
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const currentYearElements = document.querySelectorAll("#currentYear");

// Set current year in footer
currentYearElements.forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Toggle mobile menu
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event propagation

    navMenu.classList.toggle("active");

    // Change icon based on menu state
    if (navMenu.classList.contains("active")) {
      this.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      this.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (navMenu && navMenu.classList.contains("active") && !e.target.closest(".navbar-content") && !e.target.closest(".nav-menu")) {
    navMenu.classList.remove("active");
    if (menuToggle) {
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  }
});

// Close modals when clicking outside
document.addEventListener("click", (e) => {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// Close modal when clicking the close button
const closeButtons = document.querySelectorAll(".close-modal");
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

// Function to open modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

// Function to close modal
function closeModal(modal) {
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Handle URL parameters
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Check if we need to show register tab on login page
if (window.location.pathname.includes("login.html")) {
  const registerParam = getUrlParameter("register");
  if (registerParam === "true") {
    const loginTab = document.querySelector('.auth-tab-item[data-tab="login"]');
    const registerTab = document.querySelector('.auth-tab-item[data-tab="register"]');
    const loginPane = document.getElementById("login");
    const registerPane = document.getElementById("register");

    if (loginTab && registerTab && loginPane && registerPane) {
      loginTab.classList.remove("active");
      registerTab.classList.add("active");
      loginPane.classList.remove("active");
      registerPane.classList.add("active");
    }
  }
}

// Ensure DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");

  // Re-initialize menu toggle to ensure it works
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    console.log("Menu elements found");
    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Menu toggle clicked");

      navMenu.classList.toggle("active");

      if (navMenu.classList.contains("active")) {
        this.innerHTML = '<i class="fas fa-times"></i>';
        console.log("Menu opened");
      } else {
        this.innerHTML = '<i class="fas fa-bars"></i>';
        console.log("Menu closed");
      }
    });
  } else {
    console.log("Menu elements not found");
  }
});
