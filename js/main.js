import './validation.js';
import './slider.js';
import {getData} from './api.js';
import {initMap} from './map.js';
import {activateForm} from'./state-function.js';
import './form.js';

const ANOTHER_ADS = 10;

activateForm(getData, (descriptions) => {
  initMap(descriptions.slice(0, ANOTHER_ADS));
});
