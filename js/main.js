import './validation.js';
import './map.js';
import './slider.js';
import {createDescriptions} from './data.js';
import {initMap} from './map.js';

const data = createDescriptions();
initMap(data);
