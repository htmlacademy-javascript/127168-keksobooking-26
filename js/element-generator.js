import {createDescriptions} from './data.js';

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

const FEATURE_CLASS_NAME = 'popup__feature';

const mapBlock = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const descriptions = createDescriptions();
const descriptionListFragment = document.createDocumentFragment();

descriptions.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  const fillContent = (selector, content, attribute='textContent') => {
    if (content) {
      cardElement.querySelector(selector)[attribute] = content;
    } else {
      cardElement.querySelector(selector).remove();
    }
  };

  fillContent('.popup__title', offer.title);
  fillContent('.popup__text--address', offer.address);
  fillContent('.popup__text--price', `${offer.price} ₽/ночь`);
  fillContent('.popup__description', offer.description);
  fillContent('.popup__type', houseTypes[offer.type]);
  fillContent('.popup__avatar', author.avatar, 'src');


  if (offer.rooms && offer.guests) {
    fillContent('.popup__text--capacity',
      `${offer.rooms} комнат${(offer.rooms === 1) ? 'a' : 'ы'} для ${offer.guests} гост${(offer.guests === 1) ? 'я' : 'ей'}`);
  } else {
    cardElement.querySelector('.popup__text--capacity').remove();
  }

  if (offer.checkin && offer.checkout) {
    fillContent('.popup__text--time',
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

  descriptionListFragment.append(cardElement);
});

mapBlock.append(descriptionListFragment.firstChild);
