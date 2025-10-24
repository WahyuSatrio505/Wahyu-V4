/**
 * GYM Olahraga - Login/Register JavaScript
 * Author: v0
 * Version: 1.0
 */

// Form validation and submission
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // Login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const email = this.querySelector("#loginEmail").value;
      const password = this.querySelector("#loginPassword").value;

      // Basic validation
      if (!email || !password) {
        alert("Silakan isi semua field yang diperlukan.");
        return;
      }

      // Here you would typically send the data to your server using AJAX
      // For now, we'll just simulate a successful login

      // Simulate loading
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = "Memproses...";
      submitButton.disabled = true;

      setTimeout(() => {
        // Redirect to home page after successful login
        window.location.href = "index.html";
      }, 1500);
    });
  }

  // Register form submission
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const firstName = this.querySelector("#firstName").value;
      const lastName = this.querySelector("#lastName").value;
      const email = this.querySelector("#registerEmail").value;
      const phone = this.querySelector("#phone").value;
      const password = this.querySelector("#registerPassword").value;
      const confirmPassword = this.querySelector("#confirmPassword").value;

      // Basic validation
      if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        alert("Silakan isi semua field yang diperlukan.");
        return;
      }

      // Password match validation
      if (password !== confirmPassword) {
        alert("Password dan konfirmasi password tidak cocok.");
        return;
      }

      // Here you would typically send the data to your server using AJAX
      // For now, we'll just simulate a successful registration

      // Simulate loading
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = "Memproses...";
      submitButton.disabled = true;

      setTimeout(() => {
        // Show success message
        alert("Pendaftaran berhasil! Silakan login dengan akun baru Anda.");

        // Switch to login tab
        const loginTab = document.querySelector('.auth-tab-item[data-tab="login"]');
        const registerTab = document.querySelector('.auth-tab-item[data-tab="register"]');
        const loginPane = document.getElementById("login");
        const registerPane = document.getElementById("register");

        if (loginTab && registerTab && loginPane && registerPane) {
          loginTab.classList.add("active");
          registerTab.classList.remove("active");
          loginPane.classList.add("active");
          registerPane.classList.remove("active");
        }

        // Reset form
        registerForm.reset();

        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 1500);
    });
  }
});
