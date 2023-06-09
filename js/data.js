import {generateRandomNumber, createRandomIdFromGenerator, generateRandomCoordinate} from './utils.js';

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
const translatedTypes = {'flat': 'Квартира', 'bungalow': 'Бунгало', 'house': 'Дом', 'palace': 'Дворец', 'hotel': 'Отель'};
const typesMinPrices = {'flat': 1000, 'bungalow': 0, 'house': 5000, 'palace': 10000, 'hotel': 3000};
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 100000;
const ERROR_MESSAGE_TITLE_LENGTH = 'Длина заголовка должна быть в диапазоне от 30 до 100 символов';
const ERROR_MESSAGE_PRICE = 'Значение цены должно быть числом и быть не более 100 000';
const ERROR_MESSAGE_MIN_PRICE = 'Цена не может быть меньше указанного значения';
const ERROR_MESSAGE_GUESTS_QAINTITY = 'Недопустимое количество гостей';
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 10;
const BASE_URL = 'https://28.javascript.pages.academy/keksobooking';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить странницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте отправить снова',
};
const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_TIME_INTERVAL = 500;
const cityCenter = {
  lat: 35.4137,
  lng: 139.4150,
};
const iconConfig = {
  url: './img/pin.svg',
  width: 40,
  height: 40,
  anchorX: 26,
  anchorY: 52,
};
const specialIconConfig = {
  url: './img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_FILTER = 'any';
const PricesRange = {
  low: {min: 0, max: 9999},
  middle: {min: 10000, max: 50000},
  high: {min: 50001, max: Infinity},
};
const MAX_ICONS_COUNT = 10;

const getAvatar = () => {
  const id = getAvatarId();
  if (id < 10) {
    return `0${id}`;
  }
  return id;
};

const getData = (someDataList) => {
  const dataListLength = generateRandomNumber(1, someDataList.length);
  const dataList = new Set();
  while (Array.from(dataList).length < dataListLength) {
    dataList.add(someDataList[generateRandomNumber(0, someDataList.length - 1)]);
  }
  return dataList;
};

const createAnnouncementObject = () => ({
  author: {
    avatar: `img/avatars/user${getAvatar()}.png`
  },
  offer: {
    title: TITLES[generateRandomNumber(0, TITLES.length - 1)],
    address: {
      lat: generateRandomCoordinate(35.65000, 35.70000),
      lng: generateRandomCoordinate(139.70000, 139.80000),
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
      lat: generateRandomCoordinate(35.65000, 35.70000),
      lng: generateRandomCoordinate(139.70000, 139.80000),
    }
  }
});

const createAnnouncementObjects = () => Array.from({length: ANNOUNCEMENT_QUANTIY}, createAnnouncementObject);

export {createAnnouncementObjects, translatedTypes, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH, ERROR_MESSAGE_TITLE_LENGTH,
  MAX_PRICE, ERROR_MESSAGE_PRICE, ERROR_MESSAGE_GUESTS_QAINTITY, ERROR_MESSAGE_MIN_PRICE, typesMinPrices,
  TILE_LAYER, COPYRIGHT, ZOOM, cityCenter, iconConfig, specialIconConfig, BASE_URL, ErrorText, Route, Method, ALERT_SHOW_TIME, DEBOUNCE_TIME_INTERVAL,
  FILE_TYPES, DEFAULT_FILTER, PricesRange, MAX_ICONS_COUNT};
