(function() {
	var inpSearch = document.getElementById("inp_channels_search"),
		butSearch = document.getElementById("but_channels_search");

	inpSearch.onchange = function() {
		var searchedChannel = inpSearch.value;
		var channels = document.getElementById("channels").childNodes;

		for(var i = 0; i < channels.length; i++) {
			if(channels[i].innerHTML == searchedChannel) {
				
			}
		}
	}
}());