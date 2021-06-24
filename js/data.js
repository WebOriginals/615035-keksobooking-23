import {getRandomNumber, getRandomFloatingPointNumber, getСalculatingRandomNumber, randomArrElements} from './util.js';
import {
  TITLE,
  ADDRESS,
  PRICE,
  TYPE,
  ROOMS,
  GUESTS,
  CHECKIN,
  CHECKOUT,
  FEATURES,
  DESCRIPTION,
  PHOTOS,
  SIMILAR_OBJECTS_COUNT, COMFORT, arrayRussifiedElements, SIMILAR_LIST_FRAGMENT
} from './variables-сonstants.js';


const createPlace = () => {
  const getRandomAvatarIndex = getRandomNumber(1, 10);
  const getRandomNumberImg = getRandomAvatarIndex === 10 ? getRandomAvatarIndex : `0${getRandomAvatarIndex}`;
  return {
    author: {
      avatar: `img/avatars/user${getRandomNumberImg}.png`,
    },
    offer: {
      title: getСalculatingRandomNumber(TITLE),
      address: getСalculatingRandomNumber(ADDRESS),
      price: getСalculatingRandomNumber(PRICE),
      type: getСalculatingRandomNumber(TYPE),
      rooms: getСalculatingRandomNumber(ROOMS),
      guests: getСalculatingRandomNumber(GUESTS),
      checkin: getСalculatingRandomNumber(CHECKIN),
      checkout: getСalculatingRandomNumber(CHECKOUT),
      features: randomArrElements(FEATURES),
      description: getСalculatingRandomNumber(DESCRIPTION),
      photos: randomArrElements(PHOTOS),
    },
    location: {
      lat: getRandomFloatingPointNumber(35.65000, 35.70000, 5),
      lng: getRandomFloatingPointNumber(139.70000, 139.80000, 5),
    },
  };
};
const creatingSimilarObjects = () => new Array(SIMILAR_OBJECTS_COUNT).fill(null).map(() => createPlace());
const getFeatures = (arrayPhoto) => {
  const arrayComfortElements = arrayPhoto;
  for (let i = 0; i < arrayComfortElements.length; i++) {
    const elementArray = COMFORT[arrayComfortElements[i]];
    arrayRussifiedElements.push(elementArray);
  }
};
const createPhotos = (name, tenplate) => {
  const photosElement = tenplate.querySelector('.popup__photos');
  const photoElement = tenplate.querySelector('.popup__photo');
  const arraySrcPhotos = name;
  const currentPhotoTemplate = photoElement.cloneNode(true);
  for (let i = 0; i < arraySrcPhotos.length; i++) {
    currentPhotoTemplate.src = arraySrcPhotos[i];
    SIMILAR_LIST_FRAGMENT.appendChild(currentPhotoTemplate);
  }
  photosElement.innerHTML = '';
  photosElement.appendChild(SIMILAR_LIST_FRAGMENT);
}

export {creatingSimilarObjects, getFeatures, createPhotos};
