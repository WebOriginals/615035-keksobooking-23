import {ALERT_SHOW_TIME} from './variables-constants.js';
import {
  checkKeydownModalSuccess,
  checkClickModalSuccess,
  checkKeydownModalError,
  checkClickModalError,
  checkClickBtnModalError
} from './working-form.js';
export const modalSuccessTemplateElement = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);

//проверка нажаата ли клаваша
export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const closeMessageSuccess = () => {
  setTimeout(() => {
    modalSuccessTemplateElement.remove();
  }, ALERT_SHOW_TIME);
  document.removeEventListener('keydown', checkKeydownModalSuccess);
  modalSuccessTemplateElement.removeEventListener('click', checkClickModalSuccess);
};

export const modalErrorTemplateElement = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);
export const buttonClocesModalError = modalErrorTemplateElement.querySelector('.error__button');

export const closeMessageError = () => {
  buttonClocesModalError.removeEventListener('click', checkClickBtnModalError);
  document.removeEventListener('keydown', checkKeydownModalError);
  modalErrorTemplateElement.removeEventListener('click', checkClickModalError);
};
