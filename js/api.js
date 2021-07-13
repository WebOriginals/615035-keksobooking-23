import {renderPoints} from './map.js';
import { SIMILAR_PLACE_COUNT } from './variables-constants.js';
import {getThreeFilters} from "./filter.js";

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((places) => {
    console.log(places);

    renderPoints(places.slice(0, SIMILAR_PLACE_COUNT));
    // //фильтрация по типу жилья
    // getHousingTypeFilter(places);
    // //фильтрация по кол-ву комнат
    // getQuantityRoomsFilter(places);
    // //фильтрация по кол-ву гостей
    // getQuantityGuestsFilter(places)

    getThreeFilters(places);
  });

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
