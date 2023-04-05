
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            let first_check = form.checkValidity();
            let second_check = CustomValidatetion();
            event.preventDefault()
            event.stopPropagation()
          if (!first_check || !second_check) {
            event.preventDefault()
          }else{
            save_form();
          }
  
          form.classList.add('was-validated')
        }, false)
      })
      function CustomValidatetion(){
        let result = true
        // username
        var username_txt = document.getElementById("username").value;
        var username = document.getElementById("username");
        if(username_txt.includes(" ") || username_txt.length == 0){     
            username.setCustomValidity('Username is required , and characters must be without spaces.');
            result =  false;
        }else{
            username.setCustomValidity('');            
        }

        // password
        var password_txt = document.getElementById("Password").value;
        var password = document.getElementById("Password");
        if(password_txt.length  <= 8 || !containsNumbers(password_txt) || !hasSpecialChars(password_txt) || !containsUppercase(password_txt)){     
            password.setCustomValidity('Password is required , and its characters must be more than 8 characters, with at least 1 number, uppercase, and special characters.');
            result =  false;
        }else{
            password.setCustomValidity('');            
        }

        //Email
        var email_txt = document.getElementById("Email").value;
        var email = document.getElementById("Email");
        if(!validateEmail(email_txt)){     
            email.setCustomValidity('Email is required, and its format must be valid.');
            result =  false;
        }else{
            email.setCustomValidity('');            
        }

        //Phone
        var phone_txt = document.getElementById("Phone").value;
        var phone = document.getElementById("Phone");
        if(!phone_txt.startsWith("07") || phone_txt.length  != 10){     
            phone.setCustomValidity('Phone number is required, and its format must be valid.');
            result =  false;
        }else{
            phone.setCustomValidity('');            
        }






        return result;
        
      }

      function containsNumbers(str) {
        return str.match(/\d/);
      }
      function  hasSpecialChars(str) {
        return str.match(/[!@#$%^&*]/);      
      }
      function containsUppercase(str) {
        return str.match(/[A-Z]/);        
      }
      function validateEmail(str) {    
        return str.match(/\S+@\S+\.\S+/);        
      }
      function save_form() {
        var username_txt = document.getElementById("username").value;
        var password_txt = document.getElementById("Password").value;
        var email_txt = document.getElementById("Email").value;
        var phone_txt = document.getElementById("Phone").value;
        let check_exist = sessionStorage.getItem(username_txt) ;
        if(check_exist == null) {
            sessionStorage.setItem(username_txt, JSON.stringify({
                username: username_txt,
                password: password_txt,
                email: email_txt,
                phone: phone_txt
                 }));            
                 alert("Registration successful!");
        }else{
            alert("You have already submitted this form before.");
        }
      }