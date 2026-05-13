<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../vendor/autoload.php';
require_once '../../config/db.php';

try {

    $collection = $db->units;

    // Ambil semua data
    $cursor = $collection->find([], [
        'sort' => ['created_at' => -1]
    ]);

    $units = $cursor->toArray();

    echo json_encode([
        "status" => "success",
        "data" => $units
    ]);

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}