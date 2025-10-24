/**
 * GYM Olahraga - Kelas (Classes) JavaScript
 * Author: v0
 * Version: 1.0
 */

// Class details data
const classDetails = {
  1: {
    title: "Strength Training",
    instructor: "Budi Santoso",
    description: "Kelas latihan kekuatan untuk membangun otot dan meningkatkan kekuatan fisik. Cocok untuk semua level, dari pemula hingga tingkat lanjut.",
    level: "Semua Level",
    duration: "60 menit",
    schedule: [
      { day: "Senin", time: "07:00 - 08:00", room: "Studio 1" },
      { day: "Kamis", time: "06:30 - 07:30", room: "Studio 1" },
      { day: "Sabtu", time: "10:00 - 11:00", room: "Studio 1" },
    ],
    equipment: ["Dumbbell", "Barbell", "Kettlebell", "Resistance bands"],
    benefits: ["Meningkatkan kekuatan otot", "Meningkatkan kepadatan tulang", "Meningkatkan metabolisme", "Meningkatkan postur tubuh"],
  },
  2: {
    title: "Cardio Blast",
    instructor: "Siti Rahayu",
    description: "Kelas kardio intensif untuk membakar kalori dan meningkatkan stamina. Kombinasi gerakan aerobik, HIIT, dan latihan interval.",
    level: "Menengah",
    duration: "45 menit",
    schedule: [
      { day: "Selasa", time: "06:30 - 07:15", room: "Studio 1" },
      { day: "Kamis", time: "09:00 - 09:45", room: "Studio 1" },
      { day: "Sabtu", time: "08:00 - 08:45", room: "Studio 1" },
    ],
    equipment: ["Step platform", "Jump rope", "Light weights"],
    benefits: ["Membakar kalori", "Meningkatkan kesehatan jantung", "Meningkatkan stamina", "Mengurangi stres"],
  },
  3: {
    title: "Yoga Flow",
    instructor: "Dewi Putri",
    description: "Kelas yoga untuk meningkatkan fleksibilitas, keseimbangan, dan ketenangan pikiran. Fokus pada pernapasan dan gerakan yang mengalir.",
    level: "Semua Level",
    duration: "75 menit",
    schedule: [
      { day: "Senin", time: "09:00 - 10:15", room: "Studio 2" },
      { day: "Rabu", time: "07:00 - 08:15", room: "Studio 2" },
      { day: "Jumat", time: "10:00 - 11:15", room: "Studio 2" },
      { day: "Minggu", time: "09:00 - 10:15", room: "Studio 2" },
    ],
    equipment: ["Yoga mat", "Yoga blocks", "Yoga strap"],
    benefits: ["Meningkatkan fleksibilitas", "Mengurangi stres", "Meningkatkan keseimbangan", "Memperbaiki postur tubuh", "Meningkatkan fokus mental"],
  },
  4: {
    title: "HIIT Challenge",
    instructor: "Rudi Hartono",
    description: "High Intensity Interval Training untuk hasil maksimal dalam waktu singkat. Kombinasi latihan kardio dan kekuatan dengan intensitas tinggi.",
    level: "Lanjut",
    duration: "30 menit",
    schedule: [
      { day: "Senin", time: "17:30 - 18:00", room: "Studio 1" },
      { day: "Rabu", time: "12:00 - 12:30", room: "Studio 1" },
      { day: "Jumat", time: "07:00 - 07:30", room: "Studio 1" },
    ],
    equipment: ["Bodyweight", "Kettlebell", "Medicine ball"],
    benefits: ["Membakar kalori dengan cepat", "Meningkatkan metabolisme", "Membangun kekuatan dan daya tahan", "Efisien waktu"],
  },
  5: {
    title: "Pilates Core",
    instructor: "Maya Sari",
    description: "Fokus pada penguatan otot core, meningkatkan postur tubuh, dan fleksibilitas. Gerakan yang presisi dan terkontrol.",
    level: "Semua Level",
    duration: "60 menit",
    schedule: [
      { day: "Selasa", time: "10:00 - 11:00", room: "Studio 2" },
      { day: "Kamis", time: "17:00 - 18:00", room: "Studio 2" },
      { day: "Sabtu", time: "14:00 - 15:00", room: "Studio 2" },
    ],
    equipment: ["Pilates mat", "Pilates ring", "Resistance bands"],
    benefits: ["Memperkuat otot core", "Meningkatkan postur tubuh", "Meningkatkan fleksibilitas", "Mengurangi nyeri punggung", "Meningkatkan kesadaran tubuh"],
  },
  6: {
    title: "Zumba Dance",
    instructor: "Carlos Rodriguez",
    description: "Kelas dance fitness yang menyenangkan dengan musik Latin yang energik. Membakar kalori sambil bersenang-senang.",
    level: "Semua Level",
    duration: "60 menit",
    schedule: [
      { day: "Senin", time: "19:00 - 20:00", room: "Studio 3" },
      { day: "Rabu", time: "18:30 - 19:30", room: "Studio 3" },
      { day: "Jumat", time: "18:00 - 19:00", room: "Studio 3" },
      { day: "Minggu", time: "11:00 - 12:00", room: "Studio 3" },
    ],
    equipment: ["None"],
    benefits: ["Membakar kalori", "Meningkatkan koordinasi", "Meningkatkan mood", "Menyenangkan dan tidak terasa seperti olahraga"],
  },
};

