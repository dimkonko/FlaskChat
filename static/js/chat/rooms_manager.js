var RoomsManager = function(socket) {
    var channels = document.getElementById("channels");

    var butOpenCreateRoomModal = document.getElementById("create_room"),
        inpCreateRoom = document.getElementById("inp_create_room"),
        butCreateRoom = document.getElementById("but_create_room");

    var createRoomModal = new Modal(document.getElementById("create_room_modal"));

    var noSymbolsPattern = /^[\w&.-]+$/;

    var cur_room;

    /* Left pannel*/
    socket.on("get_channels", function(msg) {
        /* Checks for newly created channels.
        Adds id, that manage clicks on this channels.
        Make current room selected
        */
        var channel_names = msg.data;
        channels.innerHTML = "";
        for(var i = 0; i < channel_names.length; i++) {
            var li = document.createElement("li");
            // li.id = "channel_" + channel_names[i];

            if(cur_room == channel_names[i]) {
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

    /* Modal form */
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
        socket.on("leave_room");
        socket.emit("join", {"room": room_name});
        cur_room = room_name;
        socket.emit("get_channels");
    }

    function closeCreateRoomModal() {
        if(createRoom(inpCreateRoom.value)) {
            inpCreateRoom.value = "";
            createRoomModal.close();
        }
    }

    function getRoom() {
        return cur_room;
    }

    return {
    	joinRoom: joinRoom,
        getRoom: getRoom
    }
}