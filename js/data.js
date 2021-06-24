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
  SIMILAR_OBJECTS_COUNT
} from './variablesConstants.js';

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

export {creatingSimilarObjects};
