import {filter} from './variables-constants.js';

const filterSelectHousingElement = filter.querySelector('#housing-type');
const filterSelectPriceElement = filter.querySelector('#housing-price');
const filterSelectRoomElement = filter.querySelector('#housing-rooms');
const filterSelectGuestsElement = filter.querySelector('#housing-guests');

const filterAdsElement = filter.querySelector('#housing-guests');


export const getHousingTypeFilter = (places) => {

  filterSelectHousingElement.onchange = function () {
   let newArray = places.slice(0);
    for (let i = 0; i < newArray.length; i++ ) {
      //console.log(newArray[i]);
      if (newArray[i].offer.type !== filterSelectHousingElement.value && filterSelectHousingElement.value !== 'any') {
        //console.log(newArray[i].offer.type);
        //console.log(i);
        newArray.splice(newArray[i],1);
        //console.log('объект удален')
      }
    }
    console.log(newArray);
    return newArray;
  }
}
