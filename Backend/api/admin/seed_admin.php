<?php
require_once '../../config/db.php';

// $db didapat dari file db.php yang sudah kita buat tadi
$collection = $db->admin;

// Data admin (Password di-hash agar aman)
$adminData = [
    "username" => "admin_ps",
    "password" => password_hash("rahasia123", PASSWORD_DEFAULT),
    "role"     => "admin",
    "nama"     => "Eri Tri Haryanto"
];

try {
    // Cek dulu apakah admin sudah ada biar tidak dobel
    $cek = $collection->findOne(["username" => "admin_ps"]);
    
    if (!$cek) {
        $collection->insertOne($adminData);
        echo "Admin berhasil dibuat! Username: admin_ps, Password: rahasia123";
    } else {
        echo "Admin sudah ada di database.";
    }
} catch (Exception $e) {
    echo "Gagal: " . $e->getMessage();
}