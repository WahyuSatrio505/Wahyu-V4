<?php
session_start();
require_once 'config.php';

function sanitize($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function redirect($url) {
    header("Location: $url");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = sanitize($_POST['email']);
    $password = $_POST['password'];

    if (empty($email) || empty($password)) {
        $_SESSION['error'] = 'Silakan isi semua field yang diperlukan.';
        redirect('../login.html');
    }

    // Cek user
    $query = "SELECT * FROM anggota WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) === 1) {
        $user = mysqli_fetch_assoc($result);
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['nama'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['is_logged_in'] = true;
            redirect('../index.php'); // Gunakan .php biar bisa akses session
        } else {
            $_SESSION['error'] = 'Email atau password tidak valid.';
            redirect('../login.html');
        }
    } else {
        $_SESSION['error'] = 'Email atau password tidak valid.';
        redirect('../login.html');
    }
} else {
    redirect('../login.html');
}
