import {pristine} from './validation.js';
import {postData} from './api.js';
import {showSuccessMessage,
  showErrorMessage} from './status-message.js';

const RESET_PRICE_VALUE = 1000;

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const priceField = adForm.querySelector('#price');

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(adForm);
    postData(
      () => {
        adForm.reset();
        filterForm.reset();
        showSuccessMessage();
      },
      () => {
        showErrorMessage();
      },
      formData);
  }
});

adForm.addEventListener('reset', () => {
  pristine.reset();
  priceField.placeholder = RESET_PRICE_VALUE;
});
