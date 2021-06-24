const formElement = document.querySelector('.ad-form');
const fieldsets = formElement.querySelectorAll('fieldset');

const causeDeactivatingForm = function () {
  formElement.classList.add('ad-form--disabled');
  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', '');
  }
};

const activateForm = function () {
  formElement.classList.remove('ad-form--disabled');
  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
};

causeDeactivatingForm();
activateForm();
