<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $collection = $db->units;

    // Data yang ingin diupdate
    $updateData = [
        '$set' => [
            "nama_unit" => $data->nama_unit,
            "harga_per_jam" => (int)$data->harga_per_jam,
            "status" => $data->status, // misal: tersedia, disewa, atau maintenance
            "deskripsi" => $data->deskripsi,
            "updated_at" => date("Y-m-d H:i:s")
        ]
    ];

    try {
        // Konversi string ID ke MongoDB ObjectId
        $result = $collection->updateOne(
            ['_id' => new MongoDB\BSON\ObjectId($data->id)],
            $updateData
        );

        echo json_encode([
            "status" => "success",
            "message" => "Unit berhasil diperbarui!",
            "modified_count" => $result->getModifiedCount()
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "ID tidak valid atau error: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "ID unit wajib disertakan!"]);
}