import {creatingSimilarObjects} from './data.js';
import {
  SIMILAR_ADS_TEMPLATE,
  SIMILAR_LIST_FRAGMENT,
  TYPE_PLACE,
  COMFORT,
  arrayRussifiedElements
} from './variables-сonstants.js';

const similarAds = creatingSimilarObjects();

similarAds.forEach(({offer, author}) => {
  const adsTemplateElement = SIMILAR_ADS_TEMPLATE.cloneNode(true);
  const photosElement = adsTemplateElement.querySelector('.popup__photos');
  const photoElement = adsTemplateElement.querySelector('.popup__photo');
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

  adsTemplateElement.querySelector('.popup__title').textContent = offer.title;
  adsTemplateElement.querySelector('.popup__text--address').textContent = offer.address;
  adsTemplateElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adsTemplateElement.querySelector('.popup__description').textContent = offer.description;
  adsTemplateElement.querySelector('.popup__avatar').src = author.avatar;
  adsTemplateElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adsTemplateElement.querySelector('.popup__text--time').textContent = `${offer.checkin}, выезд до ${offer.checkout}`;
  adsTemplateElement.querySelector('.popup__type').textContent = TYPE_PLACE[offer.type];
  adsTemplateElement.querySelector('.popup__features').textContent = Object.values(arrayRussifiedElements).join(', ');

  SIMILAR_LIST_FRAGMENT.appendChild(adsTemplateElement);
});
document.body.appendChild(SIMILAR_LIST_FRAGMENT);
