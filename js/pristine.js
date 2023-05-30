const newForm = document.querySelector('.ad-form');

const pristine = new Pristine(newForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error-text',
});

export {pristine};
