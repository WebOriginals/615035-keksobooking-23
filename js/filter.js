import {
  filterSelectHousingElement,
  filterSelectRoomElement,
  filterSelectGuestsElement,
  filter, filterSelectPriceElement,
  PRICE_VALUES, SIMILAR_PLACE_COUNT
} from './variables-constants.js';
import {markerGroup, renderPoints} from './map.js';
import {activateFilter} from './working-form.js';
import {debounce} from './utils/debounce.js';

// фильтрация по цене
export const getFilterPrice = (key, price) => {
  switch (key) {
    case 'any':
      return true;
    case 'low':
      return price < PRICE_VALUES.low;
    case 'middle':
      return (PRICE_VALUES.low < price) && (price < PRICE_VALUES.hight);
    case 'high':
      return price > PRICE_VALUES.hight;
    default:
      return false;
  }
};

// функция присвоенич ранга эл
const getFeaturesRank = (place) => {
  const chosenFeatures = filter.querySelectorAll('.map__checkbox:checked');
  let rank = 0;
  //перебираем чекбоксы
  chosenFeatures.forEach((feature) => {
    if (place.offer.features) {
      if (place.offer.features.includes(feature.value)) {
        rank += 1;
      }
    }
  });
  return rank;
};

// функция сравнения рангов
export const compareFeatures = (placeA, placeB) => {
  const rankA = getFeaturesRank(placeA);
  const rankB = getFeaturesRank(placeB);
  //console.log(placeA);
  return rankB - rankA;
};

// фильтр по рейтингу удобств
export const filterFeatures = (offer) => {
  const chosenFeatures = filter.querySelectorAll('.map__checkbox:checked');
  if(offer === undefined && chosenFeatures.length !== 0){
    return false;
  }

  chosenFeatures.forEach((element) => {
    if (!offer.includes(element)) {
      return false;
    }
  });
  return true;
};

// основная функия фильтрации
export const filterAll = (places) => {
  const housingKey = filterSelectHousingElement.value;
  const roomsKey = filterSelectRoomElement.value;
  const guestsKey = filterSelectGuestsElement.value;
  const priceKey = filterSelectPriceElement.value;

  const compareValues = (offerValue, filterValue) => filterValue === 'any' ? true : String(offerValue) === String(filterValue);

  return places.filter(({offer}) =>
    compareValues(offer.type, housingKey) &&
    compareValues(offer.rooms, roomsKey) &&
    compareValues(offer.guests, guestsKey) &&
    compareValues(offer.type, housingKey) &&
    getFilterPrice(priceKey, offer.price) &&
    filterFeatures(offer.features));
};

export const mainRenderPonts = (places) => {
  renderPoints(places.slice(0, SIMILAR_PLACE_COUNT));
  activateFilter();
  filter.addEventListener('change', () => {
    filterAll(places);
    const clearMarkerRenderPoints = () => {
      markerGroup.clearLayers();
      renderPoints(filterAll(places).sort(compareFeatures).slice(0, SIMILAR_PLACE_COUNT));
    };

    debounce(() => clearMarkerRenderPoints(places))();
  });
};
