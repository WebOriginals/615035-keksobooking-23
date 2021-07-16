import {renderPoints} from './map.js';
import {filter, SIMILAR_PLACE_COUNT} from './variables-constants.js';
import {
 compareFeatures,
  getQuantityGuestsFilter,
  getHousingTypeFilter,
  getQuantityRoomsFilter,
  getPriceRoomFilter,
  filterAll
} from "./filter.js";
import {activateFilter} from "./working-form.js";

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((places) => {
    console.log(places);
    renderPoints(places.slice(0, SIMILAR_PLACE_COUNT));
    activateFilter();
    //фильтрация по типу жилья
    // getHousingTypeFilter(places);
    // //фильтрация по кол-ву комнат
    // getQuantityRoomsFilter(places);
    // //фильтрация по кол-ву гостей
    // getQuantityGuestsFilter(places);
    // //фильтрация по ценам
    // getPriceRoomFilter(places);
    // //сортировка по удобствам
     filter.addEventListener('change', () => {
       console.log(filterAll(places))
     });

    // function filterAll(places) {
    //   const housingKey = 'flat';
    //   const roomsKey = 4;
    //   return places.filter(({type, rooms}) => type === housingKey && rooms === roomsKey);
    // }
    // console.log(filterAll([
    //   {type: 'house', rooms: 4},
    //   {type: 'flat', rooms: 4},
    //   {type: 'flat', rooms: 4},
    //   {type: 'flat', rooms: 1}
    // ]))

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
        //ошибка в форме
        onFail();
      }
    })
    //если что-то случилось ссетью
    .catch(() => {
      onFail();
    });
};
