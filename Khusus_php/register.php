<?php
/**
 * GYM Olahraga - Registration Handler
 * Author: v0
 * Version: 1.0
 */

// Include database configuration
require_once 'config.php';

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $firstName = sanitize($_POST['firstName']);
    $lastName = sanitize($_POST['lastName']);
    $email = sanitize($_POST['email']);
    $phone = sanitize($_POST['phone']);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];
    
    // Validate input
    if (empty($firstName) || empty($lastName) || empty($email) || empty($phone) || empty($password) || empty($confirmPassword)) {
        $_SESSION['error'] = 'Silakan isi semua field yang diperlukan.';
        redirect('../login.html?register=true');
    }
    
    // Check if passwords match
    if ($password !== $confirmPassword) {
        $_SESSION['error'] = 'Password dan konfirmasi password tidak cocok.';
        redirect('../login.html?register=true');
    }
    
    // Check if email already exists
    $query = "SELECT * FROM anggota WHERE email = '$email'";
    $result = mysqli_query($conn, $query);
    
    if (mysqli_num_rows($result) > 0) {
        $_SESSION['error'] = 'Email sudah terdaftar. Silakan gunakan email lain.';
        redirect('../login.html?register=true');
    }
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Prepare full name
    $fullName = $firstName . ' ' . $lastName;
    
    // Current date for join date
    $joinDate = date('Y-m-d');
    
    // Insert new user
    $query = "INSERT INTO anggota (nama, email, password, telepon, tanggal_bergabung, status, created_at, updated_at) 
              VALUES ('$fullName', '$email', '$hashedPassword', '$phone', '$joinDate', 'aktif', NOW(), NOW())";
    
    if (mysqli_query($conn, $query)) {
        // Registration successful
        $_SESSION['success'] = 'Pendaftaran berhasil! Silakan login dengan akun baru Anda.';
        redirect('../login.html');
    } else {
        // Registration failed
        $_SESSION['error'] = 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.';
        redirect('../login.html?register=true');
    }
} else {
    // If not POST request, redirect to registration page
    redirect('../login.html?register=true');
}
?>