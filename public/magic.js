// magic.js
$(document).ready(function() {

    // process the form
    $('form').submit(function(event) {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
            'email': $('input[name=email]').val(),
            'password': $('input[name=password]').val()
        };
        var inputData = JSON.stringify({
            "email": formData.email,
            "password": formData.password
        });
        // process the form
        $.ajax({
                type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url: 'users/login', // the url where we want to POST
                data: inputData, // our data object
                dataType: 'json', // what type of data do we expect back from the server
                contentType: 'application/json',
                encode: true,
                success: function(data, status, jqXHR) {
                    console.log("success: " + data);
                    top.location.href = "menu.html"
                },
                error: function(xhr, status, e, count) {
                    console.log("error" + status);
                     $('.error-message').css('color', 'red').text('Invalid Credentials,Please login again!'); // add the actual error message under our input
                }
            })
            // using the done promise callback
            /*  .done(function(data) {

                  // log data to the console so we can see
                  console.log(data);

                  if (typeof data.id === undefined) {

                      // handle errors for name ---------------
                      if (data.errors.email) {
                          $('#name-group').addClass('has-error'); // add the error class to show red input
                          $('#name-group').append('<div class="help-block">' + data.errors.name + '</div>'); // add the actual error message under our input
                      }

                      // handle errors for email ---------------
                      if (data.errors.password) {
                          $('#email-group').addClass('has-error'); // add the error class to show red input
                          $('#email-group').append('<div class="help-block">' + data.errors.email + '</div>'); // add the actual error message under our input
                      }

                      

                  } else {

                      // ALL GOOD! just show the success message!
                      $('form').append('<div class="alert alert-success">' + data.message + '</div>');

                      // usually after form submission, you'll want to redirect
                      // window.location = '/thank-you'; // redirect a user to another page
                      alert('success'); // for now we'll just alert the user

                  }
                  // here we will handle errors and validation messages
              });*/

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});