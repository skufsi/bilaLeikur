var canvas = document.getElementById("gameBoard");
var ctx = canvas.getContext("2d");

// 2 bila
// 1 tre
// 1 stein

// interval hindranir oftar

// skipta leikbord i 4 dalka
// row1A row1B
// row2A row2B
// row3A row3B
// row4A row4B


// function sem gerir hindranir a 4-6 mogulegum dalkum


var running = false; // til ad stoppa og starta game state
var vegaLinuGeymsla = [];
var obstacleGeymsla = [];

var hindrunX = Math.random() * 600;

if (hindrunX <= 100) {

}

var dx = 5;
var dy = 5;
var yVegLina = 20;
var xVegLina = 294;
var gamePoints = 0;


// playerMain
const playerImg = new Image();
playerImg.src = '/assets/player/playerMain.png'

// player turn left
const playerLeft = new Image();
playerLeft.src = '/assets/player/playerTurnL.png'

// player turn right
const playerRight = new Image();
playerRight.src = '/assets/player/playerTurnR.png'

let player = {
    x: 280,
    y: 680,
    width: 110,
    height: 110
}

// --- obstacles ---
const skySources = ["sky_1.png", "sky_2.png", "sky_3.png", "sky_4.png", "sky_5.png"];
const groundSources = ["ground_1.png", "ground_2.png", "ground_3.png", "ground_4.png", "ground_5.png"];

// Fall sem býr til lista af myndum út frá skránöfnum
function loadImages(sources) {
    return sources.map(src => {
        const img = new Image();
        img.src = `assets/bg/${src}`;
        return img;
    });
}


/* class row1A {
    constructor(img, x, y, w, h,) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    tree()
} */

//teikna leikmann
//ctx.drawImage(playerImg, player.x, player.y, player.width, player.height)
//ctx.fillStyle = player.color
//ctx.fillRect(player.x, player.y, player.width, player.height);

//Klasi sem við réttum ctx og yhnitið á veglínunni
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

    for (let j = 0; j < 5; j++) {
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
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height)
    //ctx.fillStyle = player.color
    //ctx.fillRect(player.x, player.y, player.width, player.height);

    //veglinur nidur
    yVegLina += dy / 4;
    pointDisplay();
}

//Búum til 11 línur til að byrja og fyllum fylkið
//Notum síðan þessar línu í draw() þar sem þær ferðast niður
for (let i = 0; i < 11; i++) {
    vegaLinuGeymsla.push(new vegaLinuKlassi(ctx, i * 80));
}

// -- keyboard controls --
document.addEventListener("keyup", keyUpHandler, false);
function keyUpHandler(e) {
    if (e.keyCode == null) {
        playerImg.src = '/assets/player/playerMain.png';
    }
    /* else if ('keyup') {
        playerImg = playerImg;
    } */
}

document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        player.x += dx + 20; //right
        if (player.x > 530) {
            player.x = 560;
            playerImg.src = '/assets/player/playerTurnR';
        }
    }
    if (e.keyCode == 37) {
        player.x -= dx + 20;
        if (player.x < 0) {
            player.x = 0;
            playerImg.src = '/assets/player/playerTurnL';
        }
    }
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
    obstacleGeymsla = [];
    dy = 5;
    generateObstacles();
    gamePoints = 0;
    closeGameOver();
    running = true;
    animate();
}

document.getElementById("stop").addEventListener("click", stopGame)

function stopGame() {
    running = false;
    openGameOver();
}

// Hindranir
function generateObstacles() {
    for (let i = 0; i < 5; i++) {
        dy += 0.05;
        gamePoints += 1;
        createObstacle()
    }
}
for (let i = 0; i < 5; i++) {
    createObstacle()
}
function createObstacle() {
    let xLocation = Math.random(canvas.width - 60) * 600;
    let yLocation = -200;
    let xSize = 80;
    let ySize = 80;
    var hindrun = new obstacle(ctx, xLocation, yLocation, xSize, ySize, "blue");
    obstacleGeymsla.push(hindrun);
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