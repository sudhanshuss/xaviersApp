$(document).ready(function() {
  /* $(".student-detail-continue").attr("disabled", "disabled");*/
  $(".parent-detail").hide();
  $(".school-detail").hide();
  $(".student-detail-continue").click(function() {
    $(".parent-detail-continue").attr("disabled", "disabled");
    $(".student-detail").hide();
    $(".parent-detail").show();
  });
  $(".parent-detail-continue").click(function() {
    /*$(".school-detail-register").attr("disabled", "disabled");*/
    $(".parent-detail").hide();
    $(".school-detail").show();
  });
  $(".student-detail-continue").click(function() {
    $(".school-detail").hide();
    $(".student-detail").hide();
    $(".parent-detail").show();
  });
  $(".parent-detail-back").click(function() {
    $(".parent-detail").hide();
    $(".school-detail").hide();
    $(".student-detail").show();
  });
  $(".school-detail-back").click(function() {
    $(".student-detail").hide();
    $(".school-detail").hide();
    $(".parent-detail").show();
  });

  /* TODO : handle the button enable and disable option.
  $('input').keypress(function() {
     if ((($("#firstName").val().length != -1) && 
       ($("#lastName").val().length != -1) &&
       ($("#dob").val().length != -1) &&
       ($("#dateOfAdmission").val().length != -1) &&
       ($("#classOfAdmission").val().length != -1) ) ||

       (($("#fatherName").val().length != -1) &&
       ($("#motherName").val().length != -1) &&
       ($("#fatherOccupation").val().length != -1) &&
       ($("#motherOccupation").val().length != -1) &&
       ($("#mobile").val().length != -1) &&
       ($("#telephone").val().length != -1) &&
       ($("#permanentaddress").val().length != -1) ) ||

      (($("#previousSchoolName").val().length != -1) &&
       ($("#previousSchoolclass").val().length != -1) )
       ) {
       $(".student-detail-continue,.parent-detail-continue").removeAttr("disabled");
     } else {
       $(".student-detail-continue,.parent-detail-continue").attr("disabled", "disabled");
     }
   });

   $('input').keyup(function() {
     if ((($("#firstName").val().length != 0) && 
       ($("#lastName").val().length != 0) && 
       ($("#dob").val().length != 0) && 
       ($("#dateOfAdmission").val().length != 0) && 
       ($("#classOfAdmission").val().length != 0)) ||

       (($("#fatherName").val().length != 0) &&
       ($("#motherName").val().length != 0) &&
       ($("#fatherOccupation").val().length != 0) &&
       ($("#motherOccupation").val().length != 0) &&
       ($("#mobile").val().length != 0) &&
       ($("#telephone").val().length != 0) &&
       ($("#permanentaddress").val().length != 0) ) ||

       (($("#previousSchoolName").val().length != 0) &&
       ($("#previousSchoolclass").val().length != 0) )

       ) {
       $(".student-detail-continue,.parent-detail-continue").removeAttr("disabled");
     } else
       $(".student-detail-continue,.parent-detail-continue").attr("disabled", "disabled");
   });*/
  $(".school-detail-register").click(function() {
    var formData = {
      'firstName': $('input[id=firstName]').val(),
      'middlename': $('input[id=middleName]').val(),
      'lastName': $('input[id=lastName]').val(),
      'dob': $('input[id=dob]').val(),
      'dateOfAdmission': $('input[id=dateOfAdmission]').val(),
      'classOfAdmission': $('input[id=classOfAdmission]').val(),
      'communicationAddress': $('input[id=communicationAddress]').val(),
      'fatherName': $('input[id=fatherName]').val(),
      'motherName': $('input[id=motherName]').val(),
      'fatherOccupation': $('input[id=fatherOccupation]').val(),
      'motherOccupation': $('input[id=motherOccupation]').val(),
      'mobile': $('input[id=mobile]').val(),
      'telephone': $('input[id=telephone]').val(),
      'permanentaddress': $('input[id=permanentaddress]').val(),
      'previousSchoolName': $('input[id=previousSchoolName]').val(),
      'previousSchoolclass': $('input[id=previousSchoolclass]').val(),
      'transferCertificate': $('input[id=transferCertificate]').val(),
      'previousSchooltelephone': $('input[id=previousSchooltelephone]').val(),
      'previousSchoolAddress': $('input[id=previousSchoolAddress]').val()
    };
    var url = window.location.href;
    var arr = url.split("/");
    var protocol = arr[0] + "//" + arr[2] + "/";

    formData = JSON.stringify(formData);
    $.ajax({
      type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
      url: protocol + 'student/register', // the url where we want to POST
      data: formData, // our data object
      dataType: 'json', // what type of data do we expect back from the server
      contentType: 'application/json',
      encode: true,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Auth', sessionStorage.getItem('Auth'));
      },
      success: function(data, status, jqXHR) {
        console.log("success: " + data);
        $(".modal-title").text('Registration Successful');
        $(".modal-body").addClass(".bg-sucess").text('Student Registration Number : ' + data.id);
        $("#myModal").modal('show');
        //  top.location.href = "menu.html"
      },
      error: function(xhr, status, e, count) {
        console.log("error" + status);
        $(".modal-title").text('Registration Error');
        $(".modal-body").addClass("bg-danger").text('oops ! something went wrong,Please try again !');
        $("#myModal").modal('show'); // add the actual error message under our input
      }
    })

  });
});