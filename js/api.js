import {URL_DATA_SERVER,URL_FOR_DATA_SERVER} from './variables-constants.js';

export const getData = (onSuccess, onFail) => {
  fetch(URL_DATA_SERVER)
    .then((response) => response.json())
    .then((places) => onSuccess(places))
    .catch(() => onFail());
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    URL_FOR_DATA_SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => response.ok ? onSuccess() : onFail())
    //если что-то случилось ссетью
    .catch(() => onFail());
};
