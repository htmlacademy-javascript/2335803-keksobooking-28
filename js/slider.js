import {MAX_PRICE} from './data.js';

const newForm = document.querySelector('.ad-form');
const price = newForm.querySelector('#price');
const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower'
});

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: MAX_PRICE
    },
    step: 1,
    start: Number(price.placeholder),
  });
};

const onPriceSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  price.value = Math.floor(sliderValue);
};

sliderElement.noUiSlider.on('update', onPriceSliderUpdate);

export {updateSlider};
