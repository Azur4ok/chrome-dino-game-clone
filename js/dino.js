import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from './helpers/updateCustomProperty.js';

const dinoElement = document.querySelector('.dino');

const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping = null;
let dinoFrame = null;
let currentFrameTime = null;
let yVelocity = null;

const handleRun = (delta, speedScale) => {
  if (isJumping) {
    dinoElement.src = '../imgs/dino-stationary.png';
    return null;
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoElement.src = `../imgs/dino-run-${dinoFrame}.png`;
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
  yVelocity = 0
  setCustomProperty(dinoElement, '--bottom', 0);
  window.removeEventListener('keydown', onJump);
  window.addEventListener('keydown', onJump);
};

export const updateDino = (delta, speedScale) => {
  handleRun(delta, speedScale);
  handleJump(delta);
};
