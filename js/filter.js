import {
  filterSelectHousingElement,
  SIMILAR_PLACE_COUNT,
  filterSelectRoomElement,
  filterSelectGuestsElement,
  filter, filterSelectPriceElement,
  PriceValues
} from './variables-constants.js';
import {renderPoints, markerGroup} from "./map.js";


// упрощеная фильтрация по цене
const getFilterPrice = (key, price) => {
  console.log(key);
  console.log(price);
  switch (key) {
    case 'any':
      return true;
    case 'low':
      return price < PriceValues.low ;
    case 'middle':
      return (PriceValues.low < price) && (price < PriceValues.hight);
    case 'high':
      return price > PriceValues.hight;
    default:
      return false;
  }
}
//тестовая функия
export const getPriceFilter = (key,offer) => {
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
};
//фильтр по рейтингу удобств
export const compareFeatures = (places) => {
  //находим все чекбоксы с фильтра
  const chosenFeatures = filter.querySelectorAll('.map__checkbox:checked');
  // функция ранг
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
  // функция сравнения рангов
  const compareFeatures = (placeA, placeB) => {
    const rankA = getFeaturesRank(placeA);
    const rankB = getFeaturesRank(placeB);

    return rankB - rankA;
  }

  const updateMap = (ar) => {
    console.log('сработало');
    // убираем слои на карте
    markerGroup.clearLayers();
    //создаем
    renderPoints(ar.sort(compareFeatures).slice(0, SIMILAR_PLACE_COUNT));
  }
  //debounce от частых кликов
  function debounce(func, timeout = 500){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  debounce(() => updateMap(places)) ();
};

export const filterAll = (places) => {
  const housingKey = filterSelectHousingElement.value;
  const roomsKey = filterSelectRoomElement.value;
  const guestsKey = filterSelectGuestsElement.value;
  const priceKey = filterSelectPriceElement.value;
  const compareValues = (offerValue, filterValue) => filterValue === 'any' ? true : String(offerValue) === String(filterValue);

  // console.log('housingKey = ' + housingKey );
  // console.log('roomsKey = ' + roomsKey);
  // console.log('guestsKey = ' + guestsKey);

  console.log(places.filter(({offer}) =>
    compareValues(offer.type, housingKey) &&
    compareValues(offer.rooms, roomsKey) &&
    compareValues(offer.guests, guestsKey) &&
    compareValues(offer.type, housingKey) &&
    getFilterPrice(priceKey)));

  return places.filter(({offer}) =>

    compareValues(offer.type, housingKey) &&
    compareValues(offer.rooms, roomsKey) &&
    compareValues(offer.guests, guestsKey) &&
    compareValues(offer.type, housingKey) &&
    getFilterPrice(priceKey, offer.price));
};
