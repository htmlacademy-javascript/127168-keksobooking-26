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

const postData = async () => {

};

export {getData, postData};
