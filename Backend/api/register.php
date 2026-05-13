<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/db.php';

// Ambil input JSON dari Frontend
$data = json_decode(file_get_contents("php://input"));



if (!empty($data->username) && !empty($data->password) && !empty($data->nama)) {
    $collection = $db->admin;

    // 1. Cek apakah username sudah dipakai
    $cekUser = $collection->findOne(["username" => $data->username]);
    
    if ($cekUser) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Username sudah terdaftar!"]);
        exit;
    }

    // 2. Siapkan data untuk disimpan
    $newUser = [
        "username" => $data->username,
        "password" => password_hash($data->password, PASSWORD_DEFAULT), // Keamanan wajib
        "nama"     => $data->nama,
        "role"     => "admin", // Default sebagai admin
        "created_at" => date("Y-m-d H:i:s")
    ];

    try {
        $result = $collection->insertOne($newUser);
        echo json_encode([
            "status" => "success", 
            "message" => "Registrasi berhasil! Silakan login.",
            "id" => $result->getInsertedId()
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Gagal mendaftar: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap (Nama, Username, Password wajib diisi)"]);
}