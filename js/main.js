import {createAnnouncementObjects} from './data.js';
import {renderAllCards} from './thumbnails.js';
import {checkNewForm, addNewFormListeners} from './validation_new_form.js';
import {renderMap} from './map.js';

const createdAnnouncementObjects = createAnnouncementObjects();
const cards = renderAllCards(createdAnnouncementObjects);

checkNewForm();
addNewFormListeners();
renderMap(createdAnnouncementObjects, cards);
