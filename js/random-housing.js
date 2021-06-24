import {creatingSimilarObjects} from './data.js';

// МАССИВ ИЗ СЪЕМНЫХ ЖИЛИЩ
import {
  SIMILAR_ADS_TEMPLATE,
  SIMILAR_LIST_FRAGMENT,
  TYPE_PLACE,
  COMFORT,
  arrayRussifiedElements
} from './variables-сonstants.js';

const similarAds = creatingSimilarObjects();


//ПЕРЕБОР МАССИВА
similarAds.forEach(({offer, author}) => {
  //КЛОНИРУЕМ

  const adsElementTemplate = SIMILAR_ADS_TEMPLATE.cloneNode(true);
  const photosElement = adsElementTemplate.querySelector('.popup__photos');
  const photoElement = adsElementTemplate.querySelector('.popup__photo');
  const arraySrcPhotos = offer.photos;
  const currentPhotoTemplate = photoElement.cloneNode(true);
  for (let i = 0; i < arraySrcPhotos.length; i++) {
    currentPhotoTemplate.src = arraySrcPhotos[i];
    SIMILAR_LIST_FRAGMENT.appendChild(currentPhotoTemplate);
  }
  photosElement.innerHTML = '';
  photosElement.appendChild(SIMILAR_LIST_FRAGMENT);

  const arrayComfortElements = offer.features;

  for (let i = 0; i < arrayComfortElements.length; i++) {
    const elementArray = COMFORT[arrayComfortElements[i]];
    arrayRussifiedElements.push(elementArray);
  }

  adsElementTemplate.querySelector('.popup__title').textContent = offer.title;
  adsElementTemplate.querySelector('.popup__text--address').textContent = offer.address;
  adsElementTemplate.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adsElementTemplate.querySelector('.popup__description').textContent = offer.description;
  adsElementTemplate.querySelector('.popup__avatar').src = author.avatar;
  adsElementTemplate.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adsElementTemplate.querySelector('.popup__text--time').textContent = `${offer.checkin}, выезд до ${offer.checkout}`;
  adsElementTemplate.querySelector('.popup__type').textContent = TYPE_PLACE[offer.type];
  adsElementTemplate.querySelector('.popup__features').textContent = Object.values(arrayRussifiedElements).join(', ');

  SIMILAR_LIST_FRAGMENT.appendChild(adsElementTemplate);
});
document.body.appendChild(SIMILAR_LIST_FRAGMENT);
