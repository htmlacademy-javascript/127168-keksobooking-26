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

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error'
});

pristine.addValidator(roomNumberField, validateCapacityRoom, 'плохо, лови здесь длинный комментарий, вот прям очень длинный комментарий');

adForm.addEventListener ('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    adForm.submit();
  }
});

capacityField.addEventListener('change', () => {
  pristine.validate(roomNumberField);
});
