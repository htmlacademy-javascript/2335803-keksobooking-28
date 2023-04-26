import {generateRandomNumber, createRandomIdFromGenerator} from './utils.js';

const TITLES = ['2-к. квартира, 62 м², 9/9 эт.', '1-к. квартира, 35 м², 8/19 эт.',
  '1-к. квартира, 43 м², 6/9 эт.', '2-к. квартира, 64 м², 22/41 эт.', '1-к. квартира, 40 м², 3/5 эт.'];
const TYPES = ['flat', 'palace', 'house', 'hotel', 'bungalow'];
const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const SOME_FEATURES = ['dishwasher', 'wifi', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Сдается чистая и ухоженная квартира порядочным людям. Рядом расположены школа, садик, ТЦ, Арбат.',
  'Сдается в аренду на длительный срок трёхкомнатная квартира. Идеальный вариант для тех кто приехал в командировку. В центре города , рядом с остановкой ул. Мира.',
  'Сдаётся чистая , тёплая квартира с индивидуальным отоплением на 180 квартале, на длительный срок.',
  'Сдается светлая, уютная 1-ая квартира по ул. Строителей 20. На длительный срок!Рядом 23 школа, ТЦ Арбат, прекрасная аллея для прогулки.',
  'Сдам чистую, светлую, уютную однокомнатную квартиру в новом доме на длительный срок платежеспособным арендаторам. Я собственник.',
  'Сдаётся уютная, теплая 2х комнатная квартира на длительный срок.'];
const PHOTOS_LINKS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const ANNOUNCEMENT_QUANTIY = 10;
const getAvatarId = createRandomIdFromGenerator(1, 10);

const getAvatar = () => {
  const id = getAvatarId();
  if (id < 10) {
    return `0${id}`;
  }
  return id;
};

const getData = (someDataList) => {
  const featuresListLength = generateRandomNumber(0, someDataList.length - 1);
  const featuresList = new Set();
  while (Array.from(featuresList).length < featuresListLength) {
    featuresList.add(someDataList[generateRandomNumber(0, someDataList.length - 1)]);
  }
  return featuresList;
};

const createAnnouncementObject = () => ({
  author: {
    avatar: `img/avatars/user${getAvatar()}.png`
  },
  offer: {
    title: TITLES[generateRandomNumber(0, TITLES.length - 1)],
    address: {
      lat: generateRandomNumber(35.65000, 35.70000),
      lng: generateRandomNumber(139.70000, 139.80000),
    },
    price: generateRandomNumber(5000, 50000),
    type: TYPES[generateRandomNumber(0, TYPES.length - 1)],
    rooms: generateRandomNumber(1, 3),
    guests: generateRandomNumber(1, 15),
    checkin: CHECKIN_TIMES[generateRandomNumber(0, CHECKIN_TIMES.length - 1)],
    checkout: CHECKOUT_TIMES[generateRandomNumber(0, CHECKOUT_TIMES.length - 1)],
    features: getData(SOME_FEATURES),
    description: DESCRIPTIONS[generateRandomNumber(0, DESCRIPTIONS.length - 1)],
    photos: getData(PHOTOS_LINKS),
    location: {
      lat: generateRandomNumber(35.65000, 35.70000),
      lng: generateRandomNumber(139.70000, 139.80000),
    }
  }
});

const createAnnouncementObjects = () => Array.from({length: ANNOUNCEMENT_QUANTIY}, createAnnouncementObject);

export {createAnnouncementObjects};
