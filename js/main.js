import {createAnnouncementObjects} from './data.js';
import {renderAllCards} from './thumbnails.js';

const createdAnnouncementObjects = createAnnouncementObjects();
renderAllCards(createdAnnouncementObjects);
