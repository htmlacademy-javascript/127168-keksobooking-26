import {getRandomIntFromInterval,
  getRandomFloatFromInterval,
  getRandomArrayElement,
  getRandomElements,
  correctCounter} from './util.js';

const TYPES_OF_REAL_ESTATE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const TITLES = [
  'Квартира с новым ремонтом',
  'Просторные аппартаменты для тихой семьи',
  'Уютный жилой комплекс с развитой инфрастуктурой',
  'Квартира в новом доме',
  'Просторный пентхаус для компании',
  'Квартира с тёплыми полами',
  'Жилое помещение с современным ремонтом',
  'Стильный лофт',
  'Домик рядом с парком'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const RENT_DESCRIPTIONS  = [
  'Сдаю 2-х ком.квартиру на Западном около Городской больницы 20.Квартира после ремонта,уютная, чистая, светлая Ест все необходимое для комфортного проживания.',
  'Чистая, светлая двухкомнатная квартира. В квартире имеется всё для комфортного проживания. Собственник рассматривает в качестве арендатора семейную пару с одним ребёнком или двоих платежеспособных человек.',
  'Cдаю квартиру посуточно в самом центре в новом доме с новой мебелью и техникой! В одной комнате диван и двух спальная кровать, в другой кожаный диван полотенце и постельное.',
  'Сдаю свою квартиру без посредников на длительный срок! Фото все реальные, новый дом, сделан хороший ремонт, сантехника вся новая, в доме магазины, рядом остановка транспорта.',
  'Сдает сам собственник. Квартирка находится прямо напротив взрослой Областной больницы. Рядом с остановками. В 5 ти минутах Находятся Гипермаркеты.',
  'Сдам посуточно квартиры сo всеми удoбствами. Кабeльнoe ТV, Wi-Fi, постельное бeльё, пoлотенца. В шаговой доступности находятся Областная Больница, «Тц Таллер», Школа Полиции, «Золотой Вавилон»',
  'Квартира в отличном состоянии, с ремонтом. Полностью укомплектована мебелью и бытовой техникой. Кондиционер, микроволновая печь, ТВ плазма. Балкона нет.'
];

const SIMILAR_DESCRIPTION_COUNT = 10;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;


const createDescription = (id) => {
  const lat = getRandomFloatFromInterval (MIN_LAT, MAX_LAT);
  const lng = getRandomFloatFromInterval (MIN_LNG, MAX_LNG);

  return {
    author: {
      avatar: `img/avatars/user${correctCounter(id)}.png`,
    },

    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${lat}, ${lng}`,
      price: +`${getRandomIntFromInterval(5, 25)}00`,
      type: getRandomArrayElement(TYPES_OF_REAL_ESTATE),
      rooms: getRandomIntFromInterval(1, 3),
      guests: getRandomIntFromInterval(1, 4),
      checkin: `${getRandomIntFromInterval(12, 14)}:00`,
      checkout: `${getRandomIntFromInterval(12, 14)}:00`,
      features: getRandomElements(FEATURES),
      description: getRandomArrayElement(RENT_DESCRIPTIONS),
      photos: getRandomElements(PHOTOS)
    },
    location: {
      lat,
      lng
    }
  };
};

const createDescriptions = (count = SIMILAR_DESCRIPTION_COUNT) => Array.from({length: count}, (_, itemIndex) => createDescription(itemIndex + 1));

export {createDescriptions};
