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
    currentColor= colors[colorIndex];
    context.strokeStyle = currentColor;
    context.lineWidth = 5;
    $('#output').html("mouseDownReporter");
    colorIndex = (colorIndex + 1) % colors.length;
    isDrawing = true;
    xPoints = [pos.x];
    yPoints = [pos.y];

}
function endDrawing() {

    if (isDrawing) {
        var temp = { color: currentColor, xPoints: xPoints, yPoints: yPoints };
        data.push(temp);

        var str = JSON.stringify(data);
        //var str = data.toString();
        $('#output').html(str);
        isDrawing = false;
    }
}



function moveReporter(event) {
    if (isDrawing) {
        var pos = getXY(event);
        var str = "";
        str = "x:" + pos.x + ",y:" + pos.y + ",count:" + count;
        $('#output').html(str);
        if (distance(pos, lastPos) > 10) {
            count++;
            context.lineTo(pos.x, pos.y);
            xPoints.push(pos.x);
            yPoints.push(pos.y);

            //  context.quadraticCurveTo(lastPos.x , lastPos.y, pos.x, pos.y);
            context.stroke();
            lastPos = pos;
            document.body.style.overflowY = "hidden";
        }
    }
    return true;
}

var canvas = null;
var context = null;
var colors = ['red', 'blue', 'lime', 'yellow', 'cyan','orange'];
var colorIndex = 0;
var isDrawing = false;
var currentColor = '';
var lastPos = { x: 0, y: 0 };
var xPoints = [];
var yPoints = [];
var data = [];

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