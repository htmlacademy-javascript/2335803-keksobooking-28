import {debounce} from './utils.js';
import {DEBOUNCE_TIME_INTERVAL, DEFAULT_FILTER, PricesRange} from './data.js';
import {createPoints} from './map.js';

const mapFiltersForm = document.querySelector('.map__filters');
const typeFilter = mapFiltersForm.querySelector('#housing-type');
const priceFilter = mapFiltersForm.querySelector('#housing-price');
const roomsFilter = mapFiltersForm.querySelector('#housing-rooms');
const guestsFilter = mapFiltersForm.querySelector('#housing-guests');
const featuresFilters = mapFiltersForm.querySelectorAll('#housing-features input');

let objectsData;
let popupsData;

const getObjectsData = (objects, popups) => {
  objectsData = objects;
  popupsData = popups;
};

const startSort = () => {
  const data = objectsData.slice(0);
  const sortedObjects = [];
  const sortedPopups = [];

  if (typeFilter.value !== DEFAULT_FILTER) {
    for (let i = 0; i < data.length; i ++) {
      if (data[i].offer.type !== typeFilter.value) {
        delete data[i];
      }
    }
  }

  if (priceFilter.value !== DEFAULT_FILTER) {
    const minPrice = PricesRange[priceFilter.value].min;
    const maxPrice = PricesRange[priceFilter.value].max;

    for (let i = 0; i < data.length; i ++) {
      if (data[i] && (maxPrice <= data[i].offer.price || data[i].offer.price <= minPrice)) {
        delete data[i];
      }
    }
  }

  if (roomsFilter.value !== DEFAULT_FILTER) {
    const roomsCount = +roomsFilter.value;
    for (let i = 0; i < objectsData.length; i ++) {
      if (objectsData[i].offer.rooms !== roomsCount) {
        delete data[i];
      }
    }
  }

  if (guestsFilter.value !== DEFAULT_FILTER) {
    const guestsCount = +guestsFilter.value;
    for (let i = 0; i < objectsData.length; i ++) {
      if (objectsData[i].offer.guests === guestsCount) {
        delete data[i];
      }
    }
  }

  featuresFilters.forEach((featureFilter) => {
    if (featureFilter.checked) {
      for (let i = 0; i < objectsData.length; i ++) {
        const objectFeatures = objectsData[i].offer.features;
        if (!objectFeatures) {
          delete data[i];
        }
      }
    }
  });

  for (let i = 0; i < data.length; i ++) {
    if (data[i]) {
      sortedObjects.push(objectsData[i]);
      sortedPopups.push(popupsData[i]);
    }
  }

  createPoints(sortedObjects, sortedPopups);
};

const debounceSort = debounce(startSort, DEBOUNCE_TIME_INTERVAL);


mapFiltersForm.addEventListener('change', () => {
  debounceSort();
});

const resetMapFilters = () => {
  mapFiltersForm.reset();
  startSort();
};

export {getObjectsData, resetMapFilters};
