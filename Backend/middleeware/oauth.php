<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function checkAuth() {
    // 1. Ambil Header Authorization (Bearer Token)
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;

    if (!$authHeader) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Akses ditolak! Token tidak ditemukan."]);
        exit;
    }

    // 2. Ambil token saja (Hapus tulisan "Bearer ")
    $token = str_replace("Bearer ", "", $authHeader);

    try {
        // 3. Verifikasi Token menggunakan Secret Key dari .env
        $secretKey = $_ENV['JWT_SECRET'];
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));

        // Cek apakah yang login benar-benar Admin
        if ($decoded->data->role !== 'admin') {
            http_response_code(403);
            echo json_encode(["status" => "error", "message" => "Akses dilarang! Hanya admin yang boleh."]);
            exit;
        }

        return $decoded; // Token valid!
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Token tidak valid atau kedaluwarsa."]);
        exit;
    }
}