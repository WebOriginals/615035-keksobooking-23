import { renderPoints } from './map.js'

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((places) => {
    renderPoints(places);
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
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
