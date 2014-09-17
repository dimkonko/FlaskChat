window.onload = function() {
    var socket = io.connect("http://" + document.domain + ":" + location.port + "/c");

    var chat_area = document.getElementById("messages_wrapper"),
        user_message = document.getElementById("send_message_text"),
        sendMessageBut = document.getElementById("send_message_but");

    var chatSearch = new ChatSearch(socket);
    var roomsManager = new RoomsManager(socket);

    /* 
     * Socket listeners 
     */
    socket.on("connection", function(msg) {
        socket.emit("get_channels");
        roomsManager.joinRoom(msg.room);
    });

    socket.on("disconnect", function() {
        alert("Disconnected");
        document.location.href="/";
    });

    socket.on("server_response", function(msg) {
        printMessage(msg.owner + ":", msg.text)
    });

    /*
     * Event listeners
     */
    sendMessageBut.onclick = function() {
        sendMessage();
    };

    user_message.onkeydown = function(event) {
        if(event.keyCode == "13") {
            sendMessage();
        }
    };

    /*
     * Functions
     */
    function sendMessage() {
        var message = user_message.value;

        if(message.length > 0) {
            socket.emit("room_msg",
                {"message": message, "room": roomsManager.getRoom()}
            );
            user_message.value = "";
        }
    }

    function printMessage(owner, msg) {
        /* Append strings to textarea and
        scroll it down.
        */
        var new_message = document.createElement('div');
        new_message.className = "message";

        var br = document.createElement("br");

        var msg_owner = document.createElement('div');
        msg_owner.className = "message_owner";
        msg_owner.appendChild(document.createTextNode(owner))

        var msg_text = document.createElement("div");
        msg_text.className = "message_text";
        msg_text.innerHTML = msg;

        new_message.appendChild(msg_owner);
        new_message.appendChild(br);
        new_message.appendChild(msg_text)
        new_message.appendChild(br);
        
        chat_area.appendChild(new_message)
        chat_area.scrollTop = chat_area.scrollHeight;
    }
};
