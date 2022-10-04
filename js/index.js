import { setupGround, updateGround } from './ground.js';
import { setupDino, updateDino, setDinoLose, getDinoRect } from './dino.js';
import { getCactusRects, setupCactus, updateCactus } from './cactus.js';
import { WORLD_HEIGHT, WORLD_WIDTH, SPEED_SCALE_INCREASE } from './constants/index.js';

const worldElement = document.querySelector('.world');
const scoreElement = document.querySelector('.score');
const startScreen = document.querySelector('.start-screen');

let lastTime = null;
let speedScale = 0;
let score = null;

const setPixelToWorldScale = () => {
  let worldToPixelScale = null;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worldElement.style.width = `{WORD_WIDTH * worldToPixelScale}px`;
  worldElement.style.height = `{WORLD_HEIGHT * worldToPixelScale}px`;
};

const checkLose = () => {
  const dinoRect = getDinoRect();
  return getCactusRects().some((rect) => isCollision(rect, dinoRect));
};

const handleLose = () => {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener('keydown', handleStart, { once: true });
    startScreen.classList.remove('hide');
  }, 100);
};

const isCollision = (rect1, rect2) => {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
};

const updateSpeedScale = (delta) => {
  speedScale += delta * SPEED_SCALE_INCREASE;
};

const updateScore = (delta) => {
  score += delta * 0.01;
  scoreElement.textContent = Math.floor(score);
};

const update = (time) => {
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);

  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
};

const handleStart = () => {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupDino();
  setupCactus();
  startScreen.classList.add('hide');
  window.requestAnimationFrame(update);
};

window.addEventListener('resize', setPixelToWorldScale);
window.addEventListener('keydown', handleStart, { once: true });
