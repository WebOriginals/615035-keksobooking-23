import {getRandomNumber, getRandomFloatingPointNumber, getСalculatingRandomNumber, randomArrElements} from './util.js';
import {COMFORT} from './variables-constants.js';

const similarAds = (places) => {
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

  return adsTemplateElement;
});
document.body.appendChild(similarListFragment);
};
// преобразуем массив в русский
const getFeatures = (arrayPhoto) => {

  const arrayRussifiedElements = [];
  for (let i = 0; i < arrayPhoto.length; i++) {
    const elementArray = COMFORT[arrayPhoto[i]];
    arrayRussifiedElements.push(elementArray);
  }
  return Object.values(arrayRussifiedElements).join(', ');
};

//создаем разметку для картинок описывающее место
const createPhotos = (name, template) => {
  const similarImagesFragment = document.createDocumentFragment();

  for (let i = 0; i < name.length; i++) {
    const currentPhotoTemplate = template.querySelector('.popup__photo').cloneNode(true);
    currentPhotoTemplate.src = name[i];
    similarImagesFragment.appendChild(currentPhotoTemplate);
  }
  template.querySelector('.popup__photos').innerHTML = '';
  return similarImagesFragment;
};

export { getFeatures, createPhotos, similarAds};
