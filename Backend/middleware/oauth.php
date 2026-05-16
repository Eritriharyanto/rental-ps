<?php

require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function checkAuth() {

    $headers = getallheaders();

    $authHeader =
        $headers['Authorization']
        ?? $headers['authorization']
        ?? $_SERVER['HTTP_AUTHORIZATION']
        ?? null;

    if (!$authHeader) {
        http_response_code(401);
        echo json_encode([
            "status" => "error",
            "message" => "Akses ditolak! Token tidak ditemukan."
        ]);
        exit;
    }

    $token = str_replace("Bearer ", "", $authHeader);

    try {

        $secretKey = $_ENV['JWT_SECRET'];

        $decoded = JWT::decode(
            $token,
            new Key($secretKey, 'HS256')
        );

        if ($decoded->data->role !== 'admin') {
            http_response_code(403);
            echo json_encode([
                "status" => "error",
                "message" => "Akses dilarang! Hanya admin yang boleh."
            ]);
            exit;
        }

        return $decoded;

    } catch (Exception $e) {

        http_response_code(401);

        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);

        exit;
    }
}