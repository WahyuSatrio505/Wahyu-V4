<?php
/**
 * GYM Olahraga - Contact Form Handler
 * Author: v0
 * Version: 1.0 
 */

// Include database configuration
require_once 'config.php';

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = sanitize($_POST['name']);
    $email = sanitize($_POST['email']);
    $phone = sanitize($_POST['phone']);
    $subject = sanitize($_POST['subject']);
    $message = sanitize($_POST['message']);
    
    // Validate input
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $_SESSION['error'] = 'Silakan isi semua field yang diperlukan.';
        redirect('../contact.html');
    }
    
    // Insert message into database
    $query = "INSERT INTO pesan_kontak (nama, email, telepon, subjek, pesan, created_at) 
              VALUES ('$name', '$email', '$phone', '$subject', '$message', NOW())";
    
    if (mysqli_query($conn, $query)) {
        // Message sent successfully
        $_SESSION['success'] = 'Pesan Anda telah dikirim! Kami akan menghubungi Anda segera.';
        
        // Optional: Send email notification to admin
        $to = "info@gymolahraga.com"; // Change to your email
        $emailSubject = "Pesan Kontak Baru: $subject";
        $emailBody = "Nama: $name\n";
        $emailBody .= "Email: $email\n";
        $emailBody .= "Telepon: $phone\n\n";
        $emailBody .= "Pesan:\n$message";
        $headers = "From: $email";
        
        // Uncomment to enable email sending
        // mail($to, $emailSubject, $emailBody, $headers);
        
        redirect('../contact.html');
    } else {
        // Failed to send message
        $_SESSION['error'] = 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.';
        redirect('../contact.html');
    }
} else {
    // If not POST request, redirect to contact page
    redirect('../contact.html');
}
?>