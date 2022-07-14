import {
  setInactiveState,
  setActiveState
} from'./state-function.js';

const START_COORDINATES = {
  lat: 35.70209,
  lng: 139.54976,
};

const adForm = document.querySelector('.ad-form');
const resetButton = adForm.querySelector('.ad-form__reset');
const adressField = adForm.querySelector('#address');

setInactiveState();

const map = L.map('map-canvas')
  .on('load', () => {
    setActiveState();
  })
  .setView(START_COORDINATES, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  START_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  const correctLat = (Math.round(lat*100000)/100000).toFixed(5);
  const correctLng = (Math.round(lng*100000)/100000).toFixed(5);

  adressField.value = `${correctLat}, ${correctLng}`;
});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng(START_COORDINATES);
  map.setView(START_COORDINATES, 10);
});
