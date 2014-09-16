window.onload = function() {
    var minPasswdLength = 5;

    var formSignup = document.getElementById("form_signup");

    var inpPasswd = document.getElementById("inp_passwd")
        inpRepeatpasswd = document.getElementById("inp_repeat_passwd"),
        inpHash = document.getElementById("hash");

    var errorMsg = $("#error_msg").hide();

    formSignup.onsubmit = function(event) {
        event.preventDefault();

        var passwd = inpPasswd.value;
        var repeatedPasswd = inpRepeatpasswd.value;

        if(repeatedPasswd.length <= minPasswdLength) {
            showError("Password can't be less than " + minPasswdLength +
                " symbols");
            return false;
        }
        if(passwd == repeatedPasswd) {  
            var hash = CryptoJS.SHA3(inpRepeatpasswd.value).toString();
            sendData(
                document.getElementById("inp_email").value,
                document.getElementById("inp_nickname").value,
                hash
            );
        } else {
            showError("Passwords do not match");
        }
        return false;
    }

    function sendData(email, nickname, hash) {
        $.ajax({
            type: "POST",
            url: "/signup",
            data: {
                "email": email,
                "nickname": nickname,
                "hash": hash
            },
            cache: false,
            async:false,
            success: function(data) {
                if(data.error_msg) {
                    showError(data.error_msg);
                } else {
                    window.location = data.redirect;
                }
            }, //End of success
            error: function(jqXHR) {
                showError("Server error");
            }
        });  // Endof AJAX
    }

    function showError(msg) {
        errorMsg.html(msg);
        errorMsg.show("fast");
    }
}