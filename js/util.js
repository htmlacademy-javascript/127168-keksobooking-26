const correctEndOfWord = (number, word, wordEndings) => {
  // Функция взята из интернета и доработана
  // Источник - https://realadmin.ru/coding/sklonenie-na-javascript.html

  number = Math.abs(number) % 100;
  const supportNum = number % 10;
  if (number > 10 && number < 20) {
    return `${word}${wordEndings[2]}`;
  }
  if (supportNum > 1 && supportNum < 5) {
    return `${word}${wordEndings[1]}`;
  }
  if (supportNum === 1) {
    return `${word}${wordEndings[0]}`;
  }
  return `${word}${wordEndings[2]}`;
};

const debounce = (callback, timeoutDelay = 500) => {
  // Функция взята из интернета и доработана
  // Источник - https://www.freecodecamp.org/news/javascript-debounce-example

  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {correctEndOfWord,
  debounce};
