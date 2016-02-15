function redrawCanvas(targetClass) {
    $('.' + targetClass).each(
        function () {
            //Test purpose only
            dummyDrawCanvas($(this)[0], $(this).attr('draw-data'));
        }
     )

}

function resizeCanvas(targetClass) {

    $('.' + targetClass).each(
        function () {
            var w = $(this).parent().width();
            $(this).css('width', w);
            $(this).css('height', w * 618/1000);
        }
     )
}

//Test purpose only
function dummyDrawCanvas(target, data) {
    var canvas = target;
    var ctx = canvas.getContext("2d");

    ctx.lineWidth = 15;
    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(500, 500);
    ctx.stroke();
    ctx.moveTo(500, 0);
    ctx.lineTo(0, 500);
    ctx.stroke();

    ctx.font = "50px Arial";
    ctx.fillText(data, 500, 500);

}
