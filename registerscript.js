
function getdata() {
    console.log(sessionStorage.getItem("type"));
}

function register_user() {
    sessionStorage.setItem("type", "user");
    window.location = "./register.html";
}

function register_restaurant() {
    sessionStorage.setItem("type", "restaurant");
    window.location = "./register.html";
}


function Registration_user() {
    var email = document.getElementById("register_customer_email").value;
    var name = document.getElementById("register_customer_fullname").value;
    var password = document.getElementById("register_customer_password").value;
    var phone = document.getElementById("register_customer_number").value;
    var address = document.getElementById("register_customer_address").value;
    if(ValidateEmail(email) && name && validpassword(password) && validnumber(phone) && address) {
        $.ajax({
            url : 'server.php',
            type : 'POST',
            data : {
                type: 'register_user',
                uid1 : email,
                pass : password,
                Fullname : name,
                number1 : phone,
                userddress : address
            },
            success : function(result, status) {
                console.log(result);
                value = $.parseJSON(result);
                if(value.status === "success") {
                    console.log("sucess login");
                    logout();
                    alert("User Registered");
                    window.location = "http://localhost/food%20shala/";
                }
                else {
                    console.log(value);
                }
            },
            beforeSend: function(){
                console.log("Sending...");
            }
        });
    }
}

function Registration_restaurant() {
    var email = document.getElementById("register_restaurant_email").value;
    var name = document.getElementById("register_restaurant_fullname").value;
    var password = document.getElementById("register_restaurant_password").value;
    var phone = document.getElementById("register_restaurant_number").value;
    var address = document.getElementById("register_restaurant_address").value;

    if(ValidateEmail(email) && name && validpassword(password) && validnumber(phone) && address) {
        $.ajax({
            url : 'server.php',
            type : 'POST',
            data : {
                type: 'restaurant',
                uid1 : email,
                pass : password,
                Fullname : name,
                number1 : phone,
                userddress : address
            },
            success : function(result, status) {
                console.log(result);
                value = $.parseJSON(result);
                if(value.status === "success") {
                    logout();
                    alert("You are Registered");
                    window.location =  "http://localhost/food%20shala/";
                }
                else {
                    if(value.emailphone ==="both") 
                        alert("Email id and Phone No already Exist in database");
                    if(value.emailphone ==="phone") 
                        alert("Phone No already Exist in database");
                    if(value.emailphone ==="email") 
                        alert("Email id and Phone No already Exist in database");
                }
                
            },
            beforeSend: function(){
                console.log("Sending...");
            }
        });
    } else {
        alert("Fill all Datails");
    }
}

window.onload = function() {
   if(sessionStorage.getItem("type") === "user") {
       document.getElementById("Userregisterform").style.display="block";
       document.getElementById("registrationregisterform").style.display="none";
   }
   if(sessionStorage.getItem("type") === "restaurant") {
    document.getElementById("Userregisterform").style.display="none";
    document.getElementById("registrationregisterform").style.display="block";
   }
}
// Validation 
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}
function validpassword(password) {
    console.log(password.length + "== " +checkSpecialChar(password))
    if(password.length > 6 && checkSpecialChar(password) > 66) {
        return true;
    }
    if(password.length < 6) {
        alert("password must be greater than 6 digits");
        return false;
    }
    else if(checkSpecialChar(password) <= 66) {
        alert("Password must be Strong")
        return false;
    }

}
function validnumber(phone) {
    if(phone.length === 10) {
        return true;
    }
    alert("Not a Valid Number length");
    return false;
}
function logout() {
    console.log("Logout");
    sessionStorage.removeItem("id");
    jsondata = {};
    user = "";
    $.ajax({
        url : 'server.php',
        type : 'POST',
        data : {
            uid: 'logoutsession'
        },
        success : function(result, status) {
            console.log(result);
            value = $.parseJSON(result);
            console.log(value);
        },
        beforeSend: function(){
            console.log("Sending...");
        }
    });
}

function checkPassword(){
    var password_value = document.getElementById('register_customer_password').value;
    var slider = document.getElementById('div-slider');
    var message = document.getElementById('password_message');
    var val = checkSpecialChar(password_value);
    if(password_value.length < 6) {
        val = 6;
        slider.style.backgroundColor = "red";
        message.innerText = "Week Password";
        slider.style.width = val+"%";
    }
    if(val < 33) {
        document.getElementById('password-slider').style.display = "block";
        slider.style.width = val+"%";
    }
    if(password_value.length > 6) {
        if( val < 33){
            slider.style.backgroundColor = "red";
            message.innerText = "Week Password";
            slider.style.width = val+"%";
        }
        if( val < 66 && val >= 33){
            slider.style.backgroundColor = "yellow";
            message.innerText = "Medium Password";
            slider.style.width = val+"%";
        }
        if( val >= 66){
            slider.style.backgroundColor = "green";
            message.innerText = "Strong Password";
            if(val < 101)
                slider.style.width = val+"%";
            else slider.style.width="100%";
        }
    }
}
function checkSpecialChar(pass){
    var score = 0;
    if (!pass)
        return score;
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }
    var variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return parseInt(score);
}