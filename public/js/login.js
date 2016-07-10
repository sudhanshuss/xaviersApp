$(document).ready(function() {
  $("#login-button").attr("disabled", "disabled");

  $('input').keypress(function() {
    if (($("#email").val().length != -1) && ($("#password").val().length != -1)) {
      $("#login-button").removeAttr("disabled");
    } else {
      $("#login-button").attr("disabled", "disabled");
    }
  });

  $('input').keyup(function() {
    if (($("#email").val().length != 0) && ($("#password").val().length != 0)) {
      $("#login-button").removeAttr("disabled");
    } else
      $("#login-button").attr("disabled", "disabled");
  });
  
  $('form').submit(function(event) {
    var formData = {
      'email': $('input[name=email]').val(),
      'password': $('input[name=password]').val()
    };
    var inputData = JSON.stringify({
      "email": formData.email,
      "password": formData.password
    });
    $.ajax({
      type: 'POST', 
      url: 'users/login', 
      data: inputData,
      dataType: 'json', 
      contentType: 'application/json',
      encode: true,
      success: function(data, status, jqXHR) {
        console.log("success: " + data);
        sessionStorage.setItem('Auth', jqXHR.getResponseHeader("Auth"));
        top.location.href = "/html/menu.html"
      },
      error: function(xhr, status, e, count) {
        console.log("error" + status);
        $('.error-message').css('color', 'red').text('Invalid Credentials,Please login again!'); // add the actual error message under our input
      }
    })
    event.preventDefault(); // stop the form from submitting the normal way and refreshing the page
  });

});