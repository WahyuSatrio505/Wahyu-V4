<?php
/**
 * GYM Olahraga - Logout Handler
 * Author: v0
 * Version: 1.0
 */

// Include database configuration
require_once 'config.php';

// Destroy session
session_destroy();

// Redirect to home page
redirect('../index.html');
?>