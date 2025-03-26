var canvas = document.getElementById("gameBoard");
var ctx = canvas.getContext("2d");

var running = false; // til ad stoppa og starta game state
var vegaLinuGeymsla = [];
var obstacleGeymsla = [];

// var x = 280;
// var y = 720;
var dx = 5;
var dy = 5;
var yVegLina = 20;
var xVegLina = 294;
var gamePoints = 0;

let player = {
    color: "red",
    x: 280,
    y: 720,
    width: 40,
    height: 70
}

//Klasi sem við réttum ctx og yhnitið á línunni
class vegaLinuKlassi {
    constructor(ctx, yHnit) {
        this.ctx = ctx;
        this.yHnit = yHnit;
    }
    //Notum ctx og hnitið til að teikna línuna
    drawVegLina() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(294, this.yHnit, 12, 35)
        this.yHnit += dy / 2;
    }
}

class obstacle {
    constructor(ctx, xLocation, yLocation, xSize, ySize, color) {
        this.ctx = ctx;
        this.xLocation = xLocation;
        this.yLocation = yLocation;
        this.xSize = xSize;
        this.ySize = ySize;
        this.color = color;
    }
    drawObstacle() {
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.xLocation, this.yLocation, this.xSize, this.ySize)
        this.yLocation += dy / 2;
    }
}
function pointDisplay() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(gamePoints, 50, 50);
}

function collision(obj1, obj2) {
    if (obj1.x + obj1.width > obj2.xLocation && obj1.x <= obj2.xLocation + obj2.xSize) {
        if (obj1.y + obj1.height > obj2.yLocation && obj1.y <= obj2.yLocation + obj2.ySize) {
            return true;
        }
    }
    return false;
}
function draw() {
    //gras
    ctx.beginPath();
    ctx.fillStyle = "#40b84e";
    ctx.fillRect(0, 0, 800, 800);
    ctx.fillRect(0, 0, 800, 800);
    ctx.closePath();

    //vegur
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(150, 0, 300, 800);
    ctx.closePath();

    //veg linur
    for (let i = 0; i < vegaLinuGeymsla.length; i++) {
        vegaLinuGeymsla[i].drawVegLina();
        //Gáir hvort línan sé komin af canvasinum
        if (vegaLinuGeymsla[i].yHnit > canvas.height) {
            //Lét línuna byrja 2x ofar og þá hvarf skrítna bilið!!!
            vegaLinuGeymsla[i].yHnit = -70;
        }
    }

    for (let j = 0; j < 10; j++) {
        obstacleGeymsla[j].drawObstacle();
        if (obstacleGeymsla[j].yLocation > canvas.height + 100) {
            obstacleGeymsla = [];
            generateObstacles();
        }
    }

    for (let k = 0; k < obstacleGeymsla.length; k++) {
        // athugum hvort óvinur rakst á hetju
        if (collision(player, obstacleGeymsla[k])) {
            stopGame();
        }
    }

    //teikna leikmann
    ctx.fillStyle = player.color
    ctx.fillRect(player.x, player.y, player.width, player.height);

    //veglinur nidur
    yVegLina += dy / 4;
    pointDisplay();
}

//Búum til 11 línur til að byrja og fyllum fylkið
//Notum síðan þessar línu í draw() þar sem þær ferðast niður
for (let i = 0; i < 11; i++) {
    vegaLinuGeymsla.push(new vegaLinuKlassi(ctx, i * 80));
}


//document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        player.x += dx + 20;
        if (player.x > 530) {
            player.x = 560;
        }
    }
    if (e.keyCode == 37) {
        player.x -= dx + 20;
        if (player.x < 0) {
            player.x = 0;
        }
    }
}
document.addEventListener("keypress", function (e) {
    if (e.keycode === "Escape") {
        running = false;
    }
})



function generateObstacles() {
    for (let i = 0; i < 10; i++) {
        dy += 0.1;
        gamePoints += 1;
        createObstacle()
    }
}
for (let i = 0; i < 10; i++) {
    createObstacle()
}
function createObstacle() {
    let xLocation = Math.random() * 500;
    let yLocation = -200;
    let xSize = Math.random() * 100;
    let ySize = Math.random() * 200;
    var hindrun = new obstacle(ctx, xLocation, yLocation, xSize, ySize, "blue");
    obstacleGeymsla.push(hindrun);
}

//Smá skemmtilegt bug með start takkann, prófaðu að smella oft á hann
//Sé ekki fyrir mér að hafa start og stop svona en fínt tímabundið
//Tengjum startGame() og stopGame() við menuið

function startGame() {
    closeMenu();

    running = true;
    animate();
}
function playAgain() {

    reset.hindrun;
    running = true;
    animate();
}

document.getElementById("stop").addEventListener("click", stopGame)

function stopGame() {
    running = false;
    openGameOver();
}

//menu popup
function openMenu() {
    document.getElementById("menu-form").style.display = "block";
}

function closeMenu() {
    document.getElementById("menu-form").style.display = "none";
}

function openGameOver() {
    document.getElementById("gameOver-form").style.display = "block";
}

function closeGameOver() {
    document.getElementById("gameOver-form").style.display = "none";
}


// animation loop
function animate() {
    //Ef running er false þá skilar animate() engu og stoppar
    if (running == false) return;
    draw();
    requestAnimationFrame(animate);

}

// start game loop
animate()