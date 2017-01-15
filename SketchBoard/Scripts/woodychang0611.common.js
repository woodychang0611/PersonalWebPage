

$(function(){
    $('.fix-aspect-ratio').each(
        function () {
            var ratio = Number(1.0 * $(this).attr('aspect-ratio'));
            if ((ratio)) {
                maintainAspectRatio($(this),ratio)
            }
        }
        );
})

function maintainAspectRatio(target,ratio)
{
	$(function () {
		updateAspectRatio(target, ratio);
	}
	)
	$(window).resize(function () {
		updateAspectRatio(target, ratio);
	});
}

function updateAspectRatio(target, ratio) {
	target.each(
	function () {
	//	$(this).height($(this).width() * ratio);
		var w = $(this).parent().width();
		$(this).css('width', w);
		$(this).css('height', w * ratio);
	}
	)
}
