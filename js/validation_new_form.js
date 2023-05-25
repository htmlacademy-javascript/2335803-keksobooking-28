import {MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, ERROR_MESSAGE_TITLE_LENGTH, MAX_PRICE, ERROR_MESSAGE_PRICE,
  ERROR_MESSAGE_GUESTS_QAINTITY, ERROR_MESSAGE_MIN_PRICE, typesMinPrices} from './data.js';

const newForm = document.querySelector('.ad-form');
const housingType = newForm.querySelector('#type');
const checkIn = newForm.querySelector('#timein');
const checkOut = newForm.querySelector('#timeout');

const pristine = new Pristine (newForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error-text',
});

const onSubmitForm = (evt) => {
  evt.preventDefault();
  pristine.validate();
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
};

export {checkNewForm, addNewFormListeners, pristine};
