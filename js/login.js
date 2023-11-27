// validation.js

function validateLoginForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var errors = [];
    if (email.trim() === "" || password.trim() === "") {
        errors.push("Both email and password are required");
    }

    if (errors.length > 0) {
        displayErrors(errors);
        return false; 
    } else {
        return true; 
    }
}

function displayErrors(errors) {
    var errorMessages = errors.map(error => "<div class='alert alert-danger'>" + error + "</div>").join("");
    document.getElementById("errors").innerHTML = errorMessages;
}
