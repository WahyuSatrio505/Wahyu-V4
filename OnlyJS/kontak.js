/**
 * GYM Olahraga - Contact JavaScript
 * Author: v0
 * Version: 1.0
 */

// Contact form submission
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);

      // Here you would typically send the data to your server using AJAX
      // For now, we'll just simulate a successful submission

      // Simulate loading
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = "Mengirim...";
      submitButton.disabled = true;

      setTimeout(() => {
        // Show success message
        alert("Pesan Anda telah dikirim! Kami akan menghubungi Anda segera.");

        // Reset form
        contactForm.reset();

        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 1500);
    });
  }
});

