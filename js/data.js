import {COMFORT} from './variables-constants.js';

// преобразуем массив в русский
const getFeatures = (arrayComfort) => {
  const arrayRussifiedElements = [];
  arrayComfort.forEach((element) => {
    const elementArray = COMFORT[element];
    arrayRussifiedElements.push(elementArray);
  });
  return Object.values(arrayRussifiedElements).join(' ');
};

//создаем разметку для картинок описывающее место
const createPhotos = (name, template) => {
  const similarImagesFragment = document.createDocumentFragment();
  name.forEach((element) => {
    const currentPhotoTemplate = template.querySelector('.popup__photo').cloneNode(true);
    currentPhotoTemplate.src = element;
    similarImagesFragment.appendChild(currentPhotoTemplate);
  });
  template.querySelector('.popup__photos').innerHTML = '';
  return similarImagesFragment;
};

export { getFeatures, createPhotos};
