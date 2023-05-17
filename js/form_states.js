const newForm = document.querySelector('.ad-form');
const newFormFieldsets = newForm.querySelectorAll('fieldset');
const mapFilterForm = document.querySelector('.map__filters');


const toggleDisabledAttribute = (element, boolState) => {
  for (const fieldset of element) {
    fieldset.disabled = boolState;
  }
};

const setStateNotActive = () => {
  newForm.classList.add('ad-form--disabled');
  mapFilterForm.classList.add('map__filters--disabled');
  toggleDisabledAttribute(newFormFieldsets, true);
  toggleDisabledAttribute(mapFilterForm, true);
};

const setStateActive = () => {
  newForm.classList.remove('ad-form--disabled');
  mapFilterForm.classList.remove('map__filters--disabled');
  toggleDisabledAttribute(newFormFieldsets, false);
  toggleDisabledAttribute(mapFilterForm, false);
};

export {setStateNotActive, setStateActive};
