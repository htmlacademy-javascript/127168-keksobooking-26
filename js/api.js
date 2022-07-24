import {showAlert} from './util.js';

const mapElement = document.querySelector('.map__canvas');

const getData = async (action) => {
  let descriptions;

  try {
    const response = await fetch('https://26.javascript.pages.academy/keksobooking/data');
    if (!response.ok) {
      throw new Error('Не удалось загрузить похожие объявления. Попробуйте позже.');
    }
    descriptions = await response.json();
    action(descriptions);
  } catch (err) {
    descriptions = [];
    action(descriptions);
    showAlert(err.message, mapElement);
  }
};

const postData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://26.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: body,
      });
    if (!response.ok) {
      throw new Error('Произошла ошибка при отправке. Повторите позже.');
    }
    onSuccess();
  } catch (err) {
    onFail(err);
  }
};

export {getData, postData};
