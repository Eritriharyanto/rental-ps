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

    echo "<h1>HORE! KONEKSI BERHASIL!</h1>";
    echo "Terhubung ke database: <strong>" . $dbName . "</strong>";
    
    // Set database utama
    $db = $client->selectDatabase($dbName); 

} catch (Exception $e) {
    echo "<h1>YAHHH! PIPA BOCOR!</h1>";
    echo "Error: " . $e->getMessage();
}