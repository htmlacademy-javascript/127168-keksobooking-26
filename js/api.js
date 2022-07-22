const getData = async (onSuccess) => {
  const response = await fetch('https://26.javascript.pages.academy/keksobooking/data');
  const descriptions = await response.json();
  await onSuccess(descriptions);
};

export {getData};
