import {createDescriptions} from './data.js';

const mapBlock = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const descriptions = createDescriptions();
const descriptionListFragment = document.createDocumentFragment();

descriptions.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('[data-price]').textContent = offer.price;
  cardElement.querySelector('.popup__text--capacity')
    .textContent = `${offer.rooms} комнат${(offer.rooms === 1) ? 'a' : 'ы'} для ${offer.guests} гост${(offer.guests === 1) ? 'я' : 'ей'}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  const houseType = cardElement.querySelector('.popup__type');
  switch (offer.type) {
    case 'flat':
      houseType.textContent = 'Квартира';
      break;
    case 'bungalow':
      houseType.textContent = 'Бунгало';
      break;
    case 'house':
      houseType.textContent = 'Дом';
      break;
    case 'palace':
      houseType.textContent = 'Дворец';
      break;
    case 'hotel':
      houseType.textContent = 'Отель';
      break;
    default:
      houseType.textContent =  '';
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
