const adFormBlock = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const adFormChildren = adFormBlock.children;
const mapFiltersChildren = mapFiltersElement.children;

const changeDisabledFormStatus = (elements, status) => {
  for (const element of elements) {
    element.disabled = status;
  }
};

const toggleClasses = () => {
  adFormBlock.classList.toggle('ad-form--disabled');
  mapFiltersElement.classList.toggle('map__filters--disabled');
};

const setInactiveState = () => {
  changeDisabledFormStatus(adFormChildren, 'disabled');
  changeDisabledFormStatus(mapFiltersChildren, 'disabled');
  toggleClasses();
};

const setActiveState = () => {
  changeDisabledFormStatus(adFormChildren, '');
  changeDisabledFormStatus(mapFiltersChildren, '');
  toggleClasses();
};

export {setInactiveState, setActiveState};
