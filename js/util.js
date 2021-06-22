const randomNumber = function getRandomIntInclusive(min, max) {
  if (min > max) {
    throw "минимальное число не может быть больше максимального";
  } else if (min === max) {
    throw "Вы ввели минимальное число равное максимальному";
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
const randomFloatingPointNumber = function getRandomIntInclusiveFixedPoint(min, max, numberAfterPoint) {
  const randomNumberFormula = Math.random() * (max - min) + min;
  if (min > max) {
    throw "минимальное число не может быть больше максимального";
  } else if (min === max) {
    throw "Вы ввели минимальное число равное максимальному";
  } else {
    return +randomNumberFormula.toFixed(numberAfterPoint);
  }
};
const getСalculatingRandomNumber = function (name) {
  return name[randomNumber(0, name.length - 1)];
};
const randomArrElements = function (source) {
  //Nc длина массива должна быть в диапазоне от 1 до  source.length
  const Nc = Math.floor(randomNumber(1, source.length)  );
  const arr = [];
  for (let index = 0; index < Nc; index++) {
    //idx, случайное число от 0 до source.length -1 (тк длина массива на 1 боле, чем кол-во элементов в нем)
    const idx = Math.floor(randomNumber(0,source.length -1));
    arr.push(source[idx]);
  }
  return [ ...new Set(arr) ];
};

export {randomNumber, randomFloatingPointNumber, getСalculatingRandomNumber, randomArrElements};
