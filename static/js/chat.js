window.onload = function() {
    var socket = io.connect("http://" + document.domain + ":" + location.port + "/c");

    var chat_area = document.getElementById("chat_area"),
        user_message = document.getElementById("message_text"),
        sendMessageBut = document.getElementById("send_message");

    var createRoomName = document.getElementById("create_room_name"),
        createRoomBut = document.getElementById("create_room");

    var nickname = document.getElementById("nickname").innerHTML;

    var channels = document.getElementById("channels");

    var room;// = "main";
    var selected_channel_id, selected_channel;

    /* 
     * Socket listeners 
     */
    socket.on("disconnect", function() {
        alert("Disconnected");
        document.location.href="/";
    });

    socket.on("server_response", function(msg) {
        printMessage(msg);        
    });
    socket.on("get_channels", function(msg) {
        var channel_names = msg.data;
        channels.innerHTML = "";
        for(var i = 0; i < channel_names.length; i++) {
            var li = document.createElement("li");
            var new_id = "channel_" + channel_names[i];
            li.id = "channel_" + channel_names[i];

            if(room == channel_names[i]) {
                li.style.background = "green";
            }
            li.appendChild(document.createTextNode(channel_names[i]));
            channels.appendChild(li);
        }
    });

    channels.onclick = function(event) {
        var channel = event.target;
        joinRoom(channel.innerHTML);
    }

    /*
     * Event listeners
     */
    sendMessageBut.onclick = function() {
        sendMessage();
    };

    createRoomBut.onclick = function() {
        createRoom();
    };

    user_message.onkeydown = function(event) {
        if(event.keyCode == "13") {
            sendMessage();
        }
    };

    createRoomName.onkeydown = function(event) {
        if(event.keyCode == "13") {
            createRoom();
        }
    };

    /*
     * Functions
     */
    function sendMessage() {
        if(!room) {
            printMessage("Choose the room if you want to speak.");
            user_message.value = "";
            return false;
        }
        var message = user_message.value;

        if(message) {
            socket.emit("room_msg",
                {"message": message, "room": room}
            );
            user_message.value = "";
        }
    }

    function createRoom() {
        var created_room = createRoomName.value;
        if (created_room) {
            socket.emit("create_room", {data: created_room})
            joinRoom(created_room);
        };
    }

    function joinRoom(room_name) {
        socket.on("leave_room");
        room = room_name;
        socket.emit("join", {"room": room_name})
    }

    function printMessage(msg) {
        chat_area.value += msg + "\n";
        chat_area.scrollTop = chat_area.scrollHeight;
    }
};