<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'errors.php'; 


$sql = "SELECT * FROM form WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userEmail);
$stmt->execute();
$result = $stmt->get_result();


if ($result->num_rows > 0) {
    $userDetails = $result->fetch_assoc();
} else {
    
    header("Location: login.html");
    exit();
}

$stmt->close();
$conn->close();


$userDetailsJSON = json_encode($userDetails);
?>
