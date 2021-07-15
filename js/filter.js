import {
  filterSelectHousingElement,
  SIMILAR_PLACE_COUNT,
  filterSelectRoomElement,
  filterSelectGuestsElement,
  filter, filterSelectPriceElement
} from './variables-constants.js';
import {renderPoints, markerGroup} from "./map.js";

//фильтрация по типу жилья
export const getHousingTypeFilter = (places) => {
  filterSelectHousingElement.onchange = function () {
    const key = filterSelectHousingElement.value;
    const arrayFilter = (key === 'any') ? places.slice(0) : places.filter(({offer}) => offer.type === key);
    markerGroup.clearLayers();
    renderPoints(arrayFilter.slice(0, SIMILAR_PLACE_COUNT));
  };
};
//фильтрация по кол-ву комнат
export const getQuantityRoomsFilter = (places) => {
  filterSelectRoomElement.onchange = function () {
    const key = filterSelectRoomElement.value;
    const arrayFilter = (key === 'any') ? places.slice(0) : places.filter(({offer}) => offer.rooms === +key);
    markerGroup.clearLayers();
    renderPoints(arrayFilter.slice(0, SIMILAR_PLACE_COUNT));
  };
};
//фильтрация по кол-ву гостей
export const getQuantityGuestsFilter = (places) => {
  filterSelectGuestsElement.onchange = function () {
    const key = filterSelectGuestsElement.value;
    const arrayFilter = (key === 'any') ? places.slice(0) : places.filter(({offer}) => offer.guests === +key);
    markerGroup.clearLayers();
    renderPoints(arrayFilter.slice(0, SIMILAR_PLACE_COUNT));
  };
};

//фильтрация по цене
export const getPriceRoomFilter = (places) => {
  filterSelectPriceElement.onchange = function () {
    const key = filterSelectPriceElement.value;
    const PriceValues = {
      low: 10000,
      hight: 50000,
    };
    const arrayFilter = places.filter(({offer}) => {
      switch (key) {
        case 'any':
          return true;
        case 'low':
          return offer.price < PriceValues.low;
        case 'middle':
          return (PriceValues.low < offer.price) && (offer.price < PriceValues.hight);
        case 'high':
          return offer.price > PriceValues.hight;
        default:
          return false;
      }
    });
    markerGroup.clearLayers();
    renderPoints(arrayFilter.slice(0, SIMILAR_PLACE_COUNT));
  };
};

export const compareFeatures = (places, event) => {
  //находим все чекбоксы с фильтра
  const chosenFeatures = filter.querySelectorAll('.map__checkbox:checked');

  const getFeaturesRank = (place, placeindex) => {
    console.log('индекс каждлго эл массива с объявлениями = ' + placeindex);
    let rank = 0;
    //перебираем чекбоксы
    chosenFeatures.forEach((feature) => {
      //значение отдельного чекбокса feature.value
      console.log('значение отдельного чекбокса feature.value = ' + feature.value);
        //все удобства в каждом элементе place.offer.features
        console.log('все удобства в каждом элементе place.offer.features = ' + place.offer.features);
        if(place.offer.features){
          if (place.offer.features.includes(feature.value)) {
            rank += 1;
          }
        }
    });

    console.log('rank = '+ rank);
    //длина всех выбранных чекбоксов
    console.log('длина всех выбранных чекбоксов = ' + chosenFeatures.length);
    console.log('==============================');
    return rank;
  }

  // перебираем массив с меставми и присваеваем каждому месту ранг исходя из выбранного чекбокса
  // places.slice(0, 3).forEach((place, placeindex) => {
  //   getFeaturesRank(place, placeindex);
  // });

  const compareFeatures = (placeA, placeB) => {
    const rankA = getFeaturesRank(placeA);
    const rankB = getFeaturesRank(placeB);

    return rankB - rankA;
  }


  markerGroup.clearLayers();
  renderPoints(places.sort(compareFeatures).slice(0, SIMILAR_PLACE_COUNT));
};


