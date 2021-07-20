import {
  OPTIONS_DATA_MIN,
  ALERT_SHOW_TIME,
  FILE_TYPES
} from './variables-constants.js';
import {getStartMarkerAndMap} from './map.js';
import {getData, sendData} from './api.js';
import {mainRenderPoints} from './filter.js';


const modalSuccessTemplateElement = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);
const modalErrorTemplateElement = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);
//деактивация формы
export const formElement = document.querySelector('.ad-form');
const fieldsetsElement = formElement.querySelectorAll('fieldset');
const causeDeactivatingForm = () => {
  fieldsetsElement.forEach((element) => {
    element.disabled = true;
  });
};
//активация формы
const defaultCoordinatesValue = [35.681700, 139.753891];
export const housingCoordinatesElement = formElement.querySelector('#address');
const activateForm = () => {
  formElement.classList.remove('ad-form--disabled');
  fieldsetsElement.forEach((element) => {
    element.disabled = false;
  });
  housingCoordinatesElement.value = defaultCoordinatesValue;
};
// активация цильтра
export const filterElement = document.querySelector('.map__filters');
export const activateFilter = () => filterElement.classList.remove('ad-form--disabled');


// работа с заголовком объявления
const titleAdElement = formElement.querySelector('#title');
const titleAdMinLength = +titleAdElement.getAttribute('minlength');
const titleAdMaxLength = +titleAdElement.getAttribute('maxlength');
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
const priceElement = formElement.querySelector('#price');
const selectHousingElement = formElement.querySelector('#type');
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
document.addEventListener('DOMContentLoaded', () => {
  defaultHousingElement = selectHousingElement.value;
});
//вызываем функция и передаем данные как только ст загрузится
selectHousingElement.dispatchEvent(new Event('change'));
// конец работы с select #type жилья и ценой

//работа с кол-вом комнат и гостей
const numberRoomsElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');
const setDisabledOption = (options, rooms) => {
  rooms = +rooms;
  options.forEach((element) => {
    if (rooms === 100) {
      element.disabled = (+element.value !== 0);
    } else {
      element.disabled = (rooms < +element.value || +element.value === 0);
    }
  })
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
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');
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

  arrayCoordinates.forEach((element) => arrayShortCoordinates.push(element.toFixed(5)));
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
  document.body.addEventListener('click', () => modalSuccessTemplateElement.remove());
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
  document.body.addEventListener('click', () => modalErrorTemplateElement.remove());
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
const allFilterCheckboxesElement = filterElement.querySelectorAll('.map__checkbox');
export const filterSelectHousingElement = filterElement.querySelector('#housing-type');
export const filterSelectPriceElement = filterElement.querySelector('#housing-price');
export const filterSelectRoomElement = filterElement.querySelector('#housing-rooms');
export const filterSelectGuestsElement = filterElement.querySelector('#housing-guests');
const clearFilter = () => {
  filterSelectHousingElement.value = 'any';
  filterSelectPriceElement.value = 'any';
  filterSelectRoomElement.value = 'any';
  filterSelectGuestsElement.value = 'any';
  const makeChecked = (checkbox) => checkbox.checked = false;
  allFilterCheckboxesElement.forEach((checkbox) => makeChecked(checkbox));
  getData(
    (places) => mainRenderPoints(places),
    () => showAlert('Упс! Сервер не захотел отправлять вам данные, Сори!'),
  );
};
//очистка формы
const descriptionElement = formElement.querySelector('#description');
const featuresCheckboxElements = formElement.querySelectorAll('.features__checkbox');
const formPhotoElements = formElement.querySelectorAll('.ad-form__photo');
const avatarHousingPreviewElement = formElement.querySelector('.ad-form__photo img');
const avatarUserPreviewElement = formElement.querySelector('.ad-form-header__preview img');
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
  housingCoordinatesElement.value = defaultCoordinatesValue;
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
const fileChooserHousingElement = formElement.querySelector('.ad-form__upload input[type=file]');
const fileChooserUserElement = formElement.querySelector('.ad-form__field input[type=file]');
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
const buttonResetFormElement = formElement.querySelector('.ad-form__reset');
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
