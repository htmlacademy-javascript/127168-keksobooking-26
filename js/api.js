import {showAlertMessage} from './status-message.js';

const ADDRESS_GET = 'https://26.javascript.pages.academy/keksobooking/data';
const ADDRESS_POST = 'https://26.javascript.pages.academy/keksobooking';

const getData = async (action) => {
  let descriptions;

  try {
    const response = await fetch(ADDRESS_GET);
    if (!response.ok) {
      throw new Error('Не удалось загрузить похожие объявления. Попробуйте позже.');
    }
    descriptions = await response.json();
    action(descriptions);
  } catch (err) {
    descriptions = [];
    action(descriptions);
    showAlertMessage(err.message);
  }
};

const postData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      ADDRESS_POST,
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
