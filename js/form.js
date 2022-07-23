import {pristine} from './validation.js';
import {postData} from './api.js';

const RESET_PRICE_VALUE = 1000;

const adForm = document.querySelector('.ad-form');
const priceField = adForm.querySelector('#price');

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(adForm);
    postData(
      () => {},
      () => {},
      formData);
  }
});

adForm.addEventListener('reset', () => {
  pristine.reset();
  priceField.placeholder = RESET_PRICE_VALUE;
});
