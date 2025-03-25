// Get the canvas element
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Define the game variables
let batmanX = 100;
let batmanY = 100;
let jokerX = 300;
let jokerY = 300;
let score = 0;

// Draw the game elements
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.fillRect(batmanX, batmanY, 20, 20); // Batman
  ctx.fillStyle = '#f00';
  ctx.fillRect(jokerX, jokerY, 20, 20); // Joker
  ctx.font = '24px Arial';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Score: ${score}`, 10, 10);
}

// Update the game state
function update() {
  // Move Batman
  if (keysDown['ArrowUp']) {
    batmanY -= 5;
  }
  if (keysDown['ArrowDown']) {
    batmanY += 5;
  }
  if (keysDown['ArrowLeft']) {
    batmanX -= 5;
  }
  if (keysDown['ArrowRight']) {
    batmanX += 5;
  }

  // Check collision with Joker
  if (checkCollision(batmanX, batmanY, jokerX, jokerY)) {
    score++;
    jokerX = Math.random() * (canvas.width - 20);
    jokerY = Math.random() * (canvas.height - 20);
  }
}

// Check collision between two rectangles
function checkCollision(x1, y1, x2, y2) {
  if (x1 + 20 > x2 && x1 < x2 + 20 && y1 + 20 > y2 && y1 < y2 + 20) {
    return true;
  }
  return false;
}

// Handle keyboard input
const keysDown = {};
document.addEventListener('keydown', (e) => {
  keysDown[e.key] = true;
});
document.addEventListener('keyup', (e) => {
  keysDown[e.key] = false;
});

// Main game loop
setInterval(() => {
  update();
  draw();
}, 1000 / 60);