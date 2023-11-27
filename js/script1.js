// validation.js

function validateForm() {
    console.log("validateForm function is executing");
    var fullname = document.getElementById("fullname").value;
    var gender = document.getElementById("gender").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmpassword").value;

    // Perform client-side validation
    var errors = [];
    if (fullname.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
        errors.push("All fields are required");
    }
    if (!validateEmail(email)) {
        errors.push("Email is not valid");
    }
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters");
    }
    if (password !== confirmPassword) {
        errors.push("Password does not match");
    }

    if (errors.length > 0) {
        displayErrors(errors);
    } else {
        // If no errors, proceed with AJAX call
        submitForm();
    }
}

function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayErrors(errors) {
    var errorMessages = errors.map(error => "<div class='alert alert-danger'>" + error + "</div>").join("");
    document.getElementById("errors").innerHTML = errorMessages;
}

function submitForm() {
    $.ajax({
        url: "conn2.php",
        type: "post",
        data: $("#registration-form").serialize(),
        success: function (response) {
    // Log the response
            if (response === "success") {
                window.location.href = "login.html";
            } else {
                displayErrors(["An error occurred while processing the form"]);
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText); 
            displayErrors(["An error occurred while processing the form"]);
        }
    });
}
