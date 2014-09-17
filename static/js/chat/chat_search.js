var ChatSearch = function(socket) {
	var inpSearch = document.getElementById("inp_channels_search"),
		butSearch = document.getElementById("but_channels_search");

    butSearch.onclick = function() {
        searchRoom();
    }

    inpSearch.onkeydown = function(event) {
        /* Gets value from inpSearch and choose
        the route
        if input is emptt -> gets all channels
        else -> search channels
        */
        searchRoom();
    }

    function searchRoom() {
        socket.emit("search_channel", inpSearch.value);
    }
};