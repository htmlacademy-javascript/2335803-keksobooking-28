import {ALERT_SHOW_TIME} from './data.js';

const isEscapeKey = (evt) => evt.key === 'Escape';

const generateRandomNumber = (firstValue, secondValue) => {
  const lower = Math.min(firstValue, secondValue);
  const upper = Math.max(firstValue, secondValue);
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const generateRandomCoordinate = (firstValue, secondValue) => {
  const lower = Math.min(firstValue, secondValue);
  const upper = Math.max(firstValue, secondValue);
  const result = Math.random() * (upper - lower + 1) + lower;
  return result.toFixed(4);
};

const createRandomIdFromGenerator = (firstValue, secondValue) => {
  const previousValues = [];

  return function () {
    let newValue = generateRandomNumber(firstValue, secondValue);
    if (previousValues.length >= (secondValue - firstValue + 1)) {
      return;
    }
    while (previousValues.includes(newValue)) {
      newValue = generateRandomNumber(firstValue, secondValue);
    }
    previousValues.push(newValue);
    return newValue;
  };
};

const showAllert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '25%';
  alertContainer.style.top = '25%';
  alertContainer.style.right = '25%';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'red';
  alertContainer.style.backgroundColor = 'white';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export{generateRandomNumber, createRandomIdFromGenerator, generateRandomCoordinate, showAllert, isEscapeKey, debounce};
