window.onload = function() {
	var anim_delay = 700;
	$("#firstLine").fadeTo(anim_delay, 1, function() {
		$("#secondLine").fadeTo(anim_delay, 1, function() {
			$("#menubar").fadeTo(anim_delay, 1);
		})
	});
}