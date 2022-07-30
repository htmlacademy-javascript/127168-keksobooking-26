const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const adForm = document.querySelector('.ad-form');
const fileChooserAvatar = adForm.querySelector('.ad-form__field input[type=file]');
const fileChooserHouse = adForm.querySelector('.ad-form__upload input[type=file]');
const previewAvatarContainer = adForm.querySelector('.ad-form-header__upload');
const previewHouseContainer = adForm.querySelector('.ad-form__photo-container');
const previewHouse = previewHouseContainer.querySelector('.ad-form__photo');
let previewAvatar = previewAvatarContainer.querySelector('.ad-form-header__preview');

let reservedAvatarElement;
let reservedPreviewHouseElement;

const onPhotosFieldReset = () => {
  const elementsToDelete = adForm.querySelectorAll('.ad-form__photo');
  elementsToDelete.forEach((element) => element.remove());
  previewHouseContainer.append(reservedPreviewHouseElement);
  adForm.removeEventListener('reset', onPhotosFieldReset);
};

const onAvatarFieldReset = () => {
  previewAvatarContainer.firstElementChild.remove();
  previewAvatar = reservedAvatarElement;
  previewAvatarContainer.prepend(previewAvatar);
  adForm.removeEventListener('reset', onAvatarFieldReset);
};

fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  reservedAvatarElement = previewAvatar.cloneNode(true);
  previewAvatar.lastElementChild.remove();

  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const address = URL.createObjectURL(file);
    previewAvatar.style.padding = '0 35px';
    previewAvatar.style.backgroundSize  = 'auto 70px';
    previewAvatar.style.backgroundRepeat  = 'no-repeat';
    previewAvatar.style.backgroundImage = `url(${address})`;
  }

  adForm.addEventListener('reset', onAvatarFieldReset);
});

fileChooserHouse.addEventListener('change', () => {
  const template = previewHouse.cloneNode();
  reservedPreviewHouseElement = previewHouse.cloneNode();
  previewHouseContainer.lastElementChild.remove();
  const files = Array.from(fileChooserHouse.files);

  files.forEach((file) => {
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      const clone = template.cloneNode();
      const address = URL.createObjectURL(file);
      clone.style.backgroundSize  = 'auto 70px';
      clone.style.backgroundRepeat  = 'no-repeat';
      clone.style.backgroundImage = `url('${address}')`;
      previewHouseContainer.append(clone);
    }
  });

  adForm.addEventListener('reset', onPhotosFieldReset);
});
