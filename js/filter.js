import {upgradeLayer} from './map.js';

const ANOTHER_ADS = 10;

const filterForm = document.querySelector('.map__filters');

const getFilterPlaces = (offers) => {
  const filteredPlaces = [];
  for (const offer of offers) {
    const isFiltered = filterType(offer) && filterPrice(offer) && filterRooms(offer) && filterGuests(offer) && filterFeatures(offer);
    if (isFiltered) {
      filteredPlaces.push(offer);
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
