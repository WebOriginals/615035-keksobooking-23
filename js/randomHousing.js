import {creatingSimilarObjects} from './data.js';

// МАССИВ ИЗ СЪЕМНЫХ ЖИЛИЩ
import {SIMILAR_ADS_TEMPLATE, SIMILAR_LIST_FRAGMENT, TYPE_PLACE, COMFORT, arrayRussifiedElements} from './variablesConstants.js';

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
    SIMILAR_LIST_FRAGMENT.appendChild(currentPhoto);
  }
  photos.innerHTML = '';
  photos.appendChild(SIMILAR_LIST_FRAGMENT);

  const arrayComfortElements = offer.features;

  for (let i = 0; i < arrayComfortElements.length; i++) {
    const elemmentArray = COMFORT[arrayComfortElements[i]];
    arrayRussifiedElements.push(elemmentArray);
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
