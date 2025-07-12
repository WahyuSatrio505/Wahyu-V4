// Class data
const classData = {
  "strength-training": {
    title: "Strength Training",
    instructor: "Budi Santoso",
    duration: "60 menit",
    level: "Semua Level",
    description: "Kelas latihan kekuatan untuk membangun otot dan meningkatkan kekuatan fisik. Cocok untuk semua level, dari pemula hingga tingkat lanjut.",
    benefits: ["Membangun massa otot", "Meningkatkan kekuatan fisik", "Memperbaiki postur tubuh", "Meningkatkan metabolisme", "Menguatkan tulang"],
    equipment: ["Barbell dan Dumbbell", "Resistance Bands", "Kettlebell", "Pull-up Bar", "Weight Plates"],
    schedule: [
      { day: "Senin", time: "07:00 - 08:00", slots: "12/15" },
      { day: "Rabu", time: "18:00 - 19:00", slots: "8/15" },
      { day: "Jumat", time: "07:00 - 08:00", slots: "10/15" },
      { day: "Sabtu", time: "09:00 - 10:00", slots: "5/15" },
    ],
    price: "Rp 150.000/bulan",
  },
  "cardio-blast": {
    title: "Cardio Blast",
    instructor: "Siti Rahayu",
    duration: "45 menit",
    level: "Menengah",
    description: "Kelas kardio intensif untuk membakar kalori dan meningkatkan stamina. Kombinasi gerakan aerobik, HIIT, dan latihan interval.",
    benefits: ["Membakar kalori tinggi", "Meningkatkan stamina", "Memperkuat jantung", "Menurunkan berat badan", "Meningkatkan mood"],
    equipment: ["Treadmill", "Stationary Bike", "Jump Rope", "Step Platform", "Medicine Ball"],
    schedule: [
      { day: "Selasa", time: "06:00 - 06:45", slots: "15/20" },
      { day: "Kamis", time: "18:30 - 19:15", slots: "12/20" },
      { day: "Sabtu", time: "08:00 - 08:45", slots: "18/20" },
      { day: "Minggu", time: "10:00 - 10:45", slots: "6/20" },
    ],
    price: "Rp 120.000/bulan",
  },
  "yoga-flow": {
    title: "Yoga Flow",
    instructor: "Dewi Putri",
    duration: "75 menit",
    level: "Semua Level",
    description: "Kelas yoga untuk meningkatkan fleksibilitas, keseimbangan, dan ketenangan pikiran. Fokus pada pernapasan dan gerakan yang mengalir.",
    benefits: ["Meningkatkan fleksibilitas", "Memperbaiki keseimbangan", "Mengurangi stress", "Meningkatkan fokus", "Memperbaiki kualitas tidur"],
    equipment: ["Yoga Mat", "Yoga Blocks", "Yoga Straps", "Bolster", "Meditation Cushion"],
    schedule: [
      { day: "Senin", time: "19:00 - 20:15", slots: "8/12" },
      { day: "Rabu", time: "07:00 - 08:15", slots: "10/12" },
      { day: "Jumat", time: "19:00 - 20:15", slots: "6/12" },
      { day: "Minggu", time: "16:00 - 17:15", slots: "4/12" },
    ],
    price: "Rp 100.000/bulan",
  },
};

// Function to navigate to class detail
function goToDetail(classId) {
  const classInfo = classData[classId];
  if (!classInfo) {
    alert("Kelas tidak ditemukan!");
    return;
  }

  showModal(classInfo);
}

// Function to show modal with class details
function showModal(classInfo) {
  const modal = document.getElementById("detailModal");
  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = generateDetailHTML(classInfo);
  modal.style.display = "block";

  // Add event listener to close modal when clicking outside
  modal.onclick = function (event) {
    if (event.target === modal) {
      closeModal();
    }
  };
}

// Function to close modal
function closeModal() {
  const modal = document.getElementById("detailModal");
  modal.style.display = "none";
}

// Function to generate detail HTML
function generateDetailHTML(classInfo) {
  return `
        <div class="detail-header">
            <h2 class="detail-title">${classInfo.title}</h2>
            <p class="detail-subtitle">dengan ${classInfo.instructor}</p>
        </div>
        
        <div class="detail-body">
            <div class="detail-info">
                <div class="info-item">
                    <div class="info-label">Durasi</div>
                    <div class="info-value">${classInfo.duration}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Level</div>
                    <div class="info-value">${classInfo.level}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Instruktur</div>
                    <div class="info-value">${classInfo.instructor}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Harga</div>
                    <div class="info-value">${classInfo.price}</div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Deskripsi Kelas</h3>
                <p>${classInfo.description}</p>
            </div>
            
            <div class="detail-section">
                <h3>Manfaat Kelas</h3>
                <ul>
                    ${classInfo.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
                </ul>
            </div>
            
            <div class="detail-section">
                <h3>Peralatan yang Digunakan</h3>
                <ul>
                    ${classInfo.equipment.map((item) => `<li>${item}</li>`).join("")}
                </ul>
            </div>
            
            <div class="detail-section">
                <h3>Jadwal Kelas</h3>
                <table class="schedule-table">
                    <thead>
                        <tr>
                            <th>Hari</th>
                            <th>Waktu</th>
                            <th>Slot Tersedia</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${classInfo.schedule
                          .map(
                            (schedule) => `
                            <tr>
                                <td>${schedule.day}</td>
                                <td>${schedule.time}</td>
                                <td>${schedule.slots}</td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
            </div>
            
            <button class="btn-book" onclick="bookClass('${classInfo.title}')">
                Daftar Kelas Sekarang
            </button>
        </div>
    `;
}

// Function to handle class booking
function bookClass(className) {
  alert(`Terima kasih! Anda akan didaftarkan ke kelas ${className}. Silakan hubungi admin untuk konfirmasi pembayaran.`);
  closeModal();
}

// Close modal when pressing Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Smooth scrolling for better UX
document.addEventListener("DOMContentLoaded", function () {
  // Add loading animation to cards
  const cards = document.querySelectorAll(".class-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });
});

// Add click handlers for auth buttons
document.querySelector(".btn-login").addEventListener("click", function () {
  alert("Fitur login akan segera tersedia!");
});

document.querySelector(".btn-register").addEventListener("click", function () {
  alert("Fitur registrasi akan segera tersedia!");
});
