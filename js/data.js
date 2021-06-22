import {randomNumber, randomFloatingPointNumber, getСalculatingRandomNumber, randomArrElements} from './util.js';
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
  SIMILAR_OBJECTS_COUNT,
} from './variablesConstants.js';

const createPlace = () => {
  const randomAvatarIndex = randomNumber(1, 10);
  const randomNumberImg = randomAvatarIndex === 10 ? randomAvatarIndex : `0${randomAvatarIndex}`;
  return {
    author: {
      avatar: `img/avatars/user${randomNumberImg}.png`,
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
      lat: randomFloatingPointNumber(35.65000, 35.70000, 5),
      lng: randomFloatingPointNumber(139.70000, 139.80000, 5),
    },
  };
};
const similarObjects = () => new Array(SIMILAR_OBJECTS_COUNT).fill(null).map(() => createPlace());

export {similarObjects};
