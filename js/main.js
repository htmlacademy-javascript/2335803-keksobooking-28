import {renderAllCards} from './thumbnails.js';
import {getData} from './api.js';
import {checkNewForm, addNewFormListeners} from './validation_new_form.js';
import {renderMap} from './map.js';
import {showAllert} from './utils.js';
import {setStateNotActive} from './form_states.js';

setStateNotActive ();
getData ()
  .then((objects) => {
    const cards = renderAllCards(objects);
    checkNewForm();
    addNewFormListeners();
    renderMap(objects, cards);
  })
  .catch(
    (error) => {
      showAllert(error.message);
    }
  );
