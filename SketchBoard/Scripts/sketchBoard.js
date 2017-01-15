function redrawCanvas(target) {
    target.each(
        function () {
            drawCanvasData($(this)[0], $(this).attr('draw-data'));
        }
     )
}

function drawCanvasData(targetCanvas, data) {
    var canvas = targetCanvas;
    var ctx = canvas.getContext("2d");

    try {
        var strokes = JSON.parse(data);
        for (var key in strokes)
        {
            var stroke = strokes[key];
            ctx.lineWidth = stroke.lineWidth;
            ctx.strokeStyle = stroke.color;
            var n = stroke.xPoints.length;
            ctx.beginPath();
            ctx.moveTo(stroke.xPoints[0], stroke.yPoints[0]);
            for (i = 1; i < n; i++) 
            {
                ctx.lineTo(stroke.xPoints[i], stroke.yPoints[i]);
            }
            ctx.stroke();
        }
    }
    catch (e) {
        ctx.font = "50px Arial";
        ctx.fillText(e.toString(), 30, 30);
    }
}
