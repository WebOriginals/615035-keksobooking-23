import {filterSelectHousingElement} from './variables-constants.js';
import {createMarker, markerGroup} from "./map.js";

export const getHousingTypeFilter = (places) => {
  filterSelectHousingElement.onchange = function () {
    const newArray = places.slice(0);
    let arrayFilter = [];
    const filterTest = (newArray) => {
      console.log(newArray);
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].offer.type === filterSelectHousingElement.value) {
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
    console.log('##################');
    console.log(markerGroup);
    console.log('##################');
  }
}
