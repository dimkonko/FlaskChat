window.onload = function() {
	var secondLine = $("#secondLine");

	$("#firstLine").fadeTo(1000, 1, function() {
		secondLine.fadeTo(1000, 1, function() {
			$("#logButtons").fadeTo(1000, 1);
		})
	});
}