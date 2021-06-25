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
  SIMILAR_OBJECTS_COUNT, COMFORT, similarImagesfragment
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
const createSimilarObjects = () => new Array(SIMILAR_OBJECTS_COUNT).fill(null).map(() => createPlace());
const getFeatures = (arrayPhoto) => {
  let arrayRussifiedElements = [];
  for (let i = 0; i < arrayPhoto.length; i++) {
    const elementArray = COMFORT[arrayPhoto[i]];
    arrayRussifiedElements.push(elementArray);
  }
  return Object.values(arrayRussifiedElements).join(', ');
};

const createPhotos = (name, template) => {
  console.log(name);
  const currentPhotoTemplate = template.querySelector('.popup__photo').cloneNode(true);
  for (let i = 0; i < name.length; i++) {
    currentPhotoTemplate.src = name[i];
    similarImagesfragment.appendChild(currentPhotoTemplate);
    console.log(similarImagesfragment);
  }
  template.querySelector('.popup__photos').innerHTML = '';
  console.log(similarImagesfragment);
  return similarImagesfragment;
}

export {createSimilarObjects, getFeatures, createPhotos};
