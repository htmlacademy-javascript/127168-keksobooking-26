import './validation.js';
import './map.js';
import './slider.js';
import {getData} from './api.js';
import {initMap} from './map.js';
import {activateForm} from'./state-function.js';

const ANOTHER_ADS = 10;

activateForm(getData, (descriptions) => {
  initMap(descriptions.slice(0, ANOTHER_ADS));
});
