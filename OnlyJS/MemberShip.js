// Class data
const classData = {
    'strength-training': {
        title: 'Strength Training',
        instructor: 'Budi Santoso',
        duration: '60 menit',
        level: 'Semua Level',
        description: 'Kelas latihan kekuatan untuk membangun otot dan meningkatkan kekuatan fisik. Cocok untuk semua level, dari pemula hingga tingkat lanjut.',
        benefits: [
            'Membangun massa otot',
            'Meningkatkan kekuatan fisik',
            'Memperbaiki postur tubuh',
            'Meningkatkan metabolisme',
            'Menguatkan tulang'
        ],
        equipment: [
            'Barbell dan Dumbbell',
            'Resistance Bands',
            'Kettlebell',
            'Pull-up Bar',
            'Weight Plates'
        ],
        schedule: [
            { day: 'Senin', time: '07:00 - 08:00', slots: '12/15' },
            { day: 'Rabu', time: '18:00 - 19:00', slots: '8/15' },
            { day: 'Jumat', time: '07:00 - 08:00', slots: '10/15' },
            { day: 'Sabtu', time: '09:00 - 10:00', slots: '5/15' }
        ],
        price: 'Rp 150.000/bulan'
    },
    'cardio-blast': {
        title: 'Cardio Blast',
        instructor: 'Siti Rahayu',
        duration: '45 menit',
        level: 'Menengah',
        description: 'Kelas kardio intensif untuk membakar kalori dan meningkatkan stamina. Kombinasi gerakan aerobik, HIIT, dan latihan interval.',
        benefits: [
            'Membakar kalori tinggi',
            'Meningkatkan stamina',
            'Memperkuat jantung',
            'Menurunkan berat badan',
            'Meningkatkan mood'
        ],
        equipment: [
            'Treadmill',
            'Stationary Bike',
            'Jump Rope',
            'Step Platform',
            'Medicine Ball'
        ],
        schedule: [
            { day: 'Selasa', time: '06:00 - 06:45', slots: '15/20' },
            { day: 'Kamis', time: '18:30 - 19:15', slots: '12/20' },
            { day: 'Sabtu', time: '08:00 - 08:45', slots: '18/20' },
            { day: 'Minggu', time: '10:00 - 10:45', slots: '6/20' }
        ],
        price: 'Rp 120.000/bulan'
    },
    'yoga-flow': {
        title: 'Yoga Flow',
        instructor: 'Dewi Putri',
        duration: '75 menit',
        level: 'Semua Level',
        description: 'Kelas yoga untuk meningkatkan fleksibilitas, keseimbangan, dan ketenangan pikiran. Fokus pada pernapasan dan gerakan yang mengalir.',
        benefits: [
            'Meningkatkan fleksibilitas',
            'Memperbaiki keseimbangan',
            'Mengurangi stress',
            'Meningkatkan fokus',
            'Memperbaiki kualitas tidur'
        ],
        equipment: [
            'Yoga Mat',
            'Yoga Blocks',
            'Yoga Straps',
            'Bolster',
            'Meditation Cushion'
        ],
        schedule: [
            { day: 'Senin', time: '19:00 - 20:15', slots: '8/12' },
            { day: 'Rabu', time: '07:00 - 08:15', slots: '10/12' },
            { day: 'Jumat', time: '19:00 - 20:15', slots: '6/12' },
            { day: 'Minggu', time: '16:00 - 17:15', slots: '4/12' }
        ],
        price: 'Rp 100.000/bulan'
    }
};

// Membership plans data
const membershipPlans = {
    'Basic': {
        name: 'Basic',
        price: 299000,
        features: [
            'Akses gym 24/7',
            '2 kelas grup per minggu',
            'Konsultasi fitness dasar',
            'Akses locker room'
        ]
    },
    'Premium': {
        name: 'Premium',
        price: 499000,
        features: [
            'Akses gym 24/7',
            'Unlimited kelas grup',
            '2x sesi personal trainer/bulan',
            'Akses sauna & steam room',
            'Program diet & nutrisi',
            'Body composition analysis'
        ]
    },
    'VIP': {
        name: 'VIP',
        price: 799000,
        features: [
            'Semua fitur Premium',
            '4x sesi personal trainer/bulan',
            'Akses VIP lounge',
            'Massage therapy 2x/bulan',
            'Priority booking kelas',
            'Guest pass (2 orang/bulan)'
        ]
    }
};

// Page navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Function to navigate to class detail
function goToDetail(classId) {
    const classInfo = classData[classId];
    if (!classInfo) {
        alert('Kelas tidak ditemukan!');
        return;
    }
    
    showModal(classInfo);
}

