const newForm = document.querySelector('.ad-form');
const newFormFieldsets = newForm.querySelectorAll('fieldset');
const mapFilterForm = document.querySelector('.map__filters');


const switchDisabledAttribute = (element, boolState) => {
  for (const fieldset of element) {
    fieldset.disabled = boolState;
  }
};

const switchNotActiveState = () => {
  newForm.classList.add('ad-form--disabled');
  mapFilterForm.classList.add('map__filters--disabled');
  switchDisabledAttribute(newFormFieldsets, true);
  switchDisabledAttribute(mapFilterForm, true);
};

const switchActiveState = () => {
  newForm.classList.remove('ad-form--disabled');
  mapFilterForm.classList.remove('map__filters--disabled');
  switchDisabledAttribute(newFormFieldsets, false);
  switchDisabledAttribute(mapFilterForm, false);
};

export {switchNotActiveState, switchActiveState};
