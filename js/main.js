function randomIntFromInterval (min, max) {
  if (min >= max) {
    return Error('В функции randomIntFromInterval начальное число больше или равно конечному');
  }
  if (min < 0 || max < 0) {
    return Error('В функции randomIntFromInterval передан аргумент меньше нуля');
  }
  // Формула взята из https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloatFromInterval (min, max, counter = 2) {
  if (min >= max) {
    return Error('В функции randomFloatFromInterval начальное число больше или равно конечному');
  }
  if (min < 0 || max < 0) {
    return Error('В функции randomFloatFromInterval передан аргумент меньше нуля');
  }

  return +(Math.random() * (max - min) + min).toFixed(counter);
}

randomIntFromInterval(0,10);
randomFloatFromInterval(100,10000);
