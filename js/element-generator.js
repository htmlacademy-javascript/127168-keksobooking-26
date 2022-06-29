import {createDescriptions} from './data.js';

const mapBlock = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const descriptions = createDescriptions();
const descriptionListFragment = document.createDocumentFragment();

descriptions.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  const fillContent = (selector, content) => {
    cardElement.querySelector(selector).textContent = content;
  };

  fillContent('.popup__title', offer.title);
  fillContent('.popup__text--address', offer.address);
  fillContent('[data-price]', offer.price);
  fillContent('.popup__text--capacity',
    `${offer.rooms} комнат${(offer.rooms === 1) ? 'a' : 'ы'} для ${offer.guests} гост${(offer.guests === 1) ? 'я' : 'ей'}`);
  fillContent('.popup__text--time',
    `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  cardElement.querySelector('.popup__description', offer.description);

  cardElement.querySelector('.popup__avatar').src = author.avatar;

  switch (offer.type) {
    case 'flat':
      fillContent('.popup__type', 'Квартира');
      break;
    case 'bungalow':
      fillContent('.popup__type', 'Бунгало');
      break;
    case 'house':
      fillContent('.popup__type', 'Дом');
      break;
    case 'palace':
      fillContent('.popup__type', 'Дворец');
      break;
    case 'hotel':
      fillContent('.popup__type', 'Отель');
      break;
    default:
      cardElement.querySelector('.popup__type').remove();
  }

  const featuresList = cardElement.querySelectorAll('.popup__feature');
  featuresList.forEach((featureListItem) => {
    const isFeature = offer.features.some((offerFeature) => featureListItem.classList.contains(`popup__feature--${offerFeature}`));
    if (!isFeature) {
      featureListItem.remove();
    }
  });

  const popupPhotos = cardElement.querySelector('.popup__photos');
  const imageTemplate = popupPhotos.querySelector('.popup__photo');
  const imagesFragment = document.createDocumentFragment();
  popupPhotos.textContent = '';
  offer.photos.forEach((photo) => {
    const imageElement = imageTemplate.cloneNode(true);
    imageElement.src = photo;
    imagesFragment.append(imageElement);
  });
  popupPhotos.append(imagesFragment);

  // Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.

  descriptionListFragment.append(cardElement);
});

mapBlock.append(descriptionListFragment.firstChild);

console.log(descriptions, descriptionListFragment);
