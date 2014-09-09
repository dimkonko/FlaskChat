window.onload = function() {
	$("#firstLine").fadeTo(1000, 1, function() {
		$("#secondLine").fadeTo(1000, 1, function() {
			$("#menubar").fadeTo(1000, 1);
		})
	});
}