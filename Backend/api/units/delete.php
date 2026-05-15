<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../../config/db.php';

// Ambil ID dari parameter URL (misal: delete.php?id=xxxx)
$id = $_GET['id'] ?? null;

if ($id) {
    $collection = $db->units;

    try {
        $result = $collection->deleteOne(['_id' => new MongoDB\BSON\ObjectId($id)]);

        if ($result->getDeletedCount() > 0) {
            echo json_encode(["status" => "success", "message" => "Unit berhasil dihapus!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Data tidak ditemukan."]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "ID tidak valid."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "ID tidak disertakan."]);
}