import {correctEndOfWord} from './util.js';

const COMMERCIAL_ROOM_NUM = 100;
const COMMERTIAL_GUEST_NUM = 0;

const adForm = document.querySelector('.ad-form');
const roomNumberField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');

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

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error'
});

pristine.addValidator(roomNumberField, validateCapacityRoom, getCapacityRoomErrorMessage);

adForm.addEventListener ('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    adForm.submit();
  }
});

capacityField.addEventListener('change', () => {
  pristine.validate(roomNumberField);
});
