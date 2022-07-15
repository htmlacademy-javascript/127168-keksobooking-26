import {correctEndOfWord} from './util.js';

const FEATURE_CLASS_NAME = 'popup__feature';

const houseTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const createImageElement = (source) => {
  const imageElement = document.createElement('img');
  imageElement.src = source;
  imageElement.classList.add('popup__photo');
  imageElement.width ='45';
  imageElement.height = '40';
  imageElement.alt = 'Фотография жилья';
  return imageElement;
};

const createFeatureElement = (className, extencionClassName) => {
  const featureElement = document.createElement('li');
  featureElement.classList.add(className, `${className}--${extencionClassName}`);
  return featureElement;
};

const fillContent = (element, selector, content, attribute='textContent') => {
  if (content) {
    element.querySelector(selector)[attribute] = content;
  } else {
    element.querySelector(selector).remove();
  }
};

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createDescriptionCopy = (template, descriptionData) => {
  const {author, offer} = descriptionData;
  const cardElement = template.cloneNode(true);

  fillContent(cardElement, '.popup__title', offer.title);
  fillContent(cardElement, '.popup__text--address', offer.address);
  fillContent(cardElement, '.popup__text--price', `${offer.price} ₽/ночь`);
  fillContent(cardElement, '.popup__description', offer.description);
  fillContent(cardElement, '.popup__type', houseTypes[offer.type]);
  fillContent(cardElement, '.popup__avatar', author.avatar, 'src');

  if (offer.rooms && offer.guests) {
    const roomWord = correctEndOfWord(offer.rooms, 'комнат', ['а', 'ы', '']);
    const guestWord = correctEndOfWord(offer.guests, 'гост', ['я', 'ей', 'ей']);
    fillContent(cardElement, '.popup__text--capacity',
      `${offer.rooms} ${roomWord} для ${offer.guests} ${guestWord}`);
  } else {
    cardElement.querySelector('.popup__text--capacity').remove();
  }

  if (offer.checkin && offer.checkout) {
    fillContent(cardElement, '.popup__text--time',
      `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  } else {
    cardElement.querySelector('.popup__text--time').remove();
  }

  const featuresList = cardElement.querySelector('.popup__features');
  if (offer.features && offer.features.length !== 0) {
    featuresList.textContent = '';
    offer.features.forEach((feature) => {
      const newFeature = createFeatureElement(FEATURE_CLASS_NAME, feature);
      featuresList.append(newFeature);
    });
  } else {
    cardElement.querySelector('.popup__features').remove();
  }

  const popupPhotos = cardElement.querySelector('.popup__photos');
  if (offer.photos && offer.photos.length !== 0) {
    popupPhotos.textContent = '';
    popupPhotos.append(...offer.photos.map(createImageElement));
  } else {
    popupPhotos.remove();
  }

  return cardElement;
};

const showCard = (cardDescription) => createDescriptionCopy(cardTemplate, cardDescription);

export {showCard};
