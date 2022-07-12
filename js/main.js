import {createDescriptions} from './data.js';
import {showCard} from './element-generator.js';
import {
  setInactiveState,
  setActiveState
} from'./state-function.js';
import './validation.js';

const descriptions = createDescriptions();
showCard(descriptions[5]);

setInactiveState();
setActiveState();
