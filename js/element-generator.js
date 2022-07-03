import {createDescriptions} from './data.js';

const houseTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const mapBlock = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const descriptions = createDescriptions();
const descriptionListFragment = document.createDocumentFragment();

descriptions.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  const fillContent = (selector, content) => {
    if (content) {
      cardElement.querySelector(selector).textContent = content;
    } else {
      cardElement.querySelector(selector).remove();
    }
  };

  fillContent('.popup__title', offer.title);
  fillContent('.popup__text--address', offer.address);
  fillContent('[data-price]', offer.price);
  fillContent('.popup__description', offer.description);
  fillContent('.popup__type', houseTypes[offer.type]);

  if (author.avatar) {
    cardElement.querySelector('.popup__avatar').src = author.avatar;
  } else {
    cardElement.querySelector('.popup__avatar').remove();
  }

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

  const featuresList = cardElement.querySelectorAll('.popup__feature');
  if (offer.features && offer.features.length !== 0) {
    featuresList.forEach((featureListItem) => {
      const isFeature = offer.features.some((offerFeature) => featureListItem.classList.contains(`popup__feature--${offerFeature}`));
      if (!isFeature) {
        featureListItem.remove();
      }
    });
  } else {
    cardElement.querySelector('.popup__features').remove();
  }

  const popupPhotos = cardElement.querySelector('.popup__photos');
  if (offer.photos && offer.photos.length !== 0) {
    const imageTemplate = popupPhotos.querySelector('.popup__photo');
    const imagesFragment = document.createDocumentFragment();
    popupPhotos.textContent = '';
    offer.photos.forEach((photo) => {
      const imageElement = imageTemplate.cloneNode(true);
      imageElement.src = photo;
      imagesFragment.append(imageElement);
    });
    popupPhotos.append(imagesFragment);
  } else {
    popupPhotos.remove();
  }

  descriptionListFragment.append(cardElement);
});

mapBlock.append(descriptionListFragment.firstChild);
