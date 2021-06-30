import {createSimilarObjects, getFeatures, createPhotos} from './data.js';
import {
  SIMILAR_ADS_TEMPLATE,
  similarListFragment,
  TYPE_PLACE
} from './variables-constants.js';

const similarAds = createSimilarObjects();
similarAds.forEach(({offer, author}) => {

  const adsTemplateElement = SIMILAR_ADS_TEMPLATE.cloneNode(true);

  adsTemplateElement.querySelector('.popup__title').textContent = offer.title;
  adsTemplateElement.querySelector('.popup__text--address').textContent = offer.address;
  adsTemplateElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adsTemplateElement.querySelector('.popup__description').textContent = offer.description;
  adsTemplateElement.querySelector('.popup__avatar').src = author.avatar;
  adsTemplateElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adsTemplateElement.querySelector('.popup__text--time').textContent = `${offer.checkin}, выезд до ${offer.checkout}`;
  adsTemplateElement.querySelector('.popup__type').textContent = TYPE_PLACE[offer.type];
  adsTemplateElement.querySelector('.popup__features').textContent = getFeatures(offer.features);
  adsTemplateElement.querySelector('.popup__photos').appendChild(createPhotos( offer.photos, adsTemplateElement));

  //similarListFragment.appendChild(adsTemplateElement);
  return adsTemplateElement;
});

document.body.appendChild(similarListFragment);

export {similarListFragment };
