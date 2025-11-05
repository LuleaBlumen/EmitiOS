<?php
// === send_mail.php ===
// Empfängt JSON {"to": "...", "name": "...", "from": "...", "message": "..."} und schickt es an die festgelegte Adresse

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Zieladresse fest im Code – hier keine fremden Empfänger erlaubt
$recipient = "emoti.os@outlook.de";

$raw = file_get_contents("php://input");
if (!$raw) {
  echo json_encode(["success" => false, "error" => "Kein Eingabetext erhalten."]);
  exit;
}

$data = json_decode($raw, true);
if (!$data) {
  echo json_encode(["success" => false, "error" => "Ungültiges JSON."]);
  exit;
}

// Eingaben filtern
$name = isset($data["name"]) ? strip_tags($data["name"]) : "Unbekannt";
$email = isset($data["from"]) ? filter_var($data["from"], FILTER_SANITIZE_EMAIL) : "";
$msg = isset($data["message"]) ? trim(strip_tags($data["message"])) : "";

if ($msg === "") {
  echo json_encode(["success" => false, "error" => "Leere Nachricht."]);
  exit;
}

// Absenderprüfung (optional)
if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $email = "";
}

// Mailaufbau
$subject = "Neue Nachricht von EmotiOS";
$body  = "Absender: " . $name . "\n";
if ($email) $body .= "E-Mail: " . $email . "\n";
$body .= "\nNachricht:\n" . $msg . "\n";

// Header setzen
$headers = "From: EmotiOS Kontaktformular <no-reply@deinedomain.de>\r\n";
if ($email) $headers .= "Reply-To: $email\r\n";

$success = @mail($recipient, $subject, $body, $headers);

if ($success) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "error" => "Mail konnte nicht gesendet werden."]);
}
