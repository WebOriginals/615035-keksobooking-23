
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
  TYPE_PLACE,
  COMFORT,
  OPTIONS_DATA_MIN,
  ALERT_SHOW_TIME,
  SIMILAR_PLACE_COUNT,
  PriceValues
};
