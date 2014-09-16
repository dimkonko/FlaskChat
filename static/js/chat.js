window.onload = function() {
    var socket = io.connect("http://" + document.domain + ":" + location.port + "/c");

    var chat_area = document.getElementById("messages_wrapper"),
        user_message = document.getElementById("send_message_text"),
        sendMessageBut = document.getElementById("send_message_but");

    var butOpenCreateRoomModal = document.getElementById("create_room"),
        inpCreateRoom = document.getElementById("inp_create_room"),
        butCreateRoom = document.getElementById("but_create_room");

    var createRoomModal = new Modal(document.getElementById("create_room_modal"));

    var nickname = document.getElementById("nickname").innerHTML;

    var channels = document.getElementById("channels");

    var inpSearch = document.getElementById("inp_channels_search"),
        butSearch = document.getElementById("but_channels_search");

    var noSymbolsPattern = /^[\w&.-]+$/;

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
        printMessage(msg.owner + ":", msg.text)
    });
    socket.on("get_channels", function(msg) {
        /* Checks for newly created channels.
        Adds id, that manage clicks on this channels.
        Make current room selected
        */
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

    channels.onclick = function(event) {
        var channel = event.target;
        joinRoom(channel.innerHTML);
    }

    inpSearch.onkeydown = function(event) {
        /* Gets value from inpSearch and choose
        the route
        if input is emptt -> gets all channels
        else -> search channels
        */
        searchRoom();
    }
    butSearch.onclick = function() {
        searchRoom();
    }

    butOpenCreateRoomModal.onclick = function() {
        createRoomModal.show();
    };

    butCreateRoom.onclick = function() {
        closeCreateRoomModal();
    }

    inpCreateRoom.onkeydown = function(event) {
        if(event.keyCode == "13") {
            closeCreateRoomModal();
        }
    }

    /*
     * Functions
     */
    function searchRoom() {
        var searchedChannel = inpSearch.value;
        var socketRoute = "";
        if(searchedChannel.length > 0) {
            socketRoute = "search_channel";
        } else {
            socketRoute = "update_channels";
        }
        socket.emit(socketRoute, searchedChannel);
    }
    function sendMessage() {
        if(!room) {
            printMessage("Server", "Choose the room if you want to speak.");
            user_message.value = "";
            return false;
        }

        var message = user_message.value;

        if(message.length > 0) {
            socket.emit("room_msg",
                {"message": message, "room": room}
            );
            user_message.value = "";
        }
    }

    function createRoom(room_name) {
        if (room_name.length > 0) {
            if(noSymbolsPattern.test(room_name)) {
                socket.emit("create_room", {data: room_name})
                joinRoom(room_name);
                return true;
            } else {
                alert("Name should have only letters and numbers");
            }
        };
    }

    function joinRoom(room_name) {
        /* This function send leave request to
        "leave_room" route, change @param room to
        room name and join the new room with new 
        room name
        */
        inpSearch.value = "";
        socket.on("leave_room");
        room = room_name;
        socket.emit("join", {"room": room_name})
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
    function closeCreateRoomModal() {
        if(createRoom(inpCreateRoom.value)) {
            inpCreateRoom.value = "";
            createRoomModal.close();
        }
    }
};
