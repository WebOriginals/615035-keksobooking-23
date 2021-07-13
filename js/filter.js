import {
  filterSelectHousingElement,
  SIMILAR_PLACE_COUNT,
  filterSelectRoomElement,
  filterSelectGuestsElement,
  filter
} from './variables-constants.js';
import {renderPoints, markerGroup} from "./map.js";

// //фильтрация по типу жилья
// export const getHousingTypeFilter = (places) => {
//   filterSelectHousingElement.onchange = function () {
//     const key = filterSelectHousingElement.value;
//     const arrayFilter = (key === 'any') ? places.slice(0) : places.filter(({offer}) => offer.type === key);
//     markerGroup.clearLayers();
//     renderPoints(arrayFilter.slice(0, SIMILAR_PLACE_COUNT));
//   };
// };
// //фильтрация по кол-ву комнат
// export const getQuantityRoomsFilter = (places) => {
//   filterSelectRoomElement.onchange = function () {
//     const key = filterSelectRoomElement.value;
//     const arrayFilter = (key === 'any') ? places.slice(0) : places.filter(({offer}) => offer.rooms === +key);
//     markerGroup.clearLayers();
//     renderPoints(arrayFilter.slice(0, SIMILAR_PLACE_COUNT));
//   };
// };
// //фильтрация по кол-ву гостей
// export const getQuantityGuestsFilter = (places) => {
//   filterSelectGuestsElement.onchange = function () {
//     const key = filterSelectGuestsElement.value;
//     const arrayFilter = (key === 'any') ? places.slice(0) : places.filter(({offer}) => offer.guests === +key);
//     markerGroup.clearLayers();
//     renderPoints(arrayFilter.slice(0, SIMILAR_PLACE_COUNT));
//   };
// };


//объединение 3 фильтра тип жилья, кол-во комнат, кол-во гостей
export const getThreeFilters = (places) => {
  filter.onchange = function () {
    const key1 = filterSelectHousingElement.value;
    const key2 = filterSelectRoomElement.value;
    const key3 = filterSelectGuestsElement.value;
    let arrayMainFilter = [];
    let arrayMainFilter1 = [];
    let arrayFilter1 = (key1 === 'any') ? places.slice(0) : places.filter(({offer}) => offer.type === key1);
    let arrayFilter2 = (key2 === 'any') ? places.slice(0) : places.filter(({offer}) => offer.rooms === +key2);
    let arrayFilter3 = (key3 === 'any') ? places.slice(0) : places.filter(({offer}) => offer.guests === +key3);
    if(arrayFilter1 && arrayFilter2 && arrayFilter3){
      console.log('вошли в условие');
      if(key1){
        arrayMainFilter = arrayMainFilter1.concat(arrayFilter1);
        console.log(key1);
        console.log(arrayFilter1);
        console.log(arrayMainFilter);
        console.log(arrayMainFilter1);
        console.log('вошли в условие 1');
      } else if(key2){
        arrayMainFilter.concat(arrayFilter2);
        console.log('вошли в условие 2');
      } else if(key3){
        arrayMainFilter.concat(arrayFilter3);
        console.log('вошли в условие 3');
      }
    }

    markerGroup.clearLayers();
    console.log(arrayMainFilter);
    renderPoints(arrayMainFilter.slice(0, SIMILAR_PLACE_COUNT));
  };
};

