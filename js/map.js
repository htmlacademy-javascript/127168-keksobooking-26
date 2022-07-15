import {
  setInactiveState,
  setActiveState
} from'./state-function.js';
import {createDescriptions} from './data.js';
import {showCard} from './element-generator.js';

const START_COORDINATES = {
  lat: 35.68485,
  lng: 139.75377,
};
const START_SCALE = 13;

const adForm = document.querySelector('.ad-form');
const resetButton = adForm.querySelector('.ad-form__reset');
const adressField = adForm.querySelector('#address');
const places = createDescriptions();

setInactiveState();

const map = L.map('map-canvas')
  .on('load', () => {
    setActiveState();
  })
  .setView(START_COORDINATES, START_SCALE);

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

const minorPinMarker = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  START_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

places.forEach((place) => {
  const {location: {lat, lng}} = place;
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon: minorPinMarker,
  }
  );

  marker
    .addTo(map)
    .bindPopup(showCard(place));
});

mainPinMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  const correctLat = (Math.round(lat*100000)/100000).toFixed(5);
  const correctLng = (Math.round(lng*100000)/100000).toFixed(5);

  adressField.value = `${correctLat}, ${correctLng}`;
});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng(START_COORDINATES);
  map.setView(START_COORDINATES, START_SCALE);
});
