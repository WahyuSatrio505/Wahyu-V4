/**
 * GYM Olahraga - Jadwal (Schedule) JavaScript
 * Author: v0
 * Version: 1.0
 */

// Set current day tab as active on page load
document.addEventListener('DOMContentLoaded', () => {
    // Get current day of week in Indonesian
    const getCurrentDay = () => {
        const daysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const daysId = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const today = new Date().getDay();
        return daysId[today];
    };
    
    const currentDay = getCurrentDay();
    const currentDayTab = document.querySelector(`.tab-item[data-tab="${currentDay}"]`);
    
    if (currentDayTab) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-item').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to current day tab and content
        currentDayTab.classList.add('active');
        const currentDayContent = document.getElementById(currentDay);
        if (currentDayContent) {
            currentDayContent.classList.add('active');
        }
    }
});

// Function to book a class
function bookClass(scheduleId) {
    // Check if user is logged in (this would be handled by your authentication system)
    const isLoggedIn = false; // Change this based on your authentication logic
    
    // Declare openModal function (replace with your actual modal opening logic)
    function openModal(modalId) {
        // Your modal opening logic here.  For example:
        // const modal = document.getElementById(modalId);
        // if (modal) {
        //   modal.style.display = "block";
        // }
        console.log(`Opening modal: ${modalId}`); // Placeholder for actual implementation
    }

    if (!isLoggedIn) {
        openModal('loginPromptModal');
        return;
    }
    
    // Here you would handle the class booking logic
    // For now, we'll just show an alert
    alert(`Anda telah berhasil mendaftar untuk kelas dengan ID: ${scheduleId}`);
}