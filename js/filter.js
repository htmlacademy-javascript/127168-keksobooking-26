import {upgradeLayer} from './map.js';

const initFilterEventListener = (places, group) => {
  let copiedPlaces = places;
  const filterForm = document.querySelector('.map__filters');

  filterForm.addEventListener('change', (evt) => {
    if (evt.target.id === 'housing-type') {
      copiedPlaces = copiedPlaces.filter((place) => {
        console.log(place);
        return place.offer.type === 'palace';
      });
      upgradeLayer(group, copiedPlaces);
    }
    if (evt.target.id === 'housing-price') {
      // new
    }
    if (evt.target.id === 'housing-rooms') {
      // new
    }
    if (evt.target.id === 'housing-guests') {
      // new
    }
    if (evt.target.parentElement.id === 'housing-features') {
      // new
    }
  });
};

export {initFilterEventListener};
