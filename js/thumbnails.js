import {translatedTypes} from './data.js';

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const getFeatures = (features) => Array.from(features).join(', ');

const createPhotoElements = (photosList, domElement) => {
  const newPhotoElement = domElement.querySelector('img').cloneNode();
  for (let i = 0; i < photosList.length; i ++) {
    if (i === 0) {
      domElement.querySelector('img').src = photosList[i];
    } else {
      newPhotoElement.src = photosList[i];
      domElement.appendChild(newPhotoElement);
    }
  }
};

const createNewCard = (author, offer) => {
  const newCardTemplate = cardTemplate.cloneNode(true);
  newCardTemplate.querySelector('.popup__title').textContent = offer.title;
  newCardTemplate.querySelector('.popup__text--address').textContent = `Долгота ${offer.address.lng}, Ширина ${offer.address.lat}`;
  newCardTemplate.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  newCardTemplate.querySelector('.popup__type').textContent = translatedTypes[offer.type];
  newCardTemplate.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  newCardTemplate.querySelector('.popup__text--time').textContent = `Заезд до ${offer.checkin}, выезд после ${offer.checkout}`;
  newCardTemplate.querySelector('.popup__features').textContent = getFeatures(offer.features);
  newCardTemplate.querySelector('.popup__description').textContent = offer.description;
  newCardTemplate.querySelector('.popup__avatar').src = author.avatar;

  createPhotoElements(Array.from(offer.photos), newCardTemplate.querySelector('.popup__photos'));
  return newCardTemplate;
};

const renderAllCards = (createdAnnouncementObjects) => {
  const announcementElements = [];
  createdAnnouncementObjects
    .forEach(({author, offer}) => announcementElements.push(createNewCard(author, offer)));
  return announcementElements;
};

export {renderAllCards};
