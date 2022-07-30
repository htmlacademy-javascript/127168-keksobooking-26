import {upgradeLayer} from './map.js';
import {debounce} from './util.js';

const LOW_PRICE_FILTER_VALUE = 'low';
const LOW_OFFER_PRICE = 10000;
const MIDDLE_PRICE_FILTER_VALUE = 'middle';
const HIGH_PRICE_FILTER_VALUE = 'high';
const HIGH_OFFER_PRICE = 10000;
const ANY_VALUE = 'any';
const ANOTHER_ADS = 10;


const filterForm = document.querySelector('.map__filters');
const typeElement = filterForm.querySelector('#housing-type');
const priceElement = filterForm.querySelector('#housing-price');
const roomElement = filterForm.querySelector('#housing-rooms');
const guestsElement = filterForm.querySelector('#housing-guests');
const featureElements = Array.from(filterForm.querySelectorAll('.map__checkbox'));


const filterType = (place) => {
  if (typeElement.value === place.offer.type || typeElement.value === ANY_VALUE) {
    return true;
  }
};

const filterPrice = (place) => {
  if (priceElement.value === LOW_PRICE_FILTER_VALUE && place.offer.price < LOW_OFFER_PRICE) {
    return true;
  }
  if (priceElement.value === MIDDLE_PRICE_FILTER_VALUE && place.offer.price >= LOW_OFFER_PRICE && place.offer.price <= HIGH_OFFER_PRICE) {
    return true;
  }
  if (priceElement.value === HIGH_PRICE_FILTER_VALUE && place.offer.price >= HIGH_OFFER_PRICE) {
    return true;
  }
  if (priceElement.value === ANY_VALUE) {
    return true;
  }
};

const filterRooms = (place) => {
  if (+roomElement.value === place.offer.rooms) {
    return true;
  }
  if (roomElement.value === ANY_VALUE) {
    return true;
  }
};

const filterGuests = (place) => {
  if (place.offer.guests < 1) {
    return true;
  }
  if (+guestsElement.value === place.offer.guests) {
    return true;
  }
  if (guestsElement.value === ANY_VALUE) {
    return true;
  }
};

const filterFeatures = (place) => featureElements.every((element) => {
  if (element.checked) {
    return place.offer.features && place.offer.features.some((value) => value === element.value);
  }
  return true;
});

const getFilterPlaces = (places) => {
  const filteredPlaces = [];
  for (const place of places) {
    const isFiltered = filterType(place) &&
      filterPrice(place) &&
      filterRooms(place) &&
      filterGuests(place) &&
      filterFeatures(place);
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
  filterForm.addEventListener('change', debounce(() => {
    const filteredPlaces = getFilterPlaces(places);
    upgradeLayer(group, filteredPlaces);
  }));
};

export {initMapFilters};
