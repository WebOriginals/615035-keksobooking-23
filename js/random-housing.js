import {creatingSimilarObjects, getFeatures, createPhotos} from './data.js';
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

  createPhotos(offer.photos, adsTemplateElement);
  getFeatures(offer.features);

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
