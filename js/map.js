import {showCard} from './element-generator.js';
import {initMapFilters} from './filter.js';


const START_COORDINATES = {
  lat: 35.68485,
  lng: 139.75377,
};
const START_SCALE = 13;
const ANOTHER_ADS = 10;
const FIXED_COUNTER = 5;

const adForm = document.querySelector('.ad-form');
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

const onAddressFieldChange = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressField.value = `${lat.toFixed(FIXED_COUNTER)}, ${lng.toFixed(FIXED_COUNTER)}`;
};

const upgradeLayer = (group, places) => {
  group.clearLayers();
  setPins(places.slice(0, ANOTHER_ADS), group);
};

const resetMap = (map, group, places) => () => {
  mainPinMarker.setLatLng(START_COORDINATES);
  map.setView(START_COORDINATES, START_SCALE);
  group.eachLayer((layer) => {
    if (layer.isPopupOpen()) {
      layer.closePopup();
    }
  });
  upgradeLayer(group, places);
};

const initMapEventListeners = (map, group, places) => {
  mainPinMarker.on('moveend', onAddressFieldChange);
  adForm.addEventListener('reset', resetMap(map, group, places));
};

const initMap = (places) => {
  const map = L.map('map-canvas')
    .setView(START_COORDINATES, START_SCALE);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  mainPinMarker.addTo(map);

  const markerGroup = L.layerGroup().addTo(map);
  setPins(places.slice(0, ANOTHER_ADS), markerGroup);

  initMapFilters(places, markerGroup);
  initMapEventListeners(map, markerGroup, places);
};

export {initMap,
  upgradeLayer};
