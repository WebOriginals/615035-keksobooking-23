const formElement = document.querySelector('.ad-form');
const fieldsetsElement = formElement.querySelectorAll('fieldset');

const causeDeactivatingForm =  () => {
  formElement.classList.add('ad-form--disabled');
  for (let i = 0; i < fieldsetsElement.length; i++) {
    fieldsetsElement[i].setAttribute('disabled', '');
  }
};

const activateForm = () => {
  formElement.classList.remove('ad-form--disabled');
  for (let i = 0; i < fieldsetsElement.length; i++) {
    fieldsetsElement[i].removeAttribute('disabled');
  }
};

causeDeactivatingForm();
export {causeDeactivatingForm, activateForm} ;
