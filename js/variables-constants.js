const SIMILAR_ADS_TEMPLATE = document.querySelector('#card')
  .content
  .querySelector('.popup');
const similarListFragment = document.createDocumentFragment();
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
const timeIn = formElement.querySelector('#timein');
const timeOut = formElement.querySelector('#timeout');
const descriptionElement = formElement.querySelector('#description');
const featuresCheckboxElements = formElement.querySelectorAll('.features__checkbox');
const formPhotoElements = formElement.querySelectorAll('.ad-form__photo');
const housingCoordinates = formElement.querySelector('#address');

export {
  SIMILAR_ADS_TEMPLATE,
  similarListFragment,
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
  timeIn,
  timeOut,
  housingCoordinates,
  titleAdElement,
  descriptionElement,
  featuresCheckboxElements,
  formPhotoElements
};
