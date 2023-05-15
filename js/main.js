import {createAnnouncementObjects} from './data.js';
import {renderAllCards} from './thumbnails.js';
import {setStateNotActive} from './form_states.js';
import {checkNewForm, addNewFormListeners} from './validation_new_picture_form.js';

const createdAnnouncementObjects = createAnnouncementObjects();
renderAllCards(createdAnnouncementObjects);
checkNewForm();
addNewFormListeners();
