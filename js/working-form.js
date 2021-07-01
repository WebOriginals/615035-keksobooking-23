import {
  OPTIONS_DATA_MIN,
  formElement,
  fieldsetsElement,
  titleAdMinLength,
  titleAdMaxLength,
  selectHousingElement,
  priceElement,
  numberRoomsElement,
  capacityElement,
  timeIn,
  timeOut,
  titleAdElement,
  housingCoordinates} from './variables-constants.js';



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
  housingCoordinates.value = [35.681700, 139.753891];
};
causeDeactivatingForm();

// работа с заголовком объявления
titleAdElement.addEventListener('input', () => {
  if (titleAdElement.value.length < titleAdMinLength) {
    titleAdElement.setCustomValidity(`Минимальное количество символов ${titleAdMinLength}, добавьте ещё ${titleAdMinLength - titleAdElement.value.length} симв.`);
  } else if (titleAdElement.value.length > titleAdMaxLength) {
    titleAdElement.setCustomValidity(`Максимально количество символов ${titleAdMaxLength}, удалите лишние ${titleAdElement.value.length - titleAdMaxLength} симв.`);
  } else {
    titleAdElement.setCustomValidity('');
  }
  titleAdElement.reportValidity();
});
// конец работы с заголовком объявления

// работа с select #type жилья и ценой
const filterChangeHandler =  (event) => {
  const selectedOptionValue = event.target.value;
  const selectedOptionDataMin = OPTIONS_DATA_MIN[selectedOptionValue];
  priceElement.min = selectedOptionDataMin;
  priceElement.placeholder = selectedOptionDataMin;
};
selectHousingElement.addEventListener('change', filterChangeHandler);
priceElement.addEventListener('input', () => {
  if (+priceElement.value < +priceElement.min) {
    priceElement.setCustomValidity(`Минимальное значение ${priceElement.min} .`);
  } else if (+priceElement.value > +priceElement.max) {
    priceElement.setCustomValidity(`Максимальное значение ${priceElement.max}.`);
  } else {
    priceElement.setCustomValidity('');
  }
  priceElement.reportValidity();
});
// конец работы с select #type жилья и ценой

//работа с кол-вом комнат и гостей
const setDisabledOption = (options, rooms) => {
  rooms = +rooms;
  for (let i = 0; i < options.length; i++) {

    if (rooms === 100) {
      options[i].disabled = (+options[i].value !== 0);
    } else {
      options[i].disabled = (rooms < +options[i].value || +options[i].value === 0);
    }
  }
};
const checkCapacity = () => {
  if (+numberRoomsElement.value === 100 && +capacityElement.value !== 0) {
    capacityElement.setCustomValidity('Не для гостей');
  } else if (+numberRoomsElement.value < +capacityElement.value) {
    capacityElement.setCustomValidity('Гостей больше чем комнат');
  } else {
    capacityElement.setCustomValidity('');
  }
  capacityElement.reportValidity();
};

numberRoomsElement.addEventListener('input', () => {
  checkCapacity();
  setDisabledOption(capacityElement, numberRoomsElement.value);
  capacityElement.reportValidity();
});
capacityElement.addEventListener('input', () => {
  checkCapacity();
  capacityElement.reportValidity();
});
// конец работы с кол-вом комнат и гостей

//работа с временем заезда и выезда
const changeTimeIn = (event) => {
  const timeInValue = event.target.value;
  timeOut.value = timeInValue;
};
const changeTimeOut = (event) => {
  const timeOutValue = event.target.value;
  timeIn.value = timeOutValue;
};

timeIn.addEventListener('change', changeTimeIn);
timeOut.addEventListener('change', changeTimeOut);
//конец работы с временем заезда и выезда

const replaceCoordinatesInputAddress = (element) => {
  const valueMainPinMarker = element.getLatLng();
  const arrayCoordinates = Object.values(valueMainPinMarker);
  const arrayShortCoordinates = [];

  for(let i = 0; i < arrayCoordinates.length; i++ ){
    arrayShortCoordinates.push(arrayCoordinates[i].toFixed(5));
  }
  housingCoordinates.value = arrayShortCoordinates.join(', ');
}

export {causeDeactivatingForm, activateForm, replaceCoordinatesInputAddress};
