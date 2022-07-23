import {pristine} from './validation.js';
import {postData} from './api.js';

const adForm = document.querySelector('.ad-form');

adForm.addEventListener ('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(adForm);
    postData(
      () => {},
      () => {},
      formData);
  }
});

