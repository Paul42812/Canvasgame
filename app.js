var canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
var clspeed = 10;
var a;
var b;
var c;

ctx.canvas.width = window.innerWidth - 5;
ctx.canvas.height = window.innerHeight - 5;

var clpos = canvas.width / 2;

if (!(canvas.getContext)) {
    alert("No Canvas support")
}

window.addEventListener('keydown', event => {
    if (event["key"] == "d" && clpos < canvas.width) {
        clpos += clspeed;
    }
    if (event["key"] == "a" && clpos > 0) {
        clpos -= clspeed;
    }
});

ctx.lineWidth = 10;
var timer = setInterval(onTick, 1)

var x = canvas.width / 2;
var y = canvas.height - 700;
var a = Math.PI * 2;
var arrx = [];
var arry = [];

function onTick() {
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //manage snake
    x = 1 * Math.sin(a) + x;
    y = 1 * Math.cos(a) + y;

    arrx.push(x);
    arry.push(y);

    ctx.beginPath();
    for (var l = 0; l < arrx.length; l++) {
        ctx.fillStyle = "green";
        ctx.fillRect(arrx[l] - 5, arry[l] - 5, 10, 10);
    }
    ctx.stroke();

    if (arrx.length > 100) {
        arrx.splice(0, 1)
        arry.splice(0, 1)
    }

    //puc
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(clpos, canvas.height, 50, Math.PI, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    //walls
    if (x > canvas.width || x < 0 || y < 0 || y > canvas.height) {
        if (a > Math.PI / 2) {
            a = -1 * (3 * Math.PI / 2 - ((3 * Math.PI / 2) - a));
        } else if (a < Math.PI / 2) {
            a = 3 * Math.PI / 2 - (a - (3 * Math.PI / 2));
        } else {
            a = Math.PI * 1.5;
        }
    }

    ctx.lineWidth = 10;

    if (Math.round(x) - clpos < 50 && Math.round(x) - clpos > -50) {
        var k = Math.sqrt(50 ** 2 - (Math.round(x) - clpos) ** 2);
        //ctx.fillRect(x, canvas.width - k, 10, 10);

        ax = (x - clpos);
        bx = k;
        cx = 50;
        var j = (Math.acos(((ax ** 2) + (cx ** 2) - (bx ** 2)) / (2 * ax * cx)));

        j += Math.PI / 2;
        var xn = 30 * Math.sin(j) + x;
        var yn = 30 * Math.cos(j) + canvas.height - k;

        if (a == 2 * Math.PI) {
            a = a - 2 * Math.PI;
        }

        //console.log(k, canvas.height - y);
        if (canvas.height - y < k) {
            //console.log(div, a, j)
            if (x > (clpos - 50) && x < clpos) {
                a = a - j * 2;
            } else if (x < (clpos + 50) && x > clpos) {
                a = a + j * 2;
            } else {
                a = Math.PI;
            }

            x = 1 * Math.sin(a) + x;
            y = 1 * Math.cos(a) + y;
        }

        ctx.strokeStyle = "gold";
        ctx.beginPath();
        ctx.moveTo(x, canvas.height - k)
        ctx.lineTo(xn, yn);
        ctx.stroke();

        //ctx.fillRect(100, 100, 200, 200)
    }
}

ctx.stroke();