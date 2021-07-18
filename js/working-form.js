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
  timeInElement,
  timeOutElement,
  titleAdElement,
  housingCoordinatesElement,
  descriptionElement,
  featuresCheckboxElements,
  formPhotoElements,
  modalErrorTemplateElement,
  modalSuccessTemplateElement,
  ALERT_SHOW_TIME,
  buttonResetFormElement,
  filterElement,
  allFilterCheckboxesElement,
  filterSelectHousingElement,
  filterSelectPriceElement,
  filterSelectRoomElement,
  filterSelectGuestsElement,
  fileChooserUserElement,
  avatarUserPreviewElement,
  fileChooserHousingElement,
  avatarHousingPreviewElement,
  FILE_TYPES
} from './variables-constants.js';
import {getStartMarkerAndMap} from './map.js';
import {getData, sendData} from './api.js';
import {mainRenderPonts} from './filter.js';

//деактивация формы
const causeDeactivatingForm = () => {
  for (let i = 0; i < fieldsetsElement.length; i++) {
    fieldsetsElement[i].setAttribute('disabled', '');
  }

};
//активация формы
const activateForm = () => {
  formElement.classList.remove('ad-form--disabled');
  for (let i = 0; i < fieldsetsElement.length; i++) {
    fieldsetsElement[i].removeAttribute('disabled');
  }

  housingCoordinatesElement.value = [35.681700, 139.753891];
};
// активация цильтра
export const activateFilter = () => filterElement.classList.remove('ad-form--disabled');


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
const filterChangeHandler = (evt) => {
  const selectedOptionValue = evt.target.value;
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
let defaultHousingElement = '';
document.addEventListener('DOMContentLoaded', () => defaultHousingElement = selectHousingElement.value);
//вызываем функция и передаем данные как только ст загрузится
selectHousingElement.dispatchEvent(new Event('change'));
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
checkCapacity();
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
let defaultRoomsElement = '';
let defaultCapacityElement = '';
document.addEventListener('DOMContentLoaded', () => {
  defaultRoomsElement = numberRoomsElement.value;
  defaultCapacityElement = capacityElement.value;
});
// конец работы с кол-вом комнат и гостей

//работа с временем заезда и выезда
const changeTimeIn = (evt) => {
  const timeInValue = evt.target.value;
  timeOutElement.value = timeInValue;
};
const changeTimeOut = (evt) => {
  const timeOutValue = evt.target.value;
  timeInElement.value = timeOutValue;
};

timeInElement.addEventListener('change', changeTimeIn);
timeOutElement.addEventListener('change', changeTimeOut);
//получаем первоначальные значения
let defaultTimeIn = '';
let defaultTimeOut = '';
document.addEventListener('DOMContentLoaded', () => {
  defaultTimeIn = timeInElement.value;
  defaultTimeOut = timeOutElement.value;
});
//конец работы с временем заезда и выезда

const replaceCoordinatesInputAddress = (element) => {
  const valueMainPinMarker = element.getLatLng();
  const arrayCoordinates = Object.values(valueMainPinMarker);
  const arrayShortCoordinates = [];

  for (let i = 0; i < arrayCoordinates.length; i++) {
    arrayShortCoordinates.push(arrayCoordinates[i].toFixed(5));
  }
  housingCoordinatesElement.value = arrayShortCoordinates.join(', ');
};

//модалка успешна
const showMessageSuccess = () => {
  document.body.appendChild(modalSuccessTemplateElement);
  setTimeout(() => {
    modalSuccessTemplateElement.remove();
  }, ALERT_SHOW_TIME);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      modalSuccessTemplateElement.remove();
    }
  });
  document.querySelector('body').addEventListener('click', () => modalSuccessTemplateElement.remove());
};

//модалка ошибка
const showMessageError = () => {
  document.body.appendChild(modalErrorTemplateElement);
  const buttonClocesModalError = modalErrorTemplateElement.querySelector('.error__button');
  buttonClocesModalError.addEventListener('click', () => modalErrorTemplateElement.remove());
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      modalErrorTemplateElement.remove();
    }
  });
  document.querySelector('body').addEventListener('click', () => modalErrorTemplateElement.remove());
};

//сообщение об ошибке получений данных с сервера
export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = '#fff';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
//сброс фильтров
const clearFilter = () => {
  filterSelectHousingElement.value = 'any';
  filterSelectPriceElement.value = 'any';
  filterSelectRoomElement.value = 'any';
  filterSelectGuestsElement.value = 'any';
  allFilterCheckboxesElement.forEach((checkbox) => checkbox.checked = false);
  getData(
    (places) => mainRenderPonts(places),
    () => showAlert('Упс! Сервер не захотел отправлять вам данные, Сори!'),
  );
};
//очистка формы
export const clearForm = () => {
  checkCapacity();
  //очистка заголовка
  titleAdElement.value = '';
  //первоначальные данные метки
  getStartMarkerAndMap();
  //установка первоначальных данных о типе жилья
  selectHousingElement.value = defaultHousingElement;
  selectHousingElement.dispatchEvent(new Event('change'));
  //стираем валуе
  priceElement.value = '';
  ////установка первоначальных данных о кол-во комнат
  numberRoomsElement.value = defaultRoomsElement;
  //установка первоначальных данных о кол-ве мест
  capacityElement.value = defaultCapacityElement;
  //установка первоначальных данных о заезде
  timeInElement.value = defaultTimeIn;
  //установка первоначальных данных о выезде
  timeOutElement.value = defaultTimeOut;
  //очистка описания
  descriptionElement.value = '';
  //снятие чекбоксов
  for (const element of featuresCheckboxElements) {
    element.checked = false;
  }
  //очистка блока с картинками
  formPhotoElements.innetHTML = '';
  //подстановка первоначальных данных
  housingCoordinatesElement.value = [35.681700, 139.753891];
  avatarUserPreviewElement.src = 'img/muffin-grey.svg';
  avatarHousingPreviewElement.src = 'img/muffin-grey.svg';
  clearFilter();
};

//очистка формы и вызов модалки успешной отправки
const clearFormShowModalSuccess = () => {
  clearForm();
  showMessageSuccess();
};

//работа с ававтаркой
const rendersPicture = (typeFile, avatar) => {
  typeFile.addEventListener('change', () => {
    // получаем файл который выбрал пользователь
    const file = typeFile.files[0];
    const fileName = file.name.toLowerCase();

    // Проверит на доступные расширения
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        avatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};
rendersPicture(fileChooserUserElement, avatarUserPreviewElement);
rendersPicture(fileChooserHousingElement, avatarHousingPreviewElement);

// вешаем обработчик событий на очистить , и чистим все поля
buttonResetFormElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
});

//отправка формы
const setUserFormSubmit = (onSuccess, onFail) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};
setUserFormSubmit(clearFormShowModalSuccess, showMessageError);

export {causeDeactivatingForm, activateForm, replaceCoordinatesInputAddress};
