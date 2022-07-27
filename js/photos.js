const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const fileChooserHouse = document.querySelector('.ad-form__upload input[type=file]');
const previewAvatarContainer = document.querySelector('.ad-form-header__preview');
const previewHouseContainer = document.querySelector('.ad-form__photo-container');
const previewHouse = document.querySelector('.ad-form__photo');

fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  previewAvatarContainer.lastElementChild.remove();

  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const address = URL.createObjectURL(file);
    previewAvatarContainer.style.padding = '0 35px';
    previewAvatarContainer.style.backgroundSize  = 'auto 70px';
    previewAvatarContainer.style.backgroundRepeat  = 'no-repeat';
    previewAvatarContainer.style.backgroundImage = `url(${address})`;
  }
});

fileChooserHouse.addEventListener('change', () => {
  const template = previewHouse.cloneNode();
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
});