// Function to show modal with class details
function showModal(classInfo) {
    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = generateDetailHTML(classInfo);
    modal.style.display = 'block';
    
    // Add event listener to close modal when clicking outside
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('detailModal');
    modal.style.display = 'none';
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
                    ${classInfo.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h3>Peralatan yang Digunakan</h3>
                <ul>
                    ${classInfo.equipment.map(item => `<li>${item}</li>`).join('')}
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
                        ${classInfo.schedule.map(schedule => `
                            <tr>
                                <td>${schedule.day}</td>
                                <td>${schedule.time}</td>
                                <td>${schedule.slots}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <button class="btn-book" onclick="bookClass('${classInfo.title}')">
                Daftar Kelas Sekarang
            </button>
        </div>
    `;
}

// Function to handle membership plan selection
function choosePlan(planName, price) {
    const plan = membershipPlans[planName];
    if (!plan) {
        alert('Paket tidak ditemukan!');
        return;
    }
    
    showMembershipModal(plan);
}

// Function to show membership modal
function showMembershipModal(plan) {
    const modal = document.getElementById('membershipModal');
    const modalBody = document.getElementById('membershipModalBody');
    
    modalBody.innerHTML = generateMembershipFormHTML(plan);
    modal.style.display = 'block';
    
    // Add event listener to close modal when clicking outside
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeMembershipModal();
        }
    }
}

// Function to close membership modal
function closeMembershipModal() {
    const modal = document.getElementById('membershipModal');
    modal.style.display = 'none';
}

// Function to generate membership form HTML
function generateMembershipFormHTML(plan) {
    const adminFee = 50000;
    const total = plan.price + adminFee;
    
    return `
        <div class="membership-form">
            <div class="form-header">
                <h2>Daftar Membership</h2>
                <div class="selected-plan">${plan.name} - Rp ${plan.price.toLocaleString('id-ID')}/bulan</div>
            </div>
            
            <form onsubmit="submitMembership(event, '${plan.name}', ${plan.price})">
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstName">Nama Depan *</label>
                        <input type="text" id="firstName" name="firstName" required>
                    </div>
                    <div class="form-group">
                        <label for="lastName">Nama Belakang *</label>
                        <input type="text" id="lastName" name="lastName" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="phone">Nomor Telepon *</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="birthDate">Tanggal Lahir *</label>
                        <input type="date" id="birthDate" name="birthDate" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="address">Alamat *</label>
                    <input type="text" id="address" name="address" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="emergencyContact">Kontak Darurat *</label>
                        <input type="text" id="emergencyContact" name="emergencyContact" required>
                    </div>
                    <div class="form-group">
                        <label for="emergencyPhone">Nomor Kontak Darurat *</label>
                        <input type="tel" id="emergencyPhone" name="emergencyPhone" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="paymentMethod">Metode Pembayaran *</label>
                    <select id="paymentMethod" name="paymentMethod" required>
                        <option value="">Pilih metode pembayaran</option>
                        <option value="transfer">Transfer Bank</option>
                        <option value="credit">Kartu Kredit</option>
                        <option value="debit">Kartu Debit</option>
                        <option value="cash">Tunai</option>
                    </select>
                </div>
                
                <div class="payment-summary">
                    <h3>Ringkasan Pembayaran</h3>
                    <div class="summary-row">
                        <span>Paket ${plan.name}</span>
                        <span>Rp ${plan.price.toLocaleString('id-ID')}</span>
                    </div>
                    <div class="summary-row">
                        <span>Biaya Admin</span>
                        <span>Rp ${adminFee.toLocaleString('id-ID')}</span>
                    </div>
                    <div class="summary-row summary-total">
                        <span>Total</span>
                        <span>Rp ${total.toLocaleString('id-ID')}</span>
                    </div>
                </div>
                
                <button type="submit" class="btn-submit">
                    Daftar Sekarang - Rp ${total.toLocaleString('id-ID')}
                </button>
            </form>
        </div>
    `;
}

// Function to handle membership form submission
function submitMembership(event, planName, price) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const membershipData = {
        plan: planName,
        price: price,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        birthDate: formData.get('birthDate'),
        address: formData.get('address'),
        emergencyContact: formData.get('emergencyContact'),
        emergencyPhone: formData.get('emergencyPhone'),
        paymentMethod: formData.get('paymentMethod')
    };
    
    // Simulate form submission
    alert(`Terima kasih ${membershipData.firstName}! Pendaftaran membership ${planName} Anda telah diterima. Tim kami akan menghubungi Anda dalam 24 jam untuk konfirmasi pembayaran.`);
    
    closeMembershipModal();
    
    // In real application, you would send this data to your backend
    console.log('Membership Data:', membershipData);
}

// Function to handle class booking
function bookClass(className) {
    alert(`Terima kasih! Anda akan didaftarkan ke kelas ${className}. Silakan hubungi admin untuk konfirmasi pembayaran.`);
    closeModal();
}

// Close modal when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeMembershipModal();
    }
});

// Smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation to cards
    const cards = document.querySelectorAll('.class-card, .pricing-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Initialize with home page
    showPage('home');
});

// Add click handlers for auth buttons
document.querySelector('.btn-login').addEventListener('click', function() {
    alert('Fitur login akan segera tersedia!');
});

document.querySelector('.btn-register').addEventListener('click', function() {
    alert('Fitur registrasi akan segera tersedia!');
});

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-active');
}