const URL_DATA_SERVER = 'https://23.javascript.pages.academy/keksobooking/data';
const URL_FOR_DATA_SERVER = 'https://23.javascript.pages.academy/keksobooking';
const TYPE_PLACE = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};
const COMFORT = {
  'wifi': '<div class="map__feature map__feature--wifi"></div>',
  'dishwasher': '<div class="map__feature map__feature--dishwasher"></div>',
  'parking': '<div class="map__feature map__feature--parking"></div>',
  'washer': '<div class="map__feature map__feature--washer"></div>',
  'elevator': '<div class="map__feature map__feature--elevator"></div>',
  'conditioner': '<div class="map__feature map__feature--conditioner"></div>',
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
  TYPE_PLACE,
  COMFORT,
  OPTIONS_DATA_MIN,
  ALERT_SHOW_TIME,
  SIMILAR_PLACE_COUNT,
  PriceValues,
  URL_FOR_DATA_SERVER,
  URL_DATA_SERVER
};
