const getRandomIntFromInterval = (a, b) => {
  // Функция взята из интернета и доработана
  // Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomFloatFromInterval = (a, b, counter = 5) => {
  // Функция взята из интернета и доработана
  // Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(counter);
};

const getRandomArrayElement = (elements) => elements[getRandomIntFromInterval(0, elements.length - 1)];

const getRandomElements = (elements) => {
  const numOfElements = getRandomIntFromInterval(1, elements.length);
  const usedElements = [];

  for (let i = 1; i <= numOfElements; i++) {
    const numElement = getRandomIntFromInterval(0, elements.length - 1);

    if (usedElements.includes(elements[numElement])) {
      i--;
      continue;
    }

    usedElements.push(elements[numElement]);
  }

  return usedElements;
};

const correctCounter = (counter) => counter < 10 ? `0${counter}` : counter.toString();

export {getRandomIntFromInterval,
  getRandomFloatFromInterval,
  getRandomArrayElement,
  getRandomElements,
  correctCounter};
