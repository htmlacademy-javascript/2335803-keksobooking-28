import {onButtonChangeCheckIn, onSubmitForm, notificationMesageElement, removeListeners} from './validation_new_form.js';
import {isEscapeKey} from './utils.js';
import {updateSlider} from './slider.js';
import {resetSpecialIcon} from './map.js';

const newForm = document.querySelector('.ad-form');
const housingType = newForm.querySelector('#type');
const checkIn = newForm.querySelector('#timein');
const newFormFeatures = newForm.querySelector('.features').querySelectorAll('input');
const newFormTitle = newForm.querySelector('#title');
const newFormDescription = newForm.querySelector('#description');
const newFormPrice = newForm.querySelector('#price');
const newFormAddress = newForm.querySelector('#address');
const avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const picturePreview = document.querySelector('.ad-form__photo');

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
  resetSpecialIcon();
  updateSlider();
  avatarPreview.src = 'img/muffin-grey.svg';

  if (picturePreview.querySelector('img')) {
    picturePreview.querySelector('img').parentNode.removeChild(picturePreview.querySelector('img'));
  }

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

const onCloseNotification = (evt) => {
  const checkClassName = () => evt.target.className.includes('error') || evt.target.className.includes('success');
  if (isEscapeKey(evt) || checkClassName()) {
    notificationMesageElement.parentNode.removeChild(notificationMesageElement);
    removeListeners();
  }
  if (notificationMesageElement.className.includes('error')){
    newForm.addEventListener('submit', onSubmitForm);
  }
};

export {onButtonFormCloseClick, onCloseNotification, onEscapeCloseForm};
