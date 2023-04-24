const generateRandomNumber = (firstValue, secondValue) => {
  const lower = Math.min(firstValue, secondValue);
  const upper = Math.max(firstValue, secondValue);
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
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

export{generateRandomNumber, createRandomIdFromGenerator};
