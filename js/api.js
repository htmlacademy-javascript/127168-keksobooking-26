const ADDRESS_GET = 'https://26.javascript.pages.academy/keksobooking/data';
const ADDRESS_POST = 'https://26.javascript.pages.academy/keksobooking';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(ADDRESS_GET);
    if (!response.ok) {
      throw new Error('Не удалось загрузить похожие объявления. Попробуйте позже.');
    }
    const descriptions = await response.json();
    onSuccess(descriptions);
  } catch (err) {
    // onSuccess нужен для того, чтобы запустить карту без загруженных объявлений
    onSuccess([]);
    onFail(err.message);
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
