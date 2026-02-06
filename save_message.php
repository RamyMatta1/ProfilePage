<?php
// save_message.php
header('Content-Type: application/json'); // Ensure JSON response

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Honey Pot (Spam Prevention)
    // Add <input type="text" name="website" style="display:none"> to your HTML form.
    // If a bot fills it out, reject the message.
    if (!empty($_POST['website'])) {
        echo json_encode(["status" => "success", "message" => "Sent."]); // Fake success
        exit;
    }

    // 2. Sanitization
    $name = htmlspecialchars(strip_tags($_POST['name'] ?? 'N/A'));
    $email = htmlspecialchars(strip_tags($_POST['email'] ?? 'N/A'));
    $message = htmlspecialchars(strip_tags($_POST['message'] ?? 'N/A'));
    $timestamp = date("Y-m-d H:i:s");

    // 3. Secure Logging
    // We add a random hash to the filename or use .php extension with an exit header
    // Ideally, this path should be '../private_logs/messages.txt'
    $logEntry = "[$timestamp] Name: $name | Email: $email | Message: $message" . PHP_EOL;
    $filename = "messages_secure.log"; 

    // 4. File Locking & Writing
    if (file_put_contents($filename, $logEntry, FILE_APPEND | LOCK_EX)) {
        echo json_encode(["status" => "success", "message" => "Saved successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Server permission error."]);
    }
} else {
    // Handle non-POST requests
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}
?>