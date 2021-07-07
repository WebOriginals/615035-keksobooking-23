import {similarAds} from './random-housing.js';
fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((places) => {
    console.log(places);
    similarAds(places);
  });
