import {
  MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, ERROR_MESSAGE_TITLE_LENGTH, MAX_PRICE, ERROR_MESSAGE_PRICE,
  ERROR_MESSAGE_GUESTS_QAINTITY, ERROR_MESSAGE_MIN_PRICE, typesMinPrices
} from './data.js';
import {sendData} from './api.js';
import {pristine} from './pristine.js';
import {onCloseNotification, onEscapeCloseForm, onButtonFormCloseClick} from './new_form.js';
import {renderNewFormAvatar} from './new_picture_preview.js';
import {resetMapFilters} from './filters.js';

const newForm = document.querySelector('.ad-form');
const housingType = newForm.querySelector('#type');
const checkIn = newForm.querySelector('#timein');
const checkOut = newForm.querySelector('#timeout');
const newFormAddress = newForm.querySelector('#address');
const submitButton = newForm.querySelector('.ad-form__submit');
const resetButton = newForm.querySelector('.ad-form__reset');
const successUploadingMessage = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorUploadingMessage = document.querySelector('#error')
  .content
  .querySelector('.error');
let notificationMesageElement;

const showUploadingMessage = (notificationMessage) => {
  document.body.appendChild(notificationMessage);
  notificationMesageElement = notificationMessage;
  document.addEventListener('click', onCloseNotification);
  document.addEventListener('keydown', onCloseNotification);
  if (notificationMesageElement.className.includes('success')) {
    onButtonFormCloseClick();
  } else if (notificationMesageElement.className.includes('error')){
    document.removeEventListener('keydown', onEscapeCloseForm);
  }
  return notificationMesageElement;
};

const toggleDisableElement = (element, elementStatus) => {
  element.disabled = elementStatus;
};

const onSubmitForm = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    toggleDisableElement(newFormAddress, false);
    toggleDisableElement(submitButton, true);
    toggleDisableElement(resetButton, true);
    sendData(new FormData(evt.target))
      .then((response) => {
        if (response) {
          notificationMesageElement = showUploadingMessage(successUploadingMessage);
          resetMapFilters();
        }
      })
      .catch(
        () => {
          notificationMesageElement = showUploadingMessage(errorUploadingMessage);
        }
      )
      .finally(
        toggleDisableElement(newFormAddress, true),
        toggleDisableElement(submitButton, false),
        toggleDisableElement(resetButton, false),
      );
  }
};

const validateTitleLength = (value) => value.length >= MIN_TITLE_LENGTH & value.length <= MAX_TITLE_LENGTH;
const validatePrice = (value) => Number.isInteger(Number(value)) & Number(value) <= MAX_PRICE;
const validateMinPrice = (value) => Number(value) >= Number(newForm.querySelector('#price').placeholder);
const validateGuestsQuantity = () => {
  const selecetedRooms = newForm.querySelector('#room_number').value;
  const selectedGuests = newForm.querySelector('#capacity').value;
  return selectedGuests <= selecetedRooms;
};

pristine.addValidator(newForm.querySelector('#title'), validateTitleLength, ERROR_MESSAGE_TITLE_LENGTH, 1, true);
pristine.addValidator(newForm.querySelector('#price'), validatePrice, ERROR_MESSAGE_PRICE, 2, true);
pristine.addValidator(newForm.querySelector('#price'), validateMinPrice, ERROR_MESSAGE_MIN_PRICE, 3, true);
pristine.addValidator(newForm.querySelector('#capacity'), validateGuestsQuantity, ERROR_MESSAGE_GUESTS_QAINTITY, 4, true);

const checkNewForm = () => newForm.addEventListener('submit', onSubmitForm);

const onButtonChangeType = () => {
  const selectedHousingType = housingType.value;
  newForm.querySelector('#price').placeholder = typesMinPrices[selectedHousingType];
};

const onButtonChangeCheckIn = () => {
  checkOut.value = checkIn.value;
};

const onButtonChangeCheckOut = () => {
  checkIn.value = checkOut.value;
};

const addNewFormListeners = () => {
  housingType.addEventListener('change', onButtonChangeType);
  checkIn.addEventListener('change', onButtonChangeCheckIn);
  checkOut.addEventListener('change', onButtonChangeCheckOut);
  renderNewFormAvatar();
};

const removeListeners = () => {
  document.removeEventListener('click', onCloseNotification);
  document.removeEventListener('keydown', onCloseNotification);
};

export {checkNewForm, addNewFormListeners, pristine, onButtonChangeCheckIn, onSubmitForm, notificationMesageElement, removeListeners};
