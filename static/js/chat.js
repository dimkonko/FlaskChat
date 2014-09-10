$(document).ready(function() {
    var socket = io.connect('http://' + document.domain + ':' + location.port + '/c');
    console.log(socket);

    socket.on('my response', function(msg) {
        $('#chat_area').append(msg.data + "\n");
    });
    // $('#send_message').on("click", function(event) {
    //     socket.emit('my event', {data: $('#message_text').val()});
    //     return false;
    // });
    $('#send_message').on("click", function(event) {
        var message = $('#message_text').val();

        if(message) {
            socket.emit('broadcast', {data: message});
            return false;
        }
    });
});