import { SPEED, CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX } from './constants/index.js';
import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from './helpers/updateCustomProperty.js';
import { randomNumberBetween } from './helpers/randomNumberBetween.js';

const worldElement = document.querySelector('.world');

let nextCactusTime = null;

export const setupCactus = () => {
  nextCactusTime = CACTUS_INTERVAL_MIN;
  document.querySelectorAll('.cactus').forEach((cactus) => {
    cactus.remove();
  });
};

export const updateCactus = (delta, speedScale) => {
  document.querySelectorAll('.cactus').forEach((cactus) => {
    incrementCustomProperty(cactus, '--left', delta * speedScale * SPEED * -1);

    if (getCustomProperty(cactus, '--left') <= -100) {
      cactus.remove();
    }
  });

  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale;
  }
  nextCactusTime -= delta;
};

export const getCactusRects = () => {
  return [...document.querySelectorAll('.cactus')].map((cactus) => cactus.getBoundingClientRect());
};

const createCactus = () => {
  const cactus = document.createElement('img');
  cactus.src = './imgs/cactus.png';
  cactus.classList.add('cactus');
  setCustomProperty(cactus, '--left', 100);
  worldElement.append(cactus);
};
