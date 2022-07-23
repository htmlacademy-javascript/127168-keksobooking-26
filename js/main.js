import './validation.js';
import './map.js';
import './slider.js';
import {initMap} from './map.js';
import {getData} from './api.js';
import {
  setInactiveState,
  setActiveState
} from'./state-function.js';

const ANOTHER_ADS = 10;

const showAnotherAds = async (initFunction) => {
  setInactiveState();
  await getData(initFunction);
  setActiveState();
};

showAnotherAds((descriptions) => {
  initMap(descriptions.slice(0, ANOTHER_ADS));
});
