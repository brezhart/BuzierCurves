var colorArray = ['#FF6633', '#00B399', '#FF33FF', '#FF6600', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let sCanvas = document.getElementById("sCanvas");
let sCtx = sCanvas.getContext("2d");
let sCanvas2 = document.getElementById("sCanvas2");
let sCtx2 = sCanvas2.getContext("2d");

let w = window.innerWidth;
let h = window.innerHeight;

canvas.style.width = w + "px";
canvas.style.height = h + "px";
canvas.setAttribute("height", h);
canvas.setAttribute("width", w);

sCanvas.style.width = w + "px";
sCanvas.style.height = h + "px";
sCanvas.setAttribute("height", h);
sCanvas.setAttribute("width", w);

sCanvas2.style.width = w + "px";
sCanvas2.style.height = h + "px";
sCanvas2.setAttribute("height", h);
sCanvas2.setAttribute("width", w);
sCtx2.strokeStyle = "red";
let size = 10;
let coef = 0;

let points = [
    { x: w / 10, y: h / 10 },
    { x: w / 15, y: h / 20 },
    { x: w / 10, y: h / 1.5 },
    { x: w / 5, y: h / 13 },
    { x: w / 2.5, y: h / 1.2 },
    { x: w / 2, y: h / 30 },
    { x: w / 1.3, y: h / 5 },
    { x: w / 1.2, y: h / 2 }
]; // this is only for preview

let max = 100;
let now = 0;

function dist(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

// stopStartFunc
   let stopPlayToggler = false
   let stopStarBtn = document.getElementById("stopPlayBtn");
    stopStarBtn.onclick = function () {
        stopPlayToggler = !stopPlayToggler
    }
//

function premake(arr) {
    sCtx.clearRect(0, 0, w, h);
    ctx.clearRect(0, 0, w, h);
    sCtx2.clearRect(0, 0, w, h);
    sCtx.beginPath();
    sCtx.moveTo(arr[0].x, arr[0].y);
    sCtx.lineWidth = 10;
    sCtx.lineCap = "round";
    sCtx.strokeStyle = "#cccccc";

    for (let i = 0; i < arr.length; i++) {
        sCtx.lineTo(arr[i].x, arr[i].y);
    }
    sCtx.stroke();
    for (let i = 0; i < arr.length; i++) {
        sCtx.font = "20px Arial";
        sCtx.fillText("p" + i, arr[i].x, arr[i].y);
    }
}
premake(points);

let anim;
function make(arr, coef, num) {
    let newArr = [];
    for (let i = 0; i < arr.length - 1; i++) {
        let newPoint = {};
            newPoint.x = arr[i].x + (arr[i + 1].x - arr[i].x) / 100 * coef;
            newPoint.y = arr[i].y + (arr[i + 1].y - arr[i].y) / 100 * coef;
        newArr.push(newPoint);
    }

    if (num > colorArray.length){
        num = num - colorArray.length;
    }

    for (let i = 0; i < newArr.length - 1; i++) {
        ctx.strokeStyle = colorArray[num];

        ctx.beginPath();
        ctx.moveTo(newArr[i].x, newArr[i].y);
        ctx.lineTo(newArr[i + 1].x, newArr[i + 1].y);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(newArr[i].x, newArr[i].y, 5, 0, Math.PI * 2);
        ctx.moveTo(newArr[i + 1].x, newArr[i + 1].y);
        ctx.arc(newArr[i + 1].x, newArr[i + 1].y, 5, 0, Math.PI * 2);

        ctx.stroke();
        ctx.closePath();
    }
    if (newArr.length > 1) {
        make(newArr, coef, num + 1);
    } else {
        sCtx2.beginPath();
        sCtx2.lineWidth = 5;
        sCtx2.moveTo(lastPoint.x, lastPoint.y);
        sCtx2.lineTo(newArr[0].x, newArr[0].y);
        sCtx2.stroke();

        sCtx2.closePath();
        ctx.beginPath();
        ctx.arc(newArr[0].x, newArr[0].y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        lastPoint.x = newArr[0].x;
        lastPoint.y = newArr[0].y;
    }
}
let lastPoint = { x: points[0].x, y: points[0].y };
function loop() {
    if (stopPlayToggler) {
        ctx.clearRect(0, 0, w, h);
    }

    sCtx.lineWidth = 1;

    if (coef < 100 && stopPlayToggler) {
        coef += 0.5; //              SPEED
        make(points, coef, 0);
    } else {
        ctx.beginPath();
        ctx.arc(points[points.length - 1].x,points[points.length - 1].y,5,0,Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        anim = window.cancelAnimationFrame(loop);
    }
    anim = window.requestAnimationFrame(loop);
}
loop();
let strButton = document.getElementById("start");
function makeNew() {
    coef = 0;
    window.cancelAnimationFrame(anim);

    sCtx.clearRect(0, 0, w, h);
    ctx.clearRect(0, 0, w, h);
    sCtx2.clearRect(0, 0, w, h);
    points = [];
    sCanvas2.onclick = function() {
        points.push({ x: event.clientX, y: event.clientY });
        lastPoint = { x: points[0].x, y: points[0].y };
        premake(points);
    };
    strButton.onclick = preloop;
}
function preloop(){
    strButton.onclick = null;
    sCanvas2.onclick = null;
    loop();
}


