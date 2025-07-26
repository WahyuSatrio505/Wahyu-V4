// Get URL parameters
function getUrlParams() {
  const params = new URLSearchParams(window.location.search)
  return {
    id: params.get("id"),
    name: params.get("name"),
    time: params.get("time"),
    instructor: params.get("instructor"),
    studio: params.get("studio"),
  }
}

// DOM Elements
const classDetails = document.getElementById("classDetails")
const registrationForm = document.getElementById("registrationForm")
const successModal = document.getElementById("successModal")
const successMessage = document.getElementById("successMessage")
const countdownElement = document.getElementById("countdown")

// Class info from URL
const classInfo = getUrlParams()

// Populate class details
function populateClassDetails() {
  if (classDetails && classInfo.name) {
    classDetails.innerHTML = `
            <div class="class-name">${classInfo.name}</div>
            <div class="class-details">
                <div class="class-detail">
                    <i class="fas fa-clock"></i>
                    <span>${classInfo.time}</span>
                </div>
                <div class="class-detail">
                    <i class="fas fa-user"></i>
                    <span>${classInfo.instructor}</span>
                </div>
                <div class="class-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${classInfo.studio}</span>
                </div>
            </div>
        `
  }
}

// Form validation
function validateForm(formData) {
  const errors = []

  if (!formData.nama.trim()) {
    errors.push("Nama lengkap harus diisi")
  }

  if (!formData.email.trim()) {
    errors.push("Email harus diisi")
  } else if (!isValidEmail(formData.email)) {
    errors.push("Format email tidak valid")
  }

  if (!formData.telepon.trim()) {
    errors.push("Nomor telepon harus diisi")
  } else if (!isValidPhone(formData.telepon)) {
    errors.push("Format nomor telepon tidak valid")
  }

  return errors
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone validation
function isValidPhone(phone) {
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

// Show success modal
function showSuccessModal() {
  successMessage.textContent = `Anda telah berhasil mendaftar untuk kelas ${classInfo.name}`
  successModal.classList.add("active")

  // Countdown timer
  let countdown = 3
  const timer = setInterval(() => {
    countdown--
    countdownElement.textContent = countdown

    if (countdown <= 0) {
      clearInterval(timer)
      window.location.href = "index.html"
    }
  }, 1000)
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(registrationForm)
  const data = {
    nama: formData.get("nama"),
    email: formData.get("email"),
    telepon: formData.get("telepon"),
    pengalaman: formData.get("pengalaman"),
    tujuan: formData.get("tujuan"),
    kondisiKesehatan: formData.get("kondisiKesehatan"),
    classInfo: classInfo,
  }

  // Validate form
  const errors = validateForm(data)
  if (errors.length > 0) {
    alert("Terjadi kesalahan:\n" + errors.join("\n"))
    return
  }

  // Show loading state
  const submitButton = registrationForm.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent
  submitButton.textContent = "Mendaftar..."
  submitButton.disabled = true

  // Simulate API call
  setTimeout(() => {
    // Save to localStorage (simulate database)
    const registrations = JSON.parse(localStorage.getItem("gymRegistrations") || "[]")
    registrations.push({
      id: Date.now(),
      ...data,
      registrationDate: new Date().toISOString(),
    })
    localStorage.setItem("gymRegistrations", JSON.stringify(registrations))

    // Show success modal
    showSuccessModal()

    // Reset button
    submitButton.textContent = originalText
    submitButton.disabled = false

    console.log("Registration successful:", data)
  }, 1500)
}

// Format phone number input
function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, "")

  if (value.startsWith("62")) {
    value = "0" + value.substring(2)
  } else if (value.startsWith("8")) {
    value = "0" + value
  }

  input.value = value
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  populateClassDetails()

  // Add form event listener
  if (registrationForm) {
    registrationForm.addEventListener("submit", handleFormSubmit)
  }

  // Format phone number on input
  const phoneInput = document.getElementById("telepon")
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      formatPhoneNumber(this)
    })
  }

  // Add input animations
  const inputs = document.querySelectorAll("input, select, textarea")
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused")
    })
  })

  // Close modal on outside click
  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) {
      window.location.href = "index.html"
    }
  })

  // Redirect if no class info
  if (!classInfo.name) {
    alert("Data kelas tidak ditemukan. Anda akan diarahkan ke halaman utama.")
    window.location.href = "index.html"
  }
})

// Handle browser back button
window.addEventListener("popstate", () => {
  if (successModal.classList.contains("active")) {
    window.location.href = "index.html"
  }
})

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href)
}
