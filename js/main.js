import './validation.js';
import './slider.js';
import {getData} from './api.js';
import {initMap} from './map.js';
import {showAlertMessage} from './status-message.js';
import {setInactiveState, setActiveState} from'./state-function.js';
import './form.js';


setInactiveState();

const makeSuccessfulAction = (descriptions) => {
  initMap(descriptions);
  setActiveState();
};

getData(makeSuccessfulAction, showAlertMessage);
