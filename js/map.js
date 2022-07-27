import {showCard} from './element-generator.js';
// import {initFilterEventListener} from './filter.js';


const START_COORDINATES = {
  lat: 35.68485,
  lng: 139.75377,
};
const START_SCALE = 13;
// const ANOTHER_ADS = 10;

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

const initFilterEventListener = (places) => {
  const filterForm = document.querySelector('.map__filters');

  filterForm.addEventListener('change', (evt) => {
    if (evt.target.id === 'housing-type') {
      places.slice(0, 10);
      console.log(places);
    }
    if (evt.target.id === 'housing-price') {
      console.log('Стоимость аренды');
    }
    if (evt.target.id === 'housing-rooms') {
      console.log('Количество комнат');
    }
    if (evt.target.id === 'housing-guests') {
      console.log('Количество гостей');
    }
    if (evt.target.parentElement.id === 'housing-features') {
      console.log('Фишечки');
    }
  });
};

const initMapEventListeners = (map, group) => {
  mainPinMarker.on('moveend', changeAddressField);

  adForm.addEventListener('reset', resetMap(map, group));
};

const initMap = (places) => {
  const copiedPlaces = places;
  const map = L.map('map-canvas')
    .setView(START_COORDINATES, START_SCALE);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  const markerGroup = L.layerGroup().addTo(map);

  mainPinMarker.addTo(map);
  initFilterEventListener(copiedPlaces);
  setPins(copiedPlaces, markerGroup);

  initMapEventListeners(map, markerGroup);
};

export {initMap};
