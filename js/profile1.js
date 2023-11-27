$(document).ready(function() {
    
    $.ajax({
      url: 'profile1.php',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        
        $('#user-fullname').text(data.fullname);
        $('#user-gender').text(data.gender);
        $('#user-email').text(data.email);
      },
      error: function() {
        console.error('Error fetching user details');
      }
    });
  });
  