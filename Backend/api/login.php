<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../vendor/autoload.php';
require_once '../config/db.php';

use Firebase\JWT\JWT;

// Tangkap input dari frontend (React)
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)) {
    $collection = $db->admin;
    $user = $collection->findOne(["username" => $data->username]);

    if ($user && password_verify($data->password, $user->password)) {
        // Jika login sukses, buat Token JWT
        $payload = [
            "iss" => "rental_ps_api",
            "iat" => time(),
            "exp" => time() + (60 * 60 * 24), // Berlaku 24 jam
            "data" => [
                "id" => (string)$user->_id,
                "username" => $user->username,
                "role" => $user->role
            ]
        ];

        // Ganti 'SECRET_KEY' dengan kata rahasia apa saja (sebaiknya simpan di .env)
        // Ganti SECRET_KEY dengan key panjang
        $secret_key = "rental_ps_secret_key_super_panjang_123456789";

        $jwt = JWT::encode($payload, $secret_key, 'HS256');

        echo json_encode([
            "status" => "success",
            "token" => $jwt,
            "message" => "Login Berhasil"
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Username atau Password salah"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
}