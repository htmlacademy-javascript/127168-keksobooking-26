import {pristine} from './validation.js';

const adForm = document.querySelector('.ad-form');
const priceSliderElement = adForm.querySelector('.ad-form__slider');
const priceField = adForm.querySelector('#price');

priceField.value = 1000;

noUiSlider.create(priceSliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

priceSliderElement.noUiSlider.on('update', () => {
  priceField.value = priceSliderElement.noUiSlider.get();
  pristine.validate(priceField);
});

