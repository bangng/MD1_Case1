let canvas = document.getElementById('myCanvas1');
let ctx = canvas.getContext('2d');
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 3; // dòng
let brickColumnCount = 5; // hàng
let brickWidth = 75;  // chiều rộng
let brickHeight = 20; // chiều ddài
let brickPadding = 10; // khoảng cách giữa các ô
let brickOffsetTop = 20;
let brickOffsetLeft = 20;
let bricks = [];
let score = 0;
let lives = 100000;


for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickRowCount; j++) {
        bricks[i][j] = {x: 0, y: 0, status: 1}
    }
}


let position = {
    m:Math.floor(Math.random()*5),
    n:Math.floor(Math.random()*3),
}

function collistionDetection() {    // phát hiện va chạm
    for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0;j < brickRowCount; j++) {
            let b = bricks[i][j];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0
                    score++
                    if (score === brickColumnCount * brickRowCount) {
                        alert('You Win !!! Your score is ' + (score + lives));
                        document.location.reload()
                    }
                }
            }


        }
    }
}

function drawBricks() { // vẽ khối

    for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            if (bricks[i][j].status === 1) {
                let bricksX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                let bricksY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[i][j].x = bricksX;
                bricks[i][j].y = bricksY;

                ctx.beginPath();
                ctx.rect(bricksX, bricksY, brickWidth, brickHeight);
                ctx.fillStyle = 'red';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function drawBall() { // vẽ bóng!!!

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;

}

document.addEventListener('keydown', keyDownHandler, false); // sự kiện phím
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);// sự kiện chuột

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}


// kích hoạt chuột!!!!
// function mouseMoveHandler(e) {
//     let relativeX = e.clientX - canvas.offsetLeft;
//     if (relativeX > 0 && relativeX < canvas.width) {
//         paddleX = relativeX - paddleWidth / 2;
//     }
//
// }

function drawPaddle() { // ván đẩy
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}


function drawLives() { // số lần chơi!!!
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Lives:' + lives, canvas.width - 65, 20);

}





function drawScore() {  // thiết lập điểm!!!!
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score:' + score, 8, 20);

}



function draw() { //

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    drawBricks()
    drawPaddle()
    drawScore()
    drawLives()
    collistionDetection()
    if (y + dy < ballRadius) {
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            if (y -= paddleHeight) {
                dy = -dy
            }
        } else {
            lives--;
            if (lives === 0) {
                window.location.reload();
                alert('Game Over !!! ' + 'Your score is ' + score);
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }


        }

    }
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
    }

    requestAnimationFrame(draw);
}
draw();
