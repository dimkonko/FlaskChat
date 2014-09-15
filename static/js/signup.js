window.onload = function() {
    var formSignup = document.getElementById("form_signup");

    var passwd = document.getElementById("inp_repeat_passwd"),
        inpHash = document.getElementById("hash");

    var errorMsg = $("#error_msg").hide();

    formSignup.onsubmit = function(event) {
        event.preventDefault();
        var hash = CryptoJS.SHA3(passwd.value).toString();
        sendData(
            document.getElementById("inp_email").value,
            document.getElementById("inp_nickname").value,
            hash
        );
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
                console.log(data);
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