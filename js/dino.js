import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from './helpers/updateCustomProperty.js';
import { JUMP_SPEED, GRAVITY, DINO_FRAME_COUNT, FRAME_TIME } from './constants/index.js';

const dinoElement = document.querySelector('.dino');

let isJumping = null;
let dinoFrame = null;
let currentFrameTime = null;
let yVelocity = null;

const handleRun = (delta, speedScale) => {
  if (isJumping) {
    dinoElement.src = './imgs/dino-stationary.png';
    return null;
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoElement.src = `./imgs/dino-run-${dinoFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
};

const handleJump = (delta) => {
  if (!isJumping) return null;

  incrementCustomProperty(dinoElement, '--bottom', yVelocity * delta);

  if (getCustomProperty(dinoElement, '--bottom') <= 0) {
    setCustomProperty(dinoElement, '--bottom', 0);
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta;
};

const onJump = (event) => {
  if (event.code !== 'Space' || isJumping) return null;

  yVelocity = JUMP_SPEED;
  isJumping = true;
};

export const setupDino = () => {
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(dinoElement, '--bottom', 0);
  window.removeEventListener('keydown', onJump);
  window.addEventListener('keydown', onJump);
};

export const updateDino = (delta, speedScale) => {
  handleRun(delta, speedScale);
  handleJump(delta);
};

export const getDinoRect = () => dinoElement.getBoundingClientRect();

export const setDinoLose = () => {
  dinoElement.src = './imgs/dino-lose.png';
};
