import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from './helpers/updateCustomProperty.js';
import { SPEED } from './constants/index.js';

const groundElems = document.querySelectorAll('.ground');

export const setupGround = () => {
  setCustomProperty(groundElems[0], '--left', 0);
  setCustomProperty(groundElems[1], '--left', 300);
};

export const updateGround = (delta, speedScale) => {
  groundElems.forEach((ground) => {
    incrementCustomProperty(ground, '--left', delta * SPEED * speedScale * -1);

    if (getCustomProperty(ground, '--left') <= -300) incrementCustomProperty(ground, '--left', 600);
  });
};
