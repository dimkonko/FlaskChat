$(document).ready(function() {
    var socket = io.connect('http://' + document.domain + ':' + location.port + '/c');

    var chat_area = $('#chat_area'),
        user_message = $('#message_text'),
        sendMessageBut = $('#send_message');

    var createRoomName = $("#create_room_name"),
        createRoomBut = $("#create_room");

    var nickname = document.getElementById("nickname").innerHTML;

    var room = "main";

    socket.on('my response', function(msg) {
        console.log(msg)
        chat_area.append(msg + "\n");
        chat_area.scrollTop = chat_area.scrollHeight;
    });
    socket.on("join", function(msg) {
        console.log("Join: " + msg);
        chat_area.append(msg + "\n");
    });
    // $('#send_message').on("click", function(event) {
    //     socket.emit('my event', {data: $('#message_text').val()});
    //     return false;
    // });
    sendMessageBut.on("click", function(event) {
        var message = user_message.val();

        if(message) {
            socket.emit('room msg',
                {"message": message, "room": room}
            );
            user_message.val("");
            return false;
        }
    });

    createRoomBut.on("click", function() {
        var created_room = createRoomName.val()
        if (created_room) {
            socket.emit("join", {data: created_room})
            room = created_room;
        };
    });

    user_message.keypress(function (e) {
        if(e.which == "13") {
            sendMessageBut.click();
            return false;
        }
    });

    createRoomName.keypress(function (e) {
        if(e.which == "13") {
            createRoomBut.click();
            return false;
        }
    });
});