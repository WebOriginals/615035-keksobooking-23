import {filter} from './variables-constants.js';
import {createMarker, markerGroup} from "./map.js";

const filterSelectHousingElement = filter.querySelector('#housing-type');
const filterSelectPriceElement = filter.querySelector('#housing-price');
const filterSelectRoomElement = filter.querySelector('#housing-rooms');
const filterSelectGuestsElement = filter.querySelector('#housing-guests');

const filterAdsElement = filter.querySelector('#housing-guests');


export const getHousingTypeFilter = (places) => {

  filterSelectHousingElement.onchange = function () {
   let newArray = places.slice(0);

    let arrayFilter = [];
    let filterTest = (newArray) => {
      console.log(newArray);
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].offer.type === filterSelectHousingElement.value ) {
          arrayFilter.push(newArray[i]);
        }
      }
    }
    filterTest(newArray);

    console.log(arrayFilter);

    markerGroup.remove();
    arrayFilter.forEach((point) => {
      createMarker(point);
    });

  }
}
