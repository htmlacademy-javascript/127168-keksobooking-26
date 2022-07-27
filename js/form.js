import {pristine} from './validation.js';
import {postData} from './api.js';
import {showSuccessMessage,
  showErrorMessage} from './status-message.js';

const RESET_PRICE_VALUE = 1000;

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const priceField = adForm.querySelector('#price');
const submitButton = adForm.querySelector('.ad-form__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.style.backgroundColor = 'LightGrey';
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.style.backgroundColor = 'white';
  submitButton.textContent = 'Опубликовать';
};

const makeSuccessfulAction = () => {
  adForm.reset();
  filterForm.reset();
  unblockSubmitButton();
  showSuccessMessage();
};

const makeErrorAction = () => {
  unblockSubmitButton();
  showErrorMessage();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    const formData = new FormData(adForm);
    postData(makeSuccessfulAction, makeErrorAction, formData);
  }
});

adForm.addEventListener('reset', () => {
  pristine.reset();
  filterForm.reset();
  priceField.placeholder = RESET_PRICE_VALUE;
});
