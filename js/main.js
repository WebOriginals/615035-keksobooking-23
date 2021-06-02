// источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const randomNumber = function getRandomIntInclusive(min, max) {
  if( min > max ){
    throw 'минимальное число не может быть больше максимального';
  }else if( min === max ){
    throw 'Вы ввели минимальное число равное максимальному';
  }else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
const randomFloatingPointNumber = function getRandomIntInclusiveFixedPoint(min, max , numberAfterPoint) {
  const randomNumberFormula = Math.random() * (max - min) + min;
  if( min > max ){
   throw 'минимальное число не может быть больше максимального';
  }else if( min === max ){
    throw 'Вы ввели минимальное число равное максимальному';
  }else {
    return +randomNumberFormula.toFixed(numberAfterPoint);
  }
};
randomNumber(1, 5);
randomFloatingPointNumber(1, 5, 1);
