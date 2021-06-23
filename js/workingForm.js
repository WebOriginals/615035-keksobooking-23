const forma = document.querySelector('.ad-form');
const fieldsets = forma.querySelectorAll('fieldset');

const causeDeactivatingForm = function () {
  forma.classList.add('ad-form--disabled');
  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', 'disabled');
  }
};

const activateForm = function () {
  forma.classList.remove('ad-form--disabled');
  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled', 'disabled');
  }
};

causeDeactivatingForm();
activateForm();
