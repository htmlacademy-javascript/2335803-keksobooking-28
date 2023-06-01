import {FILE_TYPES} from './data.js';

const avatarUploading = document.querySelector('.ad-form__field').querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const uploadAvatarButton = document.querySelector('.ad-form__field');
const pictireUploading = document.querySelector('.ad-form__upload').querySelector('.ad-form__input');
const picturePreview = document.querySelector('.ad-form__photo');
const uploadPictureButton = document.querySelector('.ad-form__upload');

const renderNewImage = (elementUploading, elementPreview) => {
  const file = elementUploading.files[0];
  const fileName = file.name.toLowerCase();
  if (FILE_TYPES.some((type) => fileName.endsWith(type))) {
    const urlFile = URL.createObjectURL(file);

    if (elementUploading === avatarUploading) {
      elementPreview.src = urlFile;
    } else {
      elementPreview.innerHTML = `<img src=${urlFile} width="70" height="70">`;
    }
  }
};

const renderNewFormAvatar = () => {
  uploadAvatarButton.addEventListener('change', () => {
    renderNewImage(avatarUploading, avatarPreview);
  });
  uploadPictureButton.addEventListener('change', () => {
    renderNewImage(pictireUploading, picturePreview);
  });
};

export {renderNewFormAvatar};
