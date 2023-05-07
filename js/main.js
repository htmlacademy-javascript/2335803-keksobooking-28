import {createAnnouncementObjects} from './data.js';
import {renderAllCards} from './thumbnails.js';
import {switchNotActiveState} from './form_states.js';

const createdAnnouncementObjects = createAnnouncementObjects();
renderAllCards(createdAnnouncementObjects);
switchNotActiveState();
