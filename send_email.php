<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $firstName = $_POST['firstName'] ?? '';
    $lastName = $_POST['lastName'] ?? '';
    $companyName = $_POST['companyName'] ?? '';
    $emailId = $_POST['emailId'] ?? '';
    $phoneNumber = $_POST['phoneNumber'] ?? '';
    $topicAddress = $_POST['topicAddress'] ?? '';
    $emailConsent = isset($_POST['emailConsent']) ? 'Yes' : 'No';

    // Recipient email address
    $to = "jitendra.valiya@neosoftmail.com";  // Change to your recipient's email

    // Subject
    $subject = "New Form Submission from $firstName $lastName";

    // Email body
    $body = "You have received a new message from the contact form:\n\n";
    $body .= "First Name: $firstName\n";
    $body .= "Last Name: $lastName\n";
    $body .= "Company Name: $companyName\n";
    $body .= "Email: $emailId\n";
    $body .= "Phone Number: $phoneNumber\n";
    $body .= "Topic Address: $topicAddress\n";
    $body .= "Email Consent: $emailConsent\n";

    // Headers
    $headers = "From: $emailId" . "\r\n";
    $headers .= "Reply-To: $emailId" . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["success" => true, "message" => "Email sent successfully!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to send email."]);
    }
}
?>
