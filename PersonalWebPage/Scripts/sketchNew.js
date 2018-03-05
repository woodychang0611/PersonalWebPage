//AngularJS
var myApp = angular.module("myApp", []);
myApp.controller("myController",
    function ($scope) {
        $scope.password = "";
        $scope.repeatPassword = "";
        $scope.data = "";
        $scope.isPasswordRepeat = true;

        $scope.$watchCollection('[password,repeatPassword]',
            function () {
                if ($scope.password == $scope.repeatPassword) {
                    $("input[name$='repeatPassword']").removeClass('alert-danger');
                    $scope.isPasswordRepeat = true;
                } else {
                    $("input[name$='repeatPassword']").addClass('alert-danger');
                    $scope.isPasswordRepeat = false;
                }
            }
        )
    });

//Canvas Drawing

function getXY(event) {
    var x = 0;
    var y = 0;
    var offsetX = canvas.getBoundingClientRect().left;
    var offsetY = canvas.getBoundingClientRect().top;
    if (event == '[object MouseEvent]') {
        x = event.clientX - offsetX;
        y = event.clientY - offsetY;
    }
    else if (event == '[object TouchEvent]')
    {
        var p =event.changedTouches[0]
        x = p.clientX - offsetX;
        y = p.clientY - offsetY;
    }
    var ratio =$('#main')[0].width / parseInt($('#main').css('width')); 
    x = parseInt(x * ratio);
    y = parseInt(y * ratio);
    var pos = { x: x, y: y };
    return pos;
}

function distance(pos1, pos2) {
    var detX = (pos1.x - pos2.x);
    var detY = (pos1.y - pos2.y);
    return Math.sqrt(detX * detX + detY * detY);
}

function startDrawing(event) {
    count = 0;
    var pos = getXY(event);
    context.beginPath();
    context.moveTo(pos.x, pos.y);

    context.strokeStyle = currentColor;
    context.lineWidth = currentLineWidth;
    $('#output').html("mouseDownReporter");
    isDrawing = true;
    xPoints = [pos.x];
    yPoints = [pos.y];

}
function endDrawing() {

    if (isDrawing) {
        var temp = { color: currentColor,lineWidth:currentLineWidth, xPoints: xPoints, yPoints: yPoints };
        data.push(temp);

        var str = JSON.stringify(data);
        $("input[name$='data']").val(str);
        isDrawing = false;
    }
}



function moveReporter(event) {
    if (isDrawing && currentColor != '') {
        var pos = getXY(event);
        var str = "";
        str = "x:" + pos.x + ",y:" + pos.y + ",count:" + count;
        $('#output').html(str);
        if (distance(pos, lastPos) > 10) {
            count++;
            context.lineTo(pos.x, pos.y);
            xPoints.push(pos.x);
            yPoints.push(pos.y);
            context.stroke();
            lastPos = pos;
            document.body.style.overflowY = "hidden";
        }
    }
    return true;
}
var canvas = null;
var context = null;

var colorIndex = 0;
var isDrawing = false;
var colors = ['black','red', 'blue', 'lime', 'yellow', 'cyan', 'gold','purple'];
var currentColor = '';
var currentLineWidth = 10;
var lastPos = { x: 0, y: 0 };
var xPoints = [];
var yPoints = [];
var data = [];

function createColorPicker(target)
{

    for (var key in colors) {
        var color = colors[key];
         var d = document.createElement('div');
        $(d)
        .attr('class', 'colorElement col-xs-1')
        .css('background-color', color)
        .css('border-radius','5px')
        .attr('color', color)
        .css('min-width', 30)
        .css('min-height', 30)
        .css('max-width', 30)
        .css('max-height', 30)
        .css('margin', 5)
        .css('border', '3px solid transparent')
        .click(function () { setColor($(this)) });
        $('#' + target).append(d);
    }
    $('#' + target).css('background-color', 'slategray')
    .css('border-radius', '10px');
}

function setColor(target)
{
    var color = target.attr('color');
    $('.colorElement').css('border', '3px solid transparent');
    if (currentColor == color) {
        currentColor = '';
    }
    else {
        currentColor = color;
        target.css('border', '3px solid lightgray ');
    }
}


$(function () {
    canvas = $('#main')[0];
    context = canvas.getContext('2d');
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mousemove', moveReporter);
    canvas.addEventListener('mouseout', endDrawing);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', moveReporter);
    canvas.addEventListener('touchend', endDrawing);
})