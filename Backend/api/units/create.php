<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../../config/db.php';
require_once '../../middleware/auth.php';

// 1. Jalankan Satpam dulu (Jika gagal, otomatis berhenti di sini)
$userData = checkAuth(); 

// 2. Baru ambil datanya
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->nama_unit) && !empty($data->harga_per_jam)) {
    $collection = $db->units;

    $newUnit = [
        "nama_unit" => $data->nama_unit,
        "jenis" => $data->jenis ?? "Console",
        "harga_per_jam" => (int)$data->harga_per_jam,
        "status" => "tersedia",
        "deskripsi" => $data->deskripsi ?? "",
        "created_by" => $userData->data->username, // Tambahan: catat siapa admin yang input
        "created_at" => date("Y-m-d H:i:s")
    ];

    try {
        $result = $collection->insertOne($newUnit);
        echo json_encode([
            "status" => "success",
            "message" => "Unit PS berhasil ditambahkan!",
            "id" => $result->getInsertedId()
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Nama unit dan harga wajib diisi!"]);
}