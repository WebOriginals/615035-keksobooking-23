import {
  PriceValues, SIMILAR_PLACE_COUNT
} from './variables-constants.js';
import {markerGroup, renderPoints} from './map.js';
import {
  activateFilter,
  filterElement,
  filterSelectHousingElement,
  filterSelectPriceElement,
  filterSelectRoomElement,
  filterSelectGuestsElement
} from './working-form.js';
import {debounce} from './utils/debounce.js';

// фильтрация по цене
export const getFilterPrice = (key, price) => {
  switch (key) {
    case 'any':
      return true;
    case 'low':
      return price < PriceValues.LOW;
    case 'middle':
      return (PriceValues.LOW < price) && (price < PriceValues.HEIGHT);
    case 'high':
      return price > PriceValues.HEIGHT;
    default:
      return false;
  }
};

// функция присвоенич ранга эл
const getFeaturesRank = (place) => {
  const chosenFeatures = filterElement.querySelectorAll('.map__checkbox:checked');
  let rank = 0;
  //перебираем чекбоксы
  chosenFeatures.forEach((feature) => {
    if (place.offer.features && place.offer.features.includes(feature.value)) {
      rank += 1;
    }
  });
  return rank;
};

// функция сравнения рангов
export const compareFeatures = (placeA, placeB) => {
  const rankA = getFeaturesRank(placeA);
  const rankB = getFeaturesRank(placeB);

  return rankB - rankA;
};

// фильтр по рейтингу удобств

export const filterFeatures = (offer) => {
  let trueFalse = true;
  const chosenFeatures = filterElement.querySelectorAll('.map__checkbox:checked');
  chosenFeatures.forEach((element) => {
    if (!offer.includes(element.value)) {
      trueFalse = false;
    }
  });
  return trueFalse;
};

// основная функия фильтрации
export const filterAll = (places) => {

  const housingKey = filterSelectHousingElement.value;
  const roomsKey = filterSelectRoomElement.value;
  const guestsKey = filterSelectGuestsElement.value;
  const priceKey = filterSelectPriceElement.value;
  const compareValues = (offerValue, filterValue) => filterValue === 'any' ? true : String(offerValue) === filterValue;
  const compareValuesFeatures = (features, cb) =>{

    if(features === undefined ) {

      return filterElement.querySelectorAll('.map__checkbox:checked').length === 0 ;
    }  else {
      return cb(features);
    }
  };

  return places.filter(({offer}) =>
    compareValues(offer.type, housingKey) &&
    compareValues(offer.rooms, roomsKey) &&
    compareValues(offer.guests, guestsKey) &&
    compareValues(offer.type, housingKey) &&
    getFilterPrice(priceKey, offer.price) &&
    compareValuesFeatures(offer.features, filterFeatures));

};

export const mainRenderPoints = (places) => {
  renderPoints(places.slice(0, SIMILAR_PLACE_COUNT));
  activateFilter();
  filterElement.addEventListener('change', () => {
    const clearMarkerRenderPoints = (places1) => {
      markerGroup.clearLayers();

      renderPoints(filterAll(places1).sort(compareFeatures).slice(0, SIMILAR_PLACE_COUNT));
    };
    const debounceClearMarkerRenderPoints = debounce(() => clearMarkerRenderPoints(places));
    debounceClearMarkerRenderPoints();
  });
};
