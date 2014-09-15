window.onload = function() {
    var formSignup = document.getElementById("form_signup"),
    	passwd = document.getElementById("hash");

    var errorMsg = $("#error_msg").hide();

    formSignup.onsubmit = function(event) {
        event.preventDefault();
        console.log("Submiting...");
        var hash = CryptoJS.SHA3(passwd.value).toString();
        sendData(
            document.getElementById("inp_email").value,
            hash
        );
        console.log("ok");
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