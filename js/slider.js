import {pristine} from './validation.js';

const RESET_PRICE_VALUE = 1000;

const adForm = document.querySelector('.ad-form');
const priceSliderElement = adForm.querySelector('.ad-form__slider');
const priceField = adForm.querySelector('#price');

priceField.value = RESET_PRICE_VALUE;

noUiSlider.create(priceSliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: RESET_PRICE_VALUE,
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

adForm.addEventListener('reset', () => {
  priceSliderElement.noUiSlider.set(RESET_PRICE_VALUE);
});
