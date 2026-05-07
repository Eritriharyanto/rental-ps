<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

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
        $jwt = JWT::encode($payload, "KODE_RAHASIA_KITA", 'HS256');

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