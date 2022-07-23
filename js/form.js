import {pristine} from './validation.js';

const adForm = document.querySelector('.ad-form');

adForm.addEventListener ('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    adForm.submit();
  }
});

console.log(adForm);
