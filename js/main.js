import './validation.js';
import './slider.js';
import {getData} from './api.js';
import {initMap} from './map.js';
import {showAlertMessage} from './status-message.js';
import {setInactiveState, setActiveState} from'./state-function.js';
import './form.js';

const ANOTHER_ADS = 10;

setInactiveState();

const makeSuccessfulAction = (descriptions) => {
  initMap(descriptions.slice(0, ANOTHER_ADS));
  setActiveState();
};

getData(makeSuccessfulAction, showAlertMessage);
