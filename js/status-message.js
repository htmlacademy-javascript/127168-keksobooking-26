const ALERT_SHOW_TIME = 30000;
const ESCAPE_KEY_CODE = 'Escape';

const mapElement = document.querySelector('.map__canvas');

// Сообщение при GET

const showAlertMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.bottom = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#f05454';

  alertContainer.textContent = message;

  mapElement.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Сообщения при POST

const isEscape = (evt) => evt.key === ESCAPE_KEY_CODE;

function onPopupEscKeydown() {
  if (isEscape) {
    document.querySelectorAll('.success, .error').forEach((element) => element.remove());
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
}

const initCloseMessageEvents = (element) => {
  element.addEventListener('click', () => element.remove());
  document.addEventListener('keydown', onPopupEscKeydown);
};

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success')
    .cloneNode(true);

  initCloseMessageEvents(successMessageTemplate);

  document.body.append(successMessageTemplate);
};

const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error')
    .cloneNode(true);

  initCloseMessageEvents(errorMessageTemplate);

  document.body.append(errorMessageTemplate);
};

export {showAlertMessage,
  showSuccessMessage,
  showErrorMessage};
