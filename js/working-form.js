const formElement = document.querySelector('.ad-form');
const fieldsetsElement = formElement.querySelectorAll('fieldset');
const causeDeactivatingForm = () => {
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

// работа с заголовком объявления
const titleAdElement = formElement.querySelector('#title');
const titleAdMinLength = titleAdElement.getAttribute('minlength');
const titleAdMaxLength = titleAdElement.getAttribute('maxlength');
titleAdElement.addEventListener('input', () => {
  if (titleAdElement.value.length < titleAdMinLength) {
    titleAdElement.setCustomValidity(`Ещё ${titleAdMinLength - titleAdElement.value.length} симв.`);
  } else if (titleAdElement.value.length > titleAdMaxLength) {
    titleAdElement.setCustomValidity(`Удалите лишние ${titleAdElement.value.length - titleAdMaxLength} симв.`);
  } else {
    titleAdElement.setCustomValidity('');
  }
  titleAdElement.reportValidity();
});
// конец работы с заголовком объявления

// работа с select #type жилья и ценой
const selectHousingElement = formElement.querySelector('#type');
const priceElement = formElement.querySelector('#price');
const filterChangeHandler =  (evt) => {
  const selectedOptionDataMin = this.options[this.selectedIndex].getAttribute('data-min');
  priceElement.min = selectedOptionDataMin;
  priceElement.placeholder = selectedOptionDataMin;
};
selectHousingElement.addEventListener('change', filterChangeHandler);
priceElement.addEventListener('input', () => {
  if (parseInt(priceElement.value) < parseInt(priceElement.min)) {
    priceElement.setCustomValidity(`Минимальное значение ${priceElement.min} .`);
  } else if (parseInt(priceElement.value) > parseInt(priceElement.max)) {
    priceElement.setCustomValidity(`Максимальное значение ${priceElement.max}.`);
  } else {
    priceElement.setCustomValidity('');
  }
  priceElement.reportValidity();
});
// конец работы с select #type жилья и ценой

//работа с кол-вом комнат и гостей
const numberRoomsElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');

const setDisabledOption = (options, rooms) => {
  rooms = parseInt(rooms);
  for (let i = 0; i < options.length; i++) {

    if (rooms === 100) {
      options[i].disabled = (parseInt(options[i].value) !== 0);
    } else {
      options[i].disabled = (rooms < parseInt(options[i].value) || parseInt(options[i].value) === 0);
    }
  }
}
const checkCapacity = () => {
  if (numberRoomsElement.value === '100' && capacityElement.value !== '0') {
    capacityElement.setCustomValidity('Не для гостей');
  } else if (numberRoomsElement.value < capacityElement.value) {
    capacityElement.setCustomValidity('Гостей больше чем комнат');
  } else {
    capacityElement.setCustomValidity('');
  }
  capacityElement.reportValidity();
}

numberRoomsElement.addEventListener('input', () => {
  checkCapacity();
  setDisabledOption(capacityElement, numberRoomsElement.value);
  capacityElement.reportValidity();
});
capacityElement.addEventListener('input', () => {
  checkCapacity()
  capacityElement.reportValidity();
});
// конец работы с кол-вом комнат и гостей


export {causeDeactivatingForm, activateForm};
