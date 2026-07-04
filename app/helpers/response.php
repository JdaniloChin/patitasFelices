<?php

function jsonResponse(bool $success, string $message, array $data = [], array $errors = []): void{
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode([
        "success" => $success,
        "message" => $message,
        "data" => $data,
        "errors" => $errors
    ]);

    exit;
}