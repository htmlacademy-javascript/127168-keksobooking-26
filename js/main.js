function checkArguments (min, max, functionName) {
  if (min >= max) {
    throw Error(`В функции ${functionName} начальное число больше или равно конечному`);
  }
  if (min < 0 || max < 0) {
    throw Error(`В функции ${functionName} передан аргумент меньше нуля`);
  }
}

function randomIntFromInterval (min, max) {
  checkArguments (min, max, 'randomIntFromInterval');
  // Формула взята из https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloatFromInterval (min, max, counter = 2) {
  checkArguments (min, max, 'randomFloatFromInterval');

  return +(Math.random() * (max - min) + min).toFixed(counter);
}

randomIntFromInterval(1,10);
randomFloatFromInterval(100,10000);
