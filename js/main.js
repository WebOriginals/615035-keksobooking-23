import './map.js';
import './api.js';
import './working-form.js';
import './filter.js';
import {getData} from './api.js';
import {showAlert} from './working-form.js';
import {mainRenderPonts} from './filter.js';

getData(
  (places) => mainRenderPonts(places),
  () => showAlert('Упс! Сервер не захотел отправлять вам данные, Сори!'),
);
