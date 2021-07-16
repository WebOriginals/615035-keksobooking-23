import {renderPoints} from './map.js';
import {filter, SIMILAR_PLACE_COUNT} from './variables-constants.js';
import {compareFeatures, filterAll, getFilterPrice} from "./filter.js";
import {activateFilter} from "./working-form.js";
import {markerGroup} from "./map.js";

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((places) => {
    renderPoints(places.slice(0, SIMILAR_PLACE_COUNT));
    activateFilter();
    filter.addEventListener('change', () => {
      filterAll(places);
      markerGroup.clearLayers();
      renderPoints(filterAll(places).sort(compareFeatures).slice(0, SIMILAR_PLACE_COUNT));
    });
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
