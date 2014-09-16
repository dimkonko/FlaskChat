window.onload = function() {
    var formSignup = document.getElementById("form_signin"),
    	inpPasswd = document.getElementById("hash");

    var errorMsg = $("#error_msg").hide();

    formSignup.onsubmit = function(event) {
        event.preventDefault();
        var hash = CryptoJS.SHA3(inpPasswd.value).toString();
        sendData(
            document.getElementById("inp_email").value,
            hash
        );
        return false;
    }

    function sendData(email, hash) {
        $.ajax({
            type: "POST",
            url: "/login",
            data: {
                "email": email,
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