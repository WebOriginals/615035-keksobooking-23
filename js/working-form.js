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
  housingCoordinates,
  descriptionElement,
  featuresCheckboxElements,
  formPhotoElements,
  modalErrorTemplate,
  modalSuccessTemplate,
  ALERT_SHOW_TIME,
} from './variables-constants.js';
//import {getStartMarkerAndMap} from "./map.js";

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

//====================================

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

//====================================

// работа с select #type жилья и ценой
const filterChangeHandler = (event) => {
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

//получаем первоначальные значения
let dafoultHousingElement = '';
document.addEventListener('DOMContentLoaded', () => {
  dafoultHousingElement = selectHousingElement.value;
});
//вызываем функция и передаем данные как только ст загрузится
selectHousingElement.dispatchEvent(new Event('change'));
// конец работы с select #type жилья и ценой

//====================================

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

//получаем первоначальные значения
let dafoultRoomsElement = '';
let dafoultCapacityElement = '';
document.addEventListener('DOMContentLoaded', () => {
  dafoultRoomsElement = numberRoomsElement.value;
  dafoultCapacityElement = capacityElement.value;
});
// конец работы с кол-вом комнат и гостей

//=====================================

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
//получаем первоначальные значения
let dafoultTimeIn = '';
let dafoultTimeOut = '';
document.addEventListener('DOMContentLoaded', () => {
  dafoultTimeIn = timeIn.value;
  dafoultTimeOut = timeOut.value;
});
//конец работы с временем заезда и выезда

//======================================

const replaceCoordinatesInputAddress = (element) => {
  const valueMainPinMarker = element.getLatLng();
  const arrayCoordinates = Object.values(valueMainPinMarker);
  const arrayShortCoordinates = [];

  for (let i = 0; i < arrayCoordinates.length; i++) {
    arrayShortCoordinates.push(arrayCoordinates[i].toFixed(5));
  }
  housingCoordinates.value = arrayShortCoordinates.join(', ');
};

//модалка успешна
const showMessageSuccess = () => {
  const modalSuccessTemplateElement = modalSuccessTemplate.cloneNode(true);
  document.body.appendChild(modalSuccessTemplateElement);
  setTimeout(() => {
    modalSuccessTemplateElement.remove();
  }, ALERT_SHOW_TIME);
};



const hideMessageError = () => {
  const buttonClocesModalError = modalErrorTemplate.querySelector('.error__button');
  console.log(buttonClocesModalError);
  console.log(modalErrorTemplateElement);
  buttonClocesModalError.addEventListener('onclick', function () {
    console.log('yes');
    modalErrorTemplateElement.remove()
  });
};
//модалка ошибка
let modalErrorTemplateElement = '';
const showMessageError = () => {
  modalErrorTemplateElement = modalErrorTemplate.cloneNode(true);
  document.body.appendChild(modalErrorTemplateElement);
  hideMessageError();
};

//очистка формы
export const clearForm = () => {
  //очистка заголовка
  titleAdElement.value = '';
  //первоначальные данные метки
  //getStartMarkerAndMap();
  //установка первоначальных данных о типе жилья
  selectHousingElement.value = dafoultHousingElement;
  selectHousingElement.dispatchEvent(new Event('change'));
  //стираем валуе
  priceElement.value = '';
  ////установка первоначальных данных о кол-во комнат
  numberRoomsElement.value = dafoultRoomsElement;
  //установка первоначальных данных о кол-ве мест
  capacityElement.value = dafoultCapacityElement;
  //установка первоначальных данных о заезде
  timeIn.value = dafoultTimeIn;
  //установка первоначальных данных о выезде
  timeOut.value = dafoultTimeOut;
  //очистка описания
  descriptionElement.value = '';
  //снятие чекбоксов
  for (let element of featuresCheckboxElements) {
    element.checked = false;
  }
  //очистка блока с картинками
  formPhotoElements.innetHTML = '';
  //показать модалку успешной отправки сообщения
  showMessageSuccess();
}

//отправка формы
const setUserFormSubmit = (onSuccess, onError) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://23.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          onSuccess();
        } else {
          onError();
        }
      })
      .catch(() => {
        onError();
      });
  });
};
setUserFormSubmit(clearForm, showMessageError);

export {causeDeactivatingForm, activateForm, replaceCoordinatesInputAddress};
