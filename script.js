const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const scoreElement = document.getElementById("score-value");
const healthBar = document.getElementById("health-bar");
const gameOverScreen = document.getElementById("game-over");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");
const shootSound = document.getElementById("shoot-sound");
const explosionSound = document.getElementById("explosion-sound");
const backgroundMusic = document.getElementById("background-music");

let playerX = window.innerWidth / 2;
const playerSpeed = 10;
let score = 0;
let health = 100;
let isGameOver = false;

const bullets = [];
const enemies = [];

let isMouseDown = false;
const bulletSpeed = 10;
const bulletCooldown = 150;
let lastBulletTime = 0;

function updatePlayerPosition(mouseX) {
  playerX += (mouseX - playerX) * 0.2;
  player.style.left = `${playerX}px`;
}

function createBullet() {
  const currentTime = Date.now();
  if (currentTime - lastBulletTime >= bulletCooldown) {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.left = `${playerX - 4}px`;
    bullet.style.bottom = "84px";
    gameContainer.appendChild(bullet);
    bullets.push(bullet);
    lastBulletTime = currentTime;
    shootSound.currentTime = 0;
    shootSound.play();
  }
}

function moveBullets() {
  bullets.forEach((bullet, index) => {
    const bulletY = Number.parseFloat(bullet.style.bottom) + bulletSpeed;
    if (bulletY > window.innerHeight) {
      gameContainer.removeChild(bullet);
      bullets.splice(index, 1);
    } else {
      bullet.style.bottom = `${bulletY}px`;
    }
  });
}

function createEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.style.left = `${Math.random() * (window.innerWidth - 64)}px`;
  enemy.style.top = "0px";
  gameContainer.appendChild(enemy);
  enemies.push(enemy);
}

function moveEnemies() {
  enemies.forEach((enemy, index) => {
    const enemyY = Number.parseFloat(enemy.style.top) + 2;
    const enemyX = parseFloat(enemy.style.left) + Math.sin(enemyY / 50) * 5; 

    if (
      enemyY > window.innerHeight 
    ) {
      gameContainer.removeChild(enemy);
      enemies.splice(index, 1); 
      decreaseHealth(10); 
    } else if (
      enemyX > window.innerWidth
    ) {
      gameContainer.removeChild(enemy);
      enemies.splice(index, 1);
    } else {
      enemy.style.top = `${enemyY}px`;
      enemy.style.left = `${enemyX}px`;
    }
  });
}

function decreaseHealth(amount) {
  health = Math.max(0, health - amount);
  healthBar.style.width = `${health}%`;
  if (health === 0) {
    gameOver();
  }
}

function explode(enemy) {
  const explosion = document.createElement("div");
  explosion.classList.add("explosion");
  explosion.style.left = enemy.style.left;
  explosion.style.top = enemy.style.top;
  gameContainer.appendChild(explosion);
  setTimeout(() => gameContainer.removeChild(explosion), 300);
}

function checkCollisions() {
  const playerRect = player.getBoundingClientRect();

  bullets.forEach((bullet, bulletIndex) => {
    const bulletRect = bullet.getBoundingClientRect();
    enemies.forEach((enemy, enemyIndex) => {
      const enemyRect = enemy.getBoundingClientRect();
      if (
        bulletRect.left < enemyRect.right &&
        bulletRect.right > enemyRect.left &&
        bulletRect.top < enemyRect.bottom &&
        bulletRect.bottom > enemyRect.top
      ) {
        gameContainer.removeChild(bullet);
        gameContainer.removeChild(enemy);
        bullets.splice(bulletIndex, 1);
        enemies.splice(enemyIndex, 1);
        score++;
        scoreElement.textContent = score;
        explosionSound.currentTime = 0;
        explosionSound.play();
      }
    });
  });

  enemies.forEach((enemy) => {
    const enemyRect = enemy.getBoundingClientRect();
    if (
      playerRect.left < enemyRect.right &&
      playerRect.right > enemyRect.left &&
      playerRect.top < enemyRect.bottom &&
      playerRect.bottom > enemyRect.top
    ) {
      gameOver();
    }
  });
}

function gameOver() {
  isGameOver = true;
  finalScoreElement.textContent = score;
  gameOverScreen.classList.remove("hidden");
}

function restartGame() {
  isGameOver = false;
  score = 0;
  health = 100;
  scoreElement.textContent = score;
  healthBar.style.width = "100%";
  gameOverScreen.classList.add("hidden");

  bullets.forEach((bullet) => gameContainer.removeChild(bullet));
  enemies.forEach((enemy) => gameContainer.removeChild(enemy));
  bullets.length = 0;
  enemies.length = 0;

  playerX = window.innerWidth / 2;
  updatePlayerPosition(playerX);
  backgroundMusic.play();

  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  if (!isGameOver) {
    if (isMouseDown) {
      createBullet();
    }
    moveBullets();
    moveEnemies();
    checkCollisions();

    if (Math.random() < 0.02) {
      createEnemy();
    }
    backgroundMusic.play();

    requestAnimationFrame(gameLoop);
  }
}

gameContainer.addEventListener("mousemove", (event) => {
  if (!isTouchDevice()) {
    updatePlayerPosition(event.clientX);
  }
});

gameContainer.addEventListener("mousedown", (event) => {
  if (!isTouchDevice()) {
    event.preventDefault();
    isMouseDown = true; 
  }
});

gameContainer.addEventListener("mouseup", () => {
  if (!isTouchDevice()) {
    isMouseDown = false;
  }
});

gameContainer.addEventListener("mouseleave", () => {
  if (!isTouchDevice()) {
    isMouseDown = false;
  }
});

gameContainer.addEventListener("contextmenu", (event) => {
  event.preventDefault(); 
});

gameContainer.addEventListener("touchmove", (event) => {
  const touchX = event.touches[0].clientX;
  updatePlayerPosition(touchX); 
});

gameContainer.addEventListener("touchstart", (event) => {
  event.preventDefault();
  isMouseDown = true; 
});

gameContainer.addEventListener("touchend", () => {
  isMouseDown = false;
});

gameContainer.addEventListener("touchcancel", () => {
  isMouseDown = false; 
});

restartButton.addEventListener("click", restartGame);
restartButton.addEventListener("touchstart", (event) => {
  event.stopPropagation(); 
  restartGame(); 
});

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}

gameLoop();
