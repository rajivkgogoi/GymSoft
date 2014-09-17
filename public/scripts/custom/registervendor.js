
$(document).ready(function () {
    $("#datepicker1").datepicker();
    $("#datepicker2").datepicker();
});

 function checkForm(form)
  {
    if(form.centername.value == "") {
      alert("Error: Centername cannot be blank!");
      form.centername.focus();
      return false;
    }
    re = /^\w+$/;
    if(!re.test(form.centername.value)) {
      alert("Error: Username must contain only letters, numbers and underscores!");
      form.username.focus();
      return false;
    }

    if(form.password.value != "" && form.password.value == form.pwd2.value) {
      if(form.password.value.length < 3) {
        alert("Error: Password must contain at least 3 characters!");
        form.password.focus();
        return false;
      }
	  /*
       re = /[a-z]/;
      if(!re.test(form.password.value)) {
        alert("Error: password must contain at least one lowercase letter (a-z)!");
        form.password.focus();
        return false;
      }
	   re = /[0-9]/;
      if(!re.test(form.pwd1.value)) {
        alert("Error: password must contain at least one number (0-9)!");
        form.pwd1.focus();
        return false;
      }
      re = /[A-Z]/;
      if(!re.test(form.password.value)) {
        alert("Error: password must contain at least one uppercase letter (A-Z)!");
        form.password.focus();
        return false;
      }*/
    } else {
      alert("Error: Your password Confirmation Didn't matched ");
      form.password.focus();
      return false;
    }

    //alert("You entered a valid password: " + form.password.value);
    return true;
  }

  