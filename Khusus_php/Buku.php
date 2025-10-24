<?php
/**
 * GYM Olahraga - Class Booking Handler
 * Author: v0
 * Version: 1.0
 */

// Include database configuration
require_once 'config.php';

// Check if user is logged in
if (!isset($_SESSION['is_logged_in']) || $_SESSION['is_logged_in'] !== true) {
    // Return JSON response for AJAX request
    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Anda perlu login untuk mendaftar kelas.']);
        exit;
    }
    
    // Redirect to login page for regular request
    $_SESSION['error'] = 'Anda perlu login untuk mendaftar kelas.';
    redirect('../login.html');
}

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $jadwalId = sanitize($_POST['jadwal_id']);
    $anggotaId = $_SESSION['user_id'];
    
    // Check if user has already booked this class
    $query = "SELECT * FROM pendaftaran_kelas WHERE anggota_id = '$anggotaId' AND jadwal_id = '$jadwalId' AND status != 'dibatalkan'";
    $result = mysqli_query($conn, $query);
    
    if (mysqli_num_rows($result) > 0) {
        // User has already booked this class
        $response = ['success' => false, 'message' => 'Anda sudah terdaftar untuk kelas ini.'];
    } else {
        // Insert booking
        $query = "INSERT INTO pendaftaran_kelas (anggota_id, jadwal_id, tanggal_pendaftaran, status, created_at, updated_at) 
                  VALUES ('$anggotaId', '$jadwalId', NOW(), 'terdaftar', NOW(), NOW())";
        
        if (mysqli_query($conn, $query)) {
            // Booking successful
            $response = ['success' => true, 'message' => 'Anda telah berhasil mendaftar untuk kelas ini.'];
        } else {
            // Booking failed
            $response = ['success' => false, 'message' => 'Terjadi kesalahan saat mendaftar kelas. Silakan coba lagi.'];
        }
    }
    
    // Return JSON response for AJAX request
    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
    
    // Set session message and redirect for regular request
    if ($response['success']) {
        $_SESSION['success'] = $response['message'];
    } else {
        $_SESSION['error'] = $response['message'];
    }
    
    redirect('../jadwal.html');
} else {
    // If not POST request, redirect to schedule page
    redirect('../jadwal.html');
}
?>