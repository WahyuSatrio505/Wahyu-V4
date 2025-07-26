-- GYM Olahraga Database Schema
-- Author: v0
-- Version: 1.0

-- Create database
CREATE DATABASE IF NOT EXISTS gym_olahraga;
USE gym_olahraga;

-- Table: anggota (Members)
CREATE TABLE IF NOT EXISTS anggota (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telepon VARCHAR(20),
    alamat TEXT,
    tanggal_lahir DATE,
    jenis_kelamin ENUM('L', 'P'),
    tanggal_bergabung DATE NOT NULL,
    foto_profil VARCHAR(255),
    status ENUM('aktif', 'tidak aktif') NOT NULL DEFAULT 'aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: keanggotaan (Memberships)
CREATE TABLE IF NOT EXISTS keanggotaan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    durasi INT NOT NULL COMMENT 'in days',
    harga DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: pembayaran (Payments)
CREATE TABLE IF NOT EXISTS pembayaran (
    id INT AUTO_INCREMENT PRIMARY KEY,
    anggota_id INT NOT NULL,
    keanggotaan_id INT NOT NULL,
    jumlah DECIMAL(10, 2) NOT NULL,
    tanggal_pembayaran DATE NOT NULL,
    metode_pembayaran VARCHAR(50) NOT NULL,
    status ENUM('pending', 'success', 'failed') NOT NULL DEFAULT 'pending',
    keterangan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (anggota_id) REFERENCES anggota(id) ON DELETE CASCADE,
    FOREIGN KEY (keanggotaan_id) REFERENCES keanggotaan(id) ON DELETE CASCADE
);

-- Table: instruktur (Instructors)
CREATE TABLE IF NOT EXISTS instruktur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telepon VARCHAR(20),
    spesialisasi VARCHAR(100),
    bio TEXT,
    foto VARCHAR(255),
    status ENUM('aktif', 'tidak aktif') NOT NULL DEFAULT 'aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: kelas (Classes)
CREATE TABLE IF NOT EXISTS kelas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    level ENUM('pemula', 'menengah', 'lanjut', 'semua level') NOT NULL DEFAULT 'semua level',
    durasi INT NOT NULL COMMENT 'in minutes',
    kapasitas INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: jadwal (Schedules)
CREATE TABLE IF NOT EXISTS jadwal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kelas_id INT NOT NULL,
    instruktur_id INT NOT NULL,
    hari ENUM('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu') NOT NULL,
    waktu_mulai TIME NOT NULL,
    waktu_selesai TIME NOT NULL,
    ruangan VARCHAR(50) NOT NULL,
    status ENUM('aktif', 'tidak aktif') NOT NULL DEFAULT 'aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kelas_id) REFERENCES kelas(id) ON DELETE CASCADE,
    FOREIGN KEY (instruktur_id) REFERENCES instruktur(id) ON DELETE CASCADE
);

-- Table: kehadiran (Attendance)
CREATE TABLE IF NOT EXISTS kehadiran (
    id INT AUTO_INCREMENT PRIMARY KEY,
    anggota_id INT NOT NULL,
    jadwal_id INT NOT NULL,
    tanggal DATE NOT NULL,
    status ENUM('hadir', 'tidak hadir', 'terlambat') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (anggota_id) REFERENCES anggota(id) ON DELETE CASCADE,
    FOREIGN KEY (jadwal_id) REFERENCES jadwal(id) ON DELETE CASCADE
);

-- Table: pendaftaran_kelas (Class Registrations)
CREATE TABLE IF NOT EXISTS pendaftaran_kelas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    anggota_id INT NOT NULL,
    jadwal_id INT NOT NULL,
    tanggal_pendaftaran DATE NOT NULL,
    status ENUM('terdaftar', 'dibatalkan', 'selesai') NOT NULL DEFAULT 'terdaftar',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (anggota_id) REFERENCES anggota(id) ON DELETE CASCADE,
    FOREIGN KEY (jadwal_id) REFERENCES jadwal(id) ON DELETE CASCADE
);

-- Table: pesan_kontak (Contact Messages)
CREATE TABLE IF NOT EXISTS pesan_kontak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telepon VARCHAR(20),
    subjek VARCHAR(200) NOT NULL,
    pesan TEXT NOT NULL,
    dibaca BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for keanggotaan (Memberships)
INSERT INTO keanggotaan (nama, deskripsi, durasi, harga) VALUES
('Basic', 'Akses ke fasilitas gym dasar', 30, 300000),
('Standard', 'Akses ke fasilitas gym dan kelas terbatas', 30, 500000),
('Premium', 'Akses penuh ke semua fasilitas dan kelas', 30, 750000),
('Annual Basic', 'Akses ke fasilitas gym dasar selama setahun', 365, 3000000),
('Annual Premium', 'Akses penuh ke semua fasilitas dan kelas selama setahun', 365, 7500000);

