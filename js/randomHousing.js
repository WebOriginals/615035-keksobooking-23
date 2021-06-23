import {creatingSimilarObjects} from './data.js';

// МАССИВ ИЗ СЪЕМНЫХ ЖИЛИЩ
import {SIMILAR_ADS_TEMPLATE, SIMILAR_LIST_ELEMENT} from './variablesConstants.js';

const similarAds = creatingSimilarObjects();

//ПЕРЕБОР МАССИВА
similarAds.forEach(({offer, author}) => {
  //КЛОНИРУЕМ
  const adsElementTemplate = SIMILAR_ADS_TEMPLATE.cloneNode(true);
  const photos = adsElementTemplate.querySelector('.popup__photos');
  const photo = adsElementTemplate.querySelector('.popup__photo');
  const arraySrcPhotos = offer.photos;
  for (let i = 0; i < arraySrcPhotos.length; i++) {
    const currentPhoto = photo.cloneNode(true);
    currentPhoto.src = arraySrcPhotos[i];
    photos.appendChild(currentPhoto);
  };
  photo.remove()

  const typePlace = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalow': 'Бунгало',
    'hotel': 'Отель',
  };

  const arrayComfortElements = offer.features;
  const comfort = {
    'wifi': 'wifi',
    'dishwasher': 'посудомоечная машина',
    'parking': 'парковка',
    'washer': 'стиральная машина',
    'elevator': 'лифт',
    'conditioner': 'кондиционер',
  };


  let arrayRussifiedElements = [];
  for (let i = 0; i < arrayComfortElements.length; i++) {
    const elemmentArray = comfort[arrayComfortElements[i]];
    arrayRussifiedElements.push(elemmentArray);
  };

  adsElementTemplate.querySelector('.popup__title').textContent = offer.title;
  adsElementTemplate.querySelector('.popup__text--address').textContent = offer.address;
  adsElementTemplate.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adsElementTemplate.querySelector('.popup__description').textContent = offer.description;
  adsElementTemplate.querySelector('.popup__avatar').src = author.avatar;
  adsElementTemplate.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adsElementTemplate.querySelector('.popup__text--time').textContent = `${offer.checkin}, выезд до ${offer.checkout}`;
  adsElementTemplate.querySelector('.popup__type').textContent = typePlace[offer.type];
  adsElementTemplate.querySelector('.popup__features').textContent = Object.values(arrayRussifiedElements).join(', ');

  SIMILAR_LIST_FRAGMENT.appendChild(adsElementTemplate);
});
document.body.appendChild(SIMILAR_LIST_FRAGMENT);
