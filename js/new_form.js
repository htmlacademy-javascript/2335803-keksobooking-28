import {onCloseNotification, onButtonChangeCheckIn} from './validation_new_form.js';
import {isEscapeKey} from './utils.js';
import {specialIcon, createNewMarker} from './map.js';
import {cityCenter} from './data.js';
import {updateSlider} from './slider.js';

const newForm = document.querySelector('.ad-form');
const housingType = newForm.querySelector('#type');
const checkIn = newForm.querySelector('#timein');
const newFormFeatures = newForm.querySelector('.features').querySelectorAll('input');
const newFormTitle = newForm.querySelector('#title');
const newFormDescription = newForm.querySelector('#description');
const newFormPrice = newForm.querySelector('#price');
const newFormAddress = newForm.querySelector('#address');
let notificationMesageElement;

const cancelCheckedFeatures = () => {
  newFormFeatures.forEach((feature) => {
    feature.checked = false;
  });
};

const onButtonFormCloseClick = () => {
  const mapPopup = document.querySelector('.leaflet-popup');

  document.querySelector('body').classList.remove('modal-open');
  newFormDescription.value = '';
  newFormPrice.value = '';
  newFormAddress.value = '';
  newFormTitle.value = '';
  cancelCheckedFeatures();
  housingType.value = 'flat';
  newFormPrice.value = 1000;
  checkIn.value = '12:00';
  onButtonChangeCheckIn();
  createNewMarker(cityCenter.lat, cityCenter.lng, specialIcon, null, true);
  updateSlider();

  if (mapPopup) {
    mapPopup.classList.add('visually-hidden');
  }
};

const onEscapeCloseForm = (evt) => {
  const activeElement = () => document.activeElement.id === 'description' || document.activeElement.id === 'hashtags';
  if (isEscapeKey(evt) && !activeElement()) {
    onButtonFormCloseClick();
  }
};

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

export {showUploadingMessage, onButtonFormCloseClick};
