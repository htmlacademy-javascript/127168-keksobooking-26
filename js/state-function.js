const adFormBlock = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const adFormChildren = adFormBlock.children;
const mapFiltersChildren = mapFiltersElement.children;

const changeDisabledFormStatus = (elements, status) => {
  for (const element of elements) {
    element.disabled = status;
  }
};

const setInactiveState = () => {
  changeDisabledFormStatus(adFormChildren, 'disabled');
  changeDisabledFormStatus(mapFiltersChildren, 'disabled');

  adFormBlock.classList.add('ad-form--disabled');
  mapFiltersElement.classList.add('map__filters--disabled');
};

const setActiveState = () => {
  changeDisabledFormStatus(adFormChildren, '');
  changeDisabledFormStatus(mapFiltersChildren, '');

  adFormBlock.classList.remove('ad-form--disabled');
  mapFiltersElement.classList.remove('map__filters--disabled');
};

export {
  setInactiveState,
  setActiveState
};
