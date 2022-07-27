const filterForm = document.querySelector('.map__filters');

filterForm.addEventListener('change', (evt) => {
  if (evt.target.id === 'housing-type') {
    console.log('Тип дома');
  }
  if (evt.target.id === 'housing-price') {
    console.log('Стоимость аренды');
  }
  if (evt.target.id === 'housing-rooms') {
    console.log('Количество комнат');
  }
  if (evt.target.id === 'housing-guests') {
    console.log('Количество гостей');
  }
  if (evt.target.parentElement.id === 'housing-features') {
    console.log('Фишечки');
  }
  // console.dir(evt.target);
});
