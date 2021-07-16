import {activateForm, causeDeactivatingForm, replaceCoordinatesInputAddress} from './working-form.js';
import {housingCoordinates, SIMILAR_ADS_TEMPLATE, TYPE_PLACE} from './variables-constants.js';
import {createPhotos, getFeatures} from './data.js';

causeDeactivatingForm();
export const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: 35.681700,
    lng: 139.753891,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//красная метка
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
//даем метке координаты и разрешаем передвижение draggable
const mainPinMarker = L.marker(
  {
    lat: 35.681700,
    lng: 139.753891,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

//возвращает метку на исходное положение
export const getStartMarkerAndMap = () => {
  mainPinMarker.setLatLng({
    lat: 35.681700,
    lng: 139.753891,
  });
  map.setView({
    lat: 35.681700,
    lng: 139.753891,
  }, 13);
};

//записывает координаты маркера в инпкт адреса
mainPinMarker.on('moveend', (evt) => {
  replaceCoordinatesInputAddress(evt.target);
});

//запрещаю вводить символы с клавиатуры
housingCoordinates.addEventListener('keyup', (event) => {
  event.target.value = event.target.value.replace(/[\x21-\x7E]/g, '');
  replaceCoordinatesInputAddress(mainPinMarker);
});
// шаблон для popup
export const createCustomPopup = (point) => {

  const adsTemplateElement = SIMILAR_ADS_TEMPLATE.cloneNode(true);
  if (point.offer.title) {
    adsTemplateElement.querySelector('.popup__title').textContent = point.offer.title;
  } else {
    adsTemplateElement.querySelector('.popup__title').remove();
  }
  if (point.offer.address) {
    adsTemplateElement.querySelector('.popup__text--address').textContent = point.offer.address;
  } else {
    adsTemplateElement.querySelector('.popup__text--address').remove();
  }
  if (point.offer.price) {
    adsTemplateElement.querySelector('.popup__text--price').textContent = `${point.offer.price} ₽/ночь`;
  } else {
    adsTemplateElement.querySelector('.popup__text--price').remove();
  }
  if (point.offer.description) {
    adsTemplateElement.querySelector('.popup__description').textContent = point.offer.description;
  } else {
    adsTemplateElement.querySelector('.popup__description').remove();
  }
  if (point.author.avatar) {
    adsTemplateElement.querySelector('.popup__avatar').src = point.author.avatar;
  } else {
    adsTemplateElement.querySelector('.popup__avatar').remove();
  }
  if (point.offer.rooms && point.offer.guests) {
    adsTemplateElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  } else {
    adsTemplateElement.querySelector('.popup__text--capacity').remove();
  }
  if (point.offer.checkin && point.offer.checkout) {
    adsTemplateElement.querySelector('.popup__text--time').textContent = `${point.offer.checkin}, выезд до ${point.offer.checkout}`;
  } else {
    adsTemplateElement.querySelector('.popup__text--time').remove();
  }
  if (point.offer.type) {
    adsTemplateElement.querySelector('.popup__type').textContent = TYPE_PLACE[point.offer.type];
  } else {
    adsTemplateElement.querySelector('.popup__type').remove();
  }
  if (point.offer.features) {
    adsTemplateElement.querySelector('.popup__features').textContent = getFeatures(point.offer.features);
  } else {
    adsTemplateElement.querySelector('.popup__features').remove();
  }
  if (point.offer.photos) {
    adsTemplateElement.querySelector('.popup__photos').appendChild(createPhotos(point.offer.photos, adsTemplateElement));
  } else {
    adsTemplateElement.querySelector('.popup__photos').remove();
  }
  return adsTemplateElement;
};
//группа маркеров на карте
export const markerGroup = L.layerGroup().addTo(map);

//создание меток
export const createMarker = (point) => {
  const {lat, lng} = point.location;
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)

    .bindPopup(
      createCustomPopup(point),
      {
        keepInView: true,
      },
    );
};

export const renderPoints = (places) => {
  places.forEach((point) => {
    createMarker(point);
  });
};