// Assuming openModal is defined elsewhere or is a global function
// For this example, let's define it as a placeholder:
function openModal(modalId) {
  // In a real application, this function would open the modal with the given ID.
  console.log(`Opening modal with ID: ${modalId}`);
  // You would typically use JavaScript to manipulate the DOM and show the modal.
  // For example, you might use document.getElementById(modalId).style.display = 'block';
}

// Function to show class details in modal
function showClassDetails(classId) {
  const classData = classDetails[classId];
  if (!classData) return;

  const modal = document.getElementById("classModal");
  const content = document.getElementById("classDetailsContent");

  if (!modal || !content) return;

  // Create schedule HTML
  let scheduleHTML = "";
  classData.schedule.forEach((schedule) => {
    scheduleHTML += `
            <div class="schedule-item">
                <span class="day">${schedule.day}</span>
                <span class="time">${schedule.time}</span>
                <span class="room">${schedule.room}</span>
            </div>
        `;
  });

  // Create equipment HTML
  let equipmentHTML = "";
  classData.equipment.forEach((item) => {
    equipmentHTML += `<li>${item}</li>`;
  });

  // Create benefits HTML
  let benefitsHTML = "";
  classData.benefits.forEach((benefit) => {
    benefitsHTML += `<li>${benefit}</li>`;
  });

  // Set modal content
  content.innerHTML = `
        <div class="class-detail-header">
            <h2>${classData.title}</h2>
            <div class="class-meta">
                <span><i class="fas fa-user"></i> ${classData.instructor}</span>
                <span><i class="fas fa-clock"></i> ${classData.duration}</span>
                <span><i class="fas fa-signal"></i> ${classData.level}</span>
            </div>
        </div>
        
        <div class="class-detail-image">
            <img src="assets/placeholder.jpg" alt="${classData.title}">
        </div>
        
        <div class="class-detail-description">
            <h3>Deskripsi</h3>
            <p>${classData.description}</p>
        </div>
        
        <div class="class-detail-schedule">
            <h3>Jadwal</h3>
            <div class="schedule-grid">
                ${scheduleHTML}
            </div>
        </div>
        
        <div class="class-detail-info">
            <div class="class-detail-equipment">
                <h3>Peralatan</h3>
                <ul>
                    ${equipmentHTML}
                </ul>
            </div>
            
            <div class="class-detail-benefits">
                <h3>Manfaat</h3>
                <ul>
                    ${benefitsHTML}
                </ul>
            </div>
        </div>
        
        <div class="class-detail-action">
            <button class="btn btn-primary" onclick="bookClass(${classId})">Daftar Kelas</button>
        </div>
    `;

  // Show modal
  // Assuming openModal is defined elsewhere or is a global function
  if (typeof openModal === "function") {
    openModal("classModal");
  } else {
    console.error("openModal is not defined");
    alert("Fitur modal tidak berfungsi. openModal() is not defined."); // Provide user feedback
  }

  // Add styles for class details
  const style = document.createElement("style");
  style.textContent = `
        .class-detail-header {
            margin-bottom: 1.5rem;
        }
        
        .class-detail-image {
            margin-bottom: 1.5rem;
            border-radius: var(--border-radius);
            overflow: hidden;
        }
        
        .class-detail-image img {
            width: 100%;
            height: auto;
        }
        
        .class-detail-description,
        .class-detail-schedule,
        .class-detail-info {
            margin-bottom: 1.5rem;
        }
        
        .class-detail-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }
        
        .schedule-grid {
            display: grid;
            gap: 0.5rem;
        }
        
        .schedule-item {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            background-color: var(--light-gray);
            padding: 0.75rem;
            border-radius: var(--border-radius);
        }
        
        .class-detail-action {
            margin-top: 2rem;
            text-align: center;
        }
        
        @media (max-width: 576px) {
            .class-detail-info {
                grid-template-columns: 1fr;
            }
            
            .schedule-item {
                grid-template-columns: 1fr;
                gap: 0.25rem;
            }
        }
    `;

  document.head.appendChild(style);
}

// Function to book a class
function bookClass(classId) {
  // Check if user is logged in (this would be handled by your authentication system)
  const isLoggedIn = false; // Change this based on your authentication logic

  if (!isLoggedIn) {
    // Assuming openModal is defined elsewhere or is a global function
    if (typeof openModal === "function") {
      openModal("loginPromptModal");
    } else {
      console.error("openModal is not defined");
      alert("Fitur modal tidak berfungsi. openModal() is not defined."); // Provide user feedback
    }
    return;
  }

  // Here you would handle the class booking logic
  // For now, we'll just show an alert
  alert(`Anda telah berhasil mendaftar untuk kelas ${classDetails[classId].title}`);
}
