import {upgradeLayer} from './map.js';

const getPlacesByType = (places, evt) => places.filter(({offer: {type}}) => {
  if (evt.target.value === 'any') {
    return true;
  }
  return type === evt.target.value;
});

const initFilterEventListener = (places, group) => {
  const filterForm = document.querySelector('.map__filters');

  let changeablePlaces = places.slice();

  filterForm.addEventListener('change', (evt) => {
    if (evt.target.id === 'housing-type') {
      changeablePlaces = getPlacesByType(places, evt);
      upgradeLayer(group, changeablePlaces);
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
