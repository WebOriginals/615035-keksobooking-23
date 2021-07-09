import {COMFORT} from './variables-constants.js';

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

export { getFeatures, createPhotos};
