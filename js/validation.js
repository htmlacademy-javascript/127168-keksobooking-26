import {correctEndOfWord} from './util.js';

const COMMERCIAL_ROOM_NUM = 100;
const COMMERTIAL_GUEST_NUM = 0;
const MAX_PRICE = 100000;

const adForm = document.querySelector('.ad-form');
const roomNumberField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');
const typeHouseField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');

const minimalCostByHouse = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

// Validator functions
const validateCapacityRoom = () => {
  if (+capacityField.value === COMMERTIAL_GUEST_NUM && +roomNumberField.value === COMMERCIAL_ROOM_NUM) {
    return true;
  }
  if ((+capacityField.value !== COMMERTIAL_GUEST_NUM && +roomNumberField.value === COMMERCIAL_ROOM_NUM) ||
      (+capacityField.value === COMMERTIAL_GUEST_NUM && +roomNumberField.value !== COMMERCIAL_ROOM_NUM)) {
    return false;
  }
  return +capacityField.value <= +roomNumberField.value;
};

const validatePrice = () => priceField.value >= minimalCostByHouse[typeHouseField.value] && priceField.value <= MAX_PRICE;

// Error message functions
const getCapacityRoomErrorMessage = () => {
  const numOfRooms = roomNumberField.value;
  const roomWord = correctEndOfWord(numOfRooms, 'комнат', ['ы', '', '']);
  const guestWord = correctEndOfWord(numOfRooms, 'гост', ['я', 'ей', 'ей']);

  if (+capacityField.value !== COMMERTIAL_GUEST_NUM && +roomNumberField.value !== COMMERCIAL_ROOM_NUM) {
    return `Для ${numOfRooms} ${roomWord} не больше ${numOfRooms} ${guestWord}`;
  }

  if (+capacityField.value === COMMERTIAL_GUEST_NUM) {
    return 'Не для гостей только 100 комнат';
  }

  return '100 комнат не для гостей';
};

const getPriceErrorMessage = () => {
  const minPrice = minimalCostByHouse[typeHouseField.value];
  if (+priceField.value < minPrice) {
    return `Минимальная стоимость ${minPrice} рублей`;
  }
  return `Максимальная стоимость ${MAX_PRICE} рублей`;
};

// Validators
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error'
});

pristine.addValidator(roomNumberField, validateCapacityRoom, getCapacityRoomErrorMessage);
pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

// Change listeners
capacityField.addEventListener('change', () => {
  pristine.validate(roomNumberField);
});

typeHouseField.addEventListener('change', () => {
  priceField.placeholder = minimalCostByHouse[typeHouseField.value];
  pristine.validate(priceField);
});

timeInField.addEventListener('change', () => {
  timeOutField.value = timeInField.value;
});

timeOutField.addEventListener('change', () => {
  timeInField.value = timeOutField.value;
});

// Submit listener
adForm.addEventListener ('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    adForm.submit();
  }
});