-- Insert sample data for instruktur (Instructors)
INSERT INTO instruktur (nama, email, telepon, spesialisasi, bio, status) VALUES
('Budi Santoso', 'budi@gymolahraga.com', '081234567890', 'Strength Training', 'Pelatih berpengalaman dengan sertifikasi internasional dalam strength training.', 'aktif'),
('Siti Rahayu', 'siti@gymolahraga.com', '081234567891', 'Cardio', 'Spesialis kardio dengan pengalaman 5 tahun melatih berbagai kelas kardio.', 'aktif'),
('Dewi Putri', 'dewi@gymolahraga.com', '081234567892', 'Yoga', 'Instruktur yoga bersertifikat dengan pendekatan holistik untuk kesehatan tubuh dan pikiran.', 'aktif'),
('Rudi Hartono', 'rudi@gymolahraga.com', '081234567893', 'HIIT', 'Spesialis HIIT dengan latar belakang dalam ilmu olahraga dan nutrisi.', 'aktif'),
('Maya Sari', 'maya@gymolahraga.com', '081234567894', 'Pilates', 'Instruktur pilates berpengalaman dengan fokus pada rehabilitasi dan penguatan core.', 'aktif'),
('Carlos Rodriguez', 'carlos@gymolahraga.com', '081234567895', 'Zumba', 'Instruktur Zumba bersertifikat dengan latar belakang tari profesional.', 'aktif');

-- Insert sample data for kelas (Classes)
INSERT INTO kelas (nama, deskripsi, level, durasi, kapasitas) VALUES
('Strength Training', 'Kelas latihan kekuatan untuk membangun otot dan meningkatkan kekuatan fisik.', 'semua level', 60, 15),
('Cardio Blast', 'Kelas kardio intensif untuk membakar kalori dan meningkatkan stamina.', 'menengah', 45, 20),
('Yoga Flow', 'Kelas yoga untuk meningkatkan fleksibilitas, keseimbangan, dan ketenangan pikiran.', 'semua level', 75, 15),
('HIIT Challenge', 'High Intensity Interval Training untuk hasil maksimal dalam waktu singkat.', 'lanjut', 30, 12),
('Pilates Core', 'Fokus pada penguatan otot core, meningkatkan postur tubuh, dan fleksibilitas.', 'semua level', 60, 15),
('Zumba Dance', 'Kelas dance fitness yang menyenangkan dengan musik Latin yang energik.', 'semua level', 60, 25);

-- Insert sample data for jadwal (Schedules)
-- Monday (Senin)
INSERT INTO jadwal (kelas_id, instruktur_id, hari, waktu_mulai, waktu_selesai, ruangan) VALUES
(1, 1, 'Senin', '07:00:00', '08:00:00', 'Studio 1'),
(3, 3, 'Senin', '09:00:00', '10:15:00', 'Studio 2'),
(4, 4, 'Senin', '17:30:00', '18:00:00', 'Studio 1'),
(6, 6, 'Senin', '19:00:00', '20:00:00', 'Studio 3');

-- Tuesday (Selasa)
INSERT INTO jadwal (kelas_id, instruktur_id, hari, waktu_mulai, waktu_selesai, ruangan) VALUES
(2, 2, 'Selasa', '06:30:00', '07:15:00', 'Studio 1'),
(5, 5, 'Selasa', '10:00:00', '11:00:00', 'Studio 2'),
(1, 1, 'Selasa', '18:00:00', '19:00:00', 'Studio 1');

-- Wednesday (Rabu)
INSERT INTO jadwal (kelas_id, instruktur_id, hari, waktu_mulai, waktu_selesai, ruangan) VALUES
(3, 3, 'Rabu', '07:00:00', '08:15:00', 'Studio 2'),
(4, 4, 'Rabu', '12:00:00', '12:30:00', 'Studio 1'),
(6, 6, 'Rabu', '18:30:00', '19:30:00', 'Studio 3');

-- Thursday (Kamis)
INSERT INTO jadwal (kelas_id, instruktur_id, hari, waktu_mulai, waktu_selesai, ruangan) VALUES
(1, 1, 'Kamis', '06:30:00', '07:30:00', 'Studio 1'),
(2, 2, 'Kamis', '09:00:00', '09:45:00', 'Studio 1'),
(5, 5, 'Kamis', '17:00:00', '18:00:00', 'Studio 2');

-- Friday (Jumat)
INSERT INTO jadwal (kelas_id, instruktur_id, hari, waktu_mulai, waktu_selesai, ruangan) VALUES
(4, 4, 'Jumat', '07:00:00', '07:30:00', 'Studio 1'),
(3, 3, 'Jumat', '10:00:00', '11:15:00', 'Studio 2'),
(6, 6, 'Jumat', '18:00:00', '19:00:00', 'Studio 3');

-- Saturday (Sabtu)
INSERT INTO jadwal (kelas_id, instruktur_id, hari, waktu_mulai, waktu_selesai, ruangan) VALUES
(2, 2, 'Sabtu', '08:00:00', '08:45:00', 'Studio 1'),
(1, 1, 'Sabtu', '10:00:00', '11:00:00', 'Studio 1'),
(5, 5, 'Sabtu', '14:00:00', '15:00:00', 'Studio 2');

-- Sunday (Minggu)
INSERT INTO jadwal (kelas_id, instruktur_id, hari, waktu_mulai, waktu_selesai, ruangan) VALUES
(3, 3, 'Minggu', '09:00:00', '10:15:00', 'Studio 2'),
(6, 6, 'Minggu', '11:00:00', '12:00:00', 'Studio 3');