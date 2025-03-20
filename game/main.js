var canvas = document.getElementById("gameBoard");
var ctx = canvas.getContext("2d");

var x = 280;  // player x value
var y = 720;  // player y value
var dx = 15;   // player speed
var dy = 8;   // road speed

// x road line start
var xRoad = 294;

// y road line start
var yRoad1 = 0;
var yRoad2 = 80;
var yRoad3 = 160;
var yRoad4 = 240;
var yRoad5 = 320;
var yRoad6 = 400;
var yRoad7 = 480;
var yRoad8 = 560;
var yRoad9 = 640;
var yRoad10 = 720;
var yRoad11 = 800;

// obstacle start
var x1 = 50, y1 = 30;
var x2 = 250, y2 = 30;
var x3 = 400, y3 = 30;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw gras
    ctx.beginPath();
    ctx.fillStyle = "#40b84e";
    ctx.fillRect(0, 0, 800, 800);  // Draw grass
    ctx.closePath();

    // draw road
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(150, 0, 300, 800);  // Draw road
    ctx.closePath();

    // draw road lines
    ctx.fillStyle = "white";
    ctx.fillRect(xRoad, yRoad1, 12, 35);
    ctx.fillRect(xRoad, yRoad2, 12, 35);
    ctx.fillRect(xRoad, yRoad3, 12, 35);
    ctx.fillRect(xRoad, yRoad4, 12, 35);
    ctx.fillRect(xRoad, yRoad5, 12, 35);
    ctx.fillRect(xRoad, yRoad6, 12, 35);
    ctx.fillRect(xRoad, yRoad7, 12, 35);
    ctx.fillRect(xRoad, yRoad8, 12, 35);
    ctx.fillRect(xRoad, yRoad9, 12, 35);
    ctx.fillRect(xRoad, yRoad10, 12, 35);
    ctx.fillRect(xRoad, yRoad11, 12, 35);

    // move road line down
    yRoad1 += dy / 2;
    yRoad2 += dy / 2;
    yRoad3 += dy / 2;
    yRoad4 += dy / 2;
    yRoad5 += dy / 2;
    yRoad6 += dy / 2;
    yRoad7 += dy / 2;
    yRoad8 += dy / 2;
    yRoad9 += dy / 2;
    yRoad10 += dy / 2;
    yRoad11 += dy / 2;

    // reset road lines when off game board
    if (yRoad1 > canvas.height) yRoad1 = -35;
    if (yRoad2 > canvas.height) yRoad2 = -35;
    if (yRoad3 > canvas.height) yRoad3 = -35;
    if (yRoad4 > canvas.height) yRoad4 = -35;
    if (yRoad5 > canvas.height) yRoad5 = -35;
    if (yRoad6 > canvas.height) yRoad6 = -35;
    if (yRoad7 > canvas.height) yRoad7 = -35;
    if (yRoad8 > canvas.height) yRoad8 = -35;
    if (yRoad9 > canvas.height) yRoad9 = -35;
    if (yRoad10 > canvas.height) yRoad10 = -35;
    if (yRoad10 > canvas.height) yRoad10 = -35;

    // draw player
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, 40, 70);
    ctx.closePath();

    // draw obstacles
    ctx.fillStyle = "blue";
    ctx.fillRect(x1, y1, 20, 20);
    ctx.fillRect(x2, y2, 20, 20);
    ctx.fillRect(x3, y3, 20, 20);

    // obstacles down
    y1 += dy / 2;
    y2 += dy / 2;
    y3 += dy / 2;

    // reset obstacles when off game board
    if (y1 > canvas.height) y1 = 0;
    if (y2 > canvas.height) y2 = 0;
    if (y3 > canvas.height) y3 = 0;
}

// animation loop
function animate() {
    draw();
    requestAnimationFrame(animate);
}

// start game loop
animate();

// player movement
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        x += dx + 20;
    } else if (e.keyCode == 37) {
        x -= dx + 20;
    }
}