const TITLE = [
  'Добро пожаловать, Вы приехали в Красеодар!',
  'Добро пожаловать, Вы приехали в Москву!',
  'Добро пожаловать, Вы приехали в Ростов!',
  'Добро пожаловать, Вы приехали в Екатеринбург!',
  'Добро пожаловать, Вы приехали в Иркутск!',
  'Добро пожаловать, Вы приехали в Ижевск!',
  'Добро пожаловать, Вы приехали в Киров!',
  'Добро пожаловать, Вы приехали в Владивосток!',
];
const ADDRESS = [
  '45.349132, 39.067906',
  '45.461106, 39.010227',
  '45.482363, 38.659352',
  '45.390029, 39.387196',
  '45.458206, 39.479893',
  '45.110269, 39.029453',
];
const PRICE = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const ROOMS = [1, 2, 3, 4, 5, 6, 7, 8];
const GUESTS = [2, 4, 6, 8, 10, 12, 14, 20];
const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = [
  'Турбаза «Горная» (п. Каменномостский») находится в живописном месте на высоком скалистом берегу реки Белой, к которому примыкает каньон, открывающий сказочные картины Хаджохской теснины. Ее корпуса расположены в старом фруктовом саду. На территории базы — беседки, мангалы, спортивная площадка, сауна, кафе, есть спуск к реке и небольшой пляж.',
  'Туристический комплекс «Горная Деревня» принял своих первых посетителей в 2004 году. Деревянные срубы туркомплекса органично вписалась в окружающую природу. Территория базы находится у подножия горы Трезубец на берегу реки Белой (Майкопский район, Республика Адыгея). В этом месте, в хребте, ставшем поперек реки, образовался разлом, называемый туристами Большой Гранитный каньон, на выходе из которого, на опушке, расположился наш туркомплекс. ',
  'Высокогорная турбаза «Лаго-Наки» расположена в 90 км от города Майкопа на высоте 1750 м над уровнем моря. База состоит из нескольких корпусов, два из которых построены совсем недавно. Всего на базе могут разместиться 110 человек. В комфортабельных номерах есть все удобства, а на территории – беседки и мангалы. ',
  'Туркомплекс «Горное Настроение» находится на одной из полян в районе хребта Азиш-Тау (высота 1320 метров над уровнем моря), с которой открывается замечательный вид на Лагонакское нагорье и трехтысячники Главного Кавказского хребта в ослепительно белом одеяле ледников и снежников.',
  'Туркомплекс «Горное Вдохновение» находится рядом с одним из интереснейших экскурсионных объектов – Свято-Михайловским монастырем. На территории комплекса расположена действующая часовенка. Она открыта для посещения гостями комплекса, а церковные служители проводят там таинственные обряды венчания и крещения.',
  'Туркомплекс «Горное Наслаждение» находится на одной из красивейших полян, расположенных вдоль дороги, ведущей к высокогорному плато Лаго-Наки. Огромная поляна, на которой построен комплекс, с одной стороны граничит с отвесным скальным обрывом, откуда открывается замечательный вид, а с других окружена лесом.',
];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const SIMILAR_OBJECTS_COUNT = 5;
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
const housingCoordinates = formElement.querySelector('#address');

export {
  TITLE,
  ADDRESS,
  PRICE,
  TYPE,
  ROOMS,
  GUESTS,
  CHECKIN,
  CHECKOUT,
  FEATURES,
  DESCRIPTION,
  PHOTOS,
  SIMILAR_OBJECTS_COUNT,
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
  titleAdElement
};