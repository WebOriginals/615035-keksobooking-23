import {similarObjects} from './data.js';

// МАССИВ ИЗ СЪЕМНЫХ ЖИЛИЩЬ
import {SIMILAR_ADS_TEMPLATE, SIMILAR_LIST_ELEMENT} from './variablesConstants.js';
const SIMILAR_ADS = similarObjects();
const SIMILAR_LIST_FRAGMENT = document.createDocumentFragment();

//ПЕРЕБОР МАССИВА
SIMILAR_ADS.forEach(({offer, author}) => {
  //КЛОНИРУЕМ
  const ADS_ELEMENT = SIMILAR_ADS_TEMPLATE.cloneNode(true);
  let img = '';
  const arrphoto = offer.photos;
  for(let i = 0; i < arrphoto.length ; i++){
    img += `<img src='${arrphoto[i]}' class='popup__photo' width='45' height='40' alt='Фотография жилья'>`;
  }

  let housing;
  if(offer.type === 'palace'){
    housing = 'Дворец';
  } else if(offer.type === 'flat'){
    housing = 'Квартира';
  } else if(offer.type === 'bungalow'){
    housing = 'Бунгало';
  } else if(offer.type === 'hotel'){
    housing = 'Отель';
  } else if(offer.type === 'house'){ housing = 'Дом'; }

  const conveniences = offer.features.reduce((newObj, item) => {
    newObj[item] = item;
    return newObj;
  }, {});

  if(conveniences.wifi){
    conveniences.wifi = 'wifi';
  }
  if(conveniences.dishwasher){
    conveniences.dishwasher = 'посудомоечная машина';
  }
  if(conveniences.parking){
    conveniences.parking = 'парковка';
  }
  if(conveniences.washer){
    conveniences.washer = 'стиральная машина';
  }
  if(conveniences.elevator){
    conveniences.elevator = 'лифт';
  }
  if(conveniences.conditioner){
    conveniences.conditioner = 'кондиционер';
  }

  ADS_ELEMENT.querySelector('.popup__title').textContent = offer.title;
  ADS_ELEMENT.querySelector('.popup__text--address').textContent = offer.address;
  ADS_ELEMENT.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  ADS_ELEMENT.querySelector('.popup__description').textContent = offer.description;
  ADS_ELEMENT.querySelector('.popup__avatar').src = author.avatar;
  ADS_ELEMENT.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  ADS_ELEMENT.querySelector('.popup__text--time').textContent = `${offer.checkin}, выезд до ${offer.checkout}`;
  ADS_ELEMENT.querySelector('.popup__photos').innerHTML = img;
  ADS_ELEMENT.querySelector('.popup__type').textContent = housing;
  ADS_ELEMENT.querySelector('.popup__features').textContent = Object.values(conveniences).join(', ');

  SIMILAR_LIST_FRAGMENT.appendChild(ADS_ELEMENT);
});
SIMILAR_LIST_ELEMENT.appendChild(SIMILAR_LIST_FRAGMENT);
