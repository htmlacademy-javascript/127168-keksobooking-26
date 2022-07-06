const adFormBlock = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const adFormChildren = adFormBlock.children;
const mapFiltersChildren = mapFiltersElement.children;

const setInactiveState = () => {
  for (const child of adFormChildren) {
    child.disabled = 'disabled';
  }

  for (const child of mapFiltersChildren) {
    child.disabled = 'disabled';
  }

  adFormBlock.classList.add('ad-form--disabled');
  mapFiltersElement.classList.add('map__filters--disabled');
};

const setActiveState = () => {
  for (const child of adFormChildren) {
    child.disabled = '';
  }

  for (const child of mapFiltersChildren) {
    child.disabled = '';
  }

  adFormBlock.classList.remove('ad-form--disabled');
  mapFiltersElement.classList.remove('map__filters--disabled');
};

export {
  setInactiveState,
  setActiveState
};
