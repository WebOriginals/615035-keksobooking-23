const similarAdsTemplateElement = document.querySelector('#card')
  .content
  .querySelector('.popup');
const modalSuccessTemplateElement = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);
const modalErrorTemplateElement = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);
const TYPE_PLACE = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};
const COMFORT = {
  'wifi': 'wifi',
  'dishwasher': 'посудомоечная машина',
  'parking': 'парковка',
  'washer': 'стиральная машина',
  'elevator': 'лифт',
  'conditioner': 'кондиционер',
};
const OPTIONS_DATA_MIN = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};
const formElement = document.querySelector('.ad-form');
const fieldsetsElement = formElement.querySelectorAll('fieldset');
const titleAdElement = formElement.querySelector('#title');
const titleAdMinLength = +titleAdElement.getAttribute('minlength');
const titleAdMaxLength = +titleAdElement.getAttribute('maxlength');
const selectHousingElement = formElement.querySelector('#type');
const priceElement = formElement.querySelector('#price');
const numberRoomsElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');
const descriptionElement = formElement.querySelector('#description');
const featuresCheckboxElements = formElement.querySelectorAll('.features__checkbox');
const formPhotoElements = formElement.querySelectorAll('.ad-form__photo');
const housingCoordinatesElement = formElement.querySelector('#address');
const buttonResetFormElement = formElement.querySelector('.ad-form__reset');
const ALERT_SHOW_TIME = 3000;
const SIMILAR_PLACE_COUNT = 10;
const filterElement = document.querySelector('.map__filters');
const filterSelectHousingElement = filterElement.querySelector('#housing-type');
const filterSelectPriceElement = filterElement.querySelector('#housing-price');
const filterSelectRoomElement = filterElement.querySelector('#housing-rooms');
const filterSelectGuestsElement = filterElement.querySelector('#housing-guests');
const allFilterCheckboxesElement = filterElement.querySelectorAll('.map__checkbox');
const fileChooserUserElement = formElement.querySelector('.ad-form__field input[type=file]');
const avatarUserPreviewElement = formElement.querySelector('.ad-form-header__preview img');

const fileChooserHousingElement = formElement.querySelector('.ad-form__upload input[type=file]');
const avatarHousingPreviewElement = formElement.querySelector('.ad-form__photo img');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PriceValues = {
  LOW: 10000,
  HIGHT: 50000,
};

export {
  FILE_TYPES,
  fileChooserUserElement,
  avatarUserPreviewElement,
  fileChooserHousingElement,
  avatarHousingPreviewElement,
  similarAdsTemplateElement,
  TYPE_PLACE,
  COMFORT,
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
  housingCoordinatesElement,
  titleAdElement,
  descriptionElement,
  featuresCheckboxElements,
  formPhotoElements,
  modalSuccessTemplateElement,
  modalErrorTemplateElement,
  ALERT_SHOW_TIME,
  buttonResetFormElement,
  SIMILAR_PLACE_COUNT,
  filterElement,
  filterSelectHousingElement,
  filterSelectPriceElement,
  filterSelectRoomElement,
  filterSelectGuestsElement,
  allFilterCheckboxesElement,
  PriceValues
};
