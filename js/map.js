import {showCard} from './element-generator.js';


const START_COORDINATES = {
  lat: 35.68485,
  lng: 139.75377,
};
const START_SCALE = 13;

const adForm = document.querySelector('.ad-form');
const resetButton = adForm.querySelector('.ad-form__reset');
const addressField = adForm.querySelector('#address');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const minorPinIcon = L.icon({
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

const createMinorMarker = (place, layer) => {
  const {location: {lat, lng}} = place;
  const marker = L.marker({lat, lng}, {icon: minorPinIcon});

  marker
    .addTo(layer)
    .bindPopup(showCard(place));
};

const setPins = (places, layer) => places.forEach((place) => createMinorMarker(place, layer));

const changeAddressField = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const resetMap = (map, group) => () => {
  mainPinMarker.setLatLng(START_COORDINATES);
  map.setView(START_COORDINATES, START_SCALE);
  group.eachLayer((layer) => {
    if (layer.isPopupOpen()) {
      layer.closePopup();
    }
  });
};

const initEventListeners = (map, group) => {
  mainPinMarker.on('moveend', changeAddressField);

  resetButton.addEventListener('click', resetMap(map, group));
};

const initMap = (places) => {
  const map = L.map('map-canvas')
    .setView(START_COORDINATES, START_SCALE);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  const markerGroup = L.layerGroup().addTo(map);

  mainPinMarker.addTo(map);
  setPins(places, markerGroup);

  initEventListeners(map, markerGroup);
};

export {initMap};
