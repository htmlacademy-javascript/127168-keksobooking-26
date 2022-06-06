function randomIntFromInterval (min, max) {
  if (min >= max) {
    return Error('В функции randomIntFromInterval начальное число больше или равно конечному');
  }
  if (min < 0 || max < 0) {
    return Error('В функции randomIntFromInterval передан аргумент меньше нуля');
  }
  // Подсмотрено на https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  return Math.floor(Math.random() * (max - min + 1) + min);
}


randomIntFromInterval (1, 10);
