import {setStateActive} from './form_states.js';
import {updateSlider} from './slider.js';
import {TILE_LAYER, ZOOM, cityCenter, iconConfig, specialIconConfig, COPYRIGHT} from './data.js';

const newFormAddress = document
  .querySelector('.ad-form').querySelector('#address');

const map = L.map('map-canvas')
  .setView(cityCenter, ZOOM);

const regularIcon = L.icon({
  iconUrl: iconConfig.url,
  iconSize: [iconConfig.width, iconConfig.height],
  iconAnchor: [iconConfig.anchorX, iconConfig.anchorY],
});

const specialIcon = L.icon({
  iconUrl: specialIconConfig.url,
  iconSize: [specialIconConfig.width, specialIconConfig.height],
  iconAnchor: [specialIconConfig.anchorX, specialIconConfig.anchorY],
});

const createNewMarker = (lat, lng, icon, popup, draggableStatus) => {
  const marker = L.marker({
    lat,
    lng,
  },
  {
    draggable: draggableStatus,
    icon: icon,
  },
  );

  if (popup) {
    marker
      .addTo(map)
      .bindPopup(popup);
  } else {
    marker
      .addTo(map);
  }

  if (draggableStatus) {
    marker.on('moveend', (evt) => {
      const newLat = evt.target.getLatLng().lat;
      const newLng = evt.target.getLatLng().lng;
      newFormAddress.value = `Ширина ${newLat.toFixed(4)}; Долгота ${newLng.toFixed(4)}`;
    });
  }
};

const renderMap = (objects, cards) => {
  setStateActive ();
  updateSlider ();
  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);

  for (let i = 0; i < objects.length; i ++) {
    const object = objects[i];
    const {lat,lng } = object.offer.address;
    createNewMarker (lat, lng, regularIcon, cards[i], false);
  }

  createNewMarker (cityCenter.lat, cityCenter.lng, specialIcon, null, true);
};

export {renderMap};
