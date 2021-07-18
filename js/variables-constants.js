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
const ALERT_SHOW_TIME = 3000;
const SIMILAR_PLACE_COUNT = 10;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PriceValues = {
  LOW: 10000,
  HEIGHT: 50000,
};

export {
  FILE_TYPES,
  similarAdsTemplateElement,
  TYPE_PLACE,
  COMFORT,
  OPTIONS_DATA_MIN,
  modalSuccessTemplateElement,
  modalErrorTemplateElement,
  ALERT_SHOW_TIME,
  SIMILAR_PLACE_COUNT,
  PriceValues
};
