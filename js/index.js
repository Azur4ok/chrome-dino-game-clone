import { setupGround, updateGround } from './ground.js';
import { setupDino, updateDino } from './dino.js';

const worldElement = document.querySelector('.world');
const scoreElement = document.querySelector('.score');
const startScreen = document.querySelector('.start-screen');

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

setupGround();

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

let lastTime = null;
let speedScale = 0;
let score = null;

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
  updateSpeedScale(delta);
  updateScore(delta);

  lastTime = time;
  window.requestAnimationFrame(update);
};

const handleStart = () => {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupDino();
  startScreen.classList.add('hide');
  window.requestAnimationFrame(update);
};

setPixelToWorldScale();
window.addEventListener('resize', setPixelToWorldScale);
window.addEventListener('keydown', handleStart, { once: true });
