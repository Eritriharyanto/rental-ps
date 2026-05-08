<?php
header("Accsess-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Menthods: GET");

require_once '../..config/db.php';

try {
    $collection = $db->units;

    // Ambil semua data, urutkan bedasarkan yang terbaru
    $cursor = $collection->find([], ['sort' => ['created_at' => -1]]);
    $units = $cursor->toArray() ;

    echo json_encode([
        "status" => "success",
        "data" => $units
    ]);
} catch (exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}