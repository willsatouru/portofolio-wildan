const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;

let snake;
let fruit;
let score;
let speed;
let gameOver;

(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    score = 0;
    speed = 100;
    gameOver = false;
    document.addEventListener('keydown', e => {
        if (gameOver) return;
        switch (e.key) {
            case 'ArrowUp':
                snake.changeDirection(0, -1);
                break;
            case 'ArrowDown':
                snake.changeDirection(0, 1);
                break;
            case 'ArrowLeft':
                snake.changeDirection(-1, 0);
                break;
            case 'ArrowRight':
                snake.changeDirection(1, 0);
                break;
        }
    });
    requestAnimationFrame(gameLoop);
})();

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 4, canvas.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, canvas.width / 3, canvas.height / 2 + 40);
        return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();
    snake.draw();
    fruit.draw();
    checkCollision();
    drawScore();
    
    setTimeout(() => requestAnimationFrame(gameLoop), speed);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function checkCollision() {
    const head = snake.getHead();
    if (head.x === fruit.x && head.y === fruit.y) {
        snake.grow();
        fruit.randomize();
        score++;
        if (speed > 50) {
            speed -= 5; // Increase speed every time the snake eats a fruit
        }
    }
    // Check collision with walls
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        gameOver = true;
    }
    // Check collision with itself
    for (let i = 1; i < snake.body.length; i++) {
        if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
            gameOver = true;
        }
    }
}

class Snake {
    constructor() {
        this.body = [{ x: 10, y: 10 }];
        this.direction = { x: 0, y: 0 };
        this.growAmount = 0;
    }

    getHead() {
        return this.body[0];
    }

    changeDirection(x, y) {
        if (x === -this.direction.x || y === -this.direction.y) return;
        this.direction = { x, y };
    }

    grow() {
        this.growAmount++;
    }

    update() {
        const head = { x: this.getHead().x + this.direction.x, y: this.getHead().y + this.direction.y };
        this.body.unshift(head);

        if (this.growAmount > 0) {
            this.growAmount--;
        } else {
            this.body.pop();
        }
    }

    draw() {
        ctx.fillStyle = 'lime';
        for (const segment of this.body) {
            ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
        }
    }
}

class Fruit {
    constructor() {
        this.randomize();
    }

    randomize() {
        this.x = Math.floor(Math.random() * cols);
        this.y = Math.floor(Math.random() * rows);
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
    }
}