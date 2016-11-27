// Smooth Scroll on-click (header Nav)
$(function() {
	$('div.nav a').not(":eq(0)").bind('click',function(event){
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollLeft: $($anchor.attr('href')).offset().left
		}, 1800,'easeOutExpo');
		event.preventDefault();
	});
});
