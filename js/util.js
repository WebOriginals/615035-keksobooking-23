const randomNumber = function getRandomIntInclusive(min, max) {
  if (min > max) {
    throw 'минимальное число не может быть больше максимального';
  } else if (min === max) {
    throw 'Вы ввели минимальное число равное максимальному';
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
const randomFloatingPointNumber = function getRandomIntInclusiveFixedPoint(min, max, numberAfterPoint) {
  const randomNumberFormula = Math.random() * (max - min) + min;
  if (min > max) {
    throw 'минимальное число не может быть больше максимального';
  } else if (min === max) {
    throw 'Вы ввели минимальное число равное максимальному';
  } else {
    return +randomNumberFormula.toFixed(numberAfterPoint);
  }
};
const getСalculatingRandomNumber = function (name) {
  return name[_.random(0, name.length - 1)];
};
const randomArrElements = function (source) {
  const Nc = Math.floor(Math.random() * source.length);
  const arr = [];
  for (let index = 0; index < Nc; index++) {
    const idx = Math.floor(Math.random() * source.length);
    arr.push(source[idx]);
  }
  return [ ...new Set(arr) ];
};


export {randomNumber, randomFloatingPointNumber, getСalculatingRandomNumber, randomArrElements};
