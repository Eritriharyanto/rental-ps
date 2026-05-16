<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['id'])) {

    $collection = $db->units;

    $updateData = [
        '$set' => [
            "nama_unit" => $data['nama_unit'],
            "harga_per_jam" => (int)$data['harga_per_jam'],
            "status" => $data['status'],
            "deskripsi" => $data['deskripsi'],
            "updated_at" => date("Y-m-d H:i:s")
        ]
    ];

    try {

        $result = $collection->updateOne(
            ['_id' => new MongoDB\BSON\ObjectId($data['id'])],
            $updateData
        );

        echo json_encode([
            "status" => "success",
            "message" => "Unit berhasil diperbarui!",
            "modified_count" => $result->getModifiedCount()
        ]);

    } catch (Exception $e) {

        http_response_code(500);

        echo json_encode([
            "status" => "error",
            "message" => "ID tidak valid atau error: " . $e->getMessage()
        ]);
    }

} else {

    http_response_code(400);

    echo json_encode([
        "status" => "error",
        "message" => "ID unit wajib disertakan!"
    ]);
}