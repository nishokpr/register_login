<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();

var_dump($_POST);
// Assuming you have a database connection
require_once "errors.php";

if (isset($_POST["submit"])) {
    $Fullname = $_POST["fullname"];
    $Gender = $_POST["gender"];
    $Email = $_POST["email"];
    $Password = $_POST["password"];
    $passwordHash = password_hash($Password, PASSWORD_DEFAULT);

    $sql = "SELECT* FROM form WHERE email = '$Email'";
    $result = mysqli_query($conn, $sql);
    $rowCount = mysqli_num_rows($result);
    if($rowCount>0){
        echo "email_exists_error: Email already exists in database"; 
        exit();
    }

    
    $sql = "INSERT INTO form (fullname, gender, email, password) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_stmt_init($conn);

    if (!$stmt) {
        die('Error in mysqli_stmt_init: ' . mysqli_error($conn));
    }

    $preparestmt = mysqli_stmt_prepare($stmt, $sql);

    if ($preparestmt) {
        mysqli_stmt_bind_param($stmt, "ssss", $Fullname, $Gender, $Email, $passwordHash);
        $executionResult = mysqli_stmt_execute($stmt);

        if ($executionResult) {
            header("Location: login.html");
            exit(); 
        } else {
            echo "execution_error"; 
            die('Error in mysqli_stmt_execute: ' . mysqli_error($conn));
        }
    } else {
        echo "prepare_error"; 
        die('Error in mysqli_stmt_prepare: ' . mysqli_error($conn));
    }
} else {
    echo "form_not_submitted"; 
}






?>
