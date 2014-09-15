window.onload = function() {
	
	$("#firstLine").fadeTo(0, 1, function() {
		$("#secondLine").fadeTo(0, 1, function() {
			$("#menubar").fadeTo(0, 1);
		})
	});
}