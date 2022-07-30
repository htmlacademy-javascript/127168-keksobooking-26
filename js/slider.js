import {pristine} from './validation.js';
import {debounce} from './util.js';

const RESET_PRICE_VALUE = 1000;
const DEBOUNCE_TIMEOUT = 300;
const MAX_PRICE = 100000;

const adForm = document.querySelector('.ad-form');
const priceSliderElement = adForm.querySelector('.ad-form__slider');
const priceField = adForm.querySelector('#price');

priceField.value = RESET_PRICE_VALUE;

noUiSlider.create(priceSliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE,
  },
  start: RESET_PRICE_VALUE,
  step: 1,
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

priceField.addEventListener('input', debounce(() => {
  if (priceField.value <= MAX_PRICE) {
    priceSliderElement.noUiSlider.set(priceField.value);
  }
}, DEBOUNCE_TIMEOUT));

adForm.addEventListener('reset', () => {
  priceSliderElement.noUiSlider.set(RESET_PRICE_VALUE);
});
