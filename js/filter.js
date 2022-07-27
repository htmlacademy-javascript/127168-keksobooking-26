import {upgradeLayer} from './map.js';

const ANOTHER_ADS = 10;


const filterForm = document.querySelector('.map__filters');
const typeElement = filterForm.querySelector('#housing-type');
const priceElement = filterForm.querySelector('#housing-price');
const roomElement = filterForm.querySelector('#housing-rooms ');

const filterType = (place) => {
  if (typeElement.value === place.offer.type || typeElement.value === 'any') {
    return true;
  }
};

const filterPrice = (place) => {
  if (priceElement.value === 'low' && place.offer.price < 10000) {
    return true;
  }
  if (priceElement.value === 'middle' && place.offer.price >= 10000 && place.offer.price <= 50000) {
    return true;
  }
  if (priceElement.value === 'high' && place.offer.price >= 50000) {
    return true;
  }
  if (priceElement.value === 'any') {
    return true;
  }
};

const filterRooms = (place) => {
  if (+roomElement.value === place.offer.rooms) {
    return true;
  }
  if (roomElement.value === 'any') {
    return true;
  }
};

const getFilterPlaces = (places) => {
  const filteredPlaces = [];
  for (const place of places) {
    // const isFiltered = filterType(offer) && filterPrice(offer) && filterRooms(offer) && filterGuests(offer) && filterFeatures(offer);
    const isFiltered = filterType(place) && filterPrice(place) && filterRooms(place);
    if (isFiltered) {
      filteredPlaces.push(place);
    }

    if (filteredPlaces.length >= ANOTHER_ADS) {
      break;
    }
  }

  return filteredPlaces;
};

const initMapFilters = (places, group) => {
  filterForm.addEventListener('change', () => {
    const filteredPlaces = getFilterPlaces(places);
    upgradeLayer(group, filteredPlaces);
  });
};

export {initMapFilters};
