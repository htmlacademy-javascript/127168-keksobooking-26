import {
  setInactiveState,
  setActiveState
} from'./state-function.js';

const getData = async (onSuccess) => {
  setInactiveState();
  let response;
  try {
    response = await fetch('https://26.javascript.pages.academy/keksobooking/dat');
    if (!response.ok) {
      throw new Error(`${response.status} — ${response.statusText}`);
    }
  } catch (err) {
    return [];
  }
  const descriptions = await response.json();
  await onSuccess(descriptions.slice(0, 10));
  setActiveState();
};

export {getData};
