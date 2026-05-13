<?php
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');

try {
    $dotenv->load();

    // Perbaikan di sini: Ambil berdasarkan KUNCI di .env, yaitu DB_NAME
    $uri = $_ENV['MONGODB_URI'] ?? null;
    $dbName = $_ENV['DB_NAME'] ?? null; 

    // Cek apakah variabel di .env sudah terbaca atau belum
    if (!$uri || !$dbName) {
        // Pesan errornya juga kita perbaiki biar tidak bingung
        throw new Exception("Variabel MONGODB_URI atau DB_NAME tidak ditemukan di file .env");
    }

    $client = new MongoDB\Client($uri);

    // Tes koneksi (Ping)
    $client->selectDatabase('admin')->command(['ping' => 1]);
    
    // Set database utama
    $db = $client->selectDatabase($dbName); 

}  catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);

    exit();
}