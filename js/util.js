const getRandomNumber = (min, max) => {
  if (min > max) {
    throw 'минимальное число не может быть больше максимального';
  } else if (min === max) {
    throw 'Вы ввели минимальное число равное максимальному';
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
const getRandomFloatingPointNumber = (min, max, numberAfterPoint) =>{
  const randomNumberFormula = Math.random() * (max - min) + min;
  if (min > max) {
    throw 'минимальное число не может быть больше максимального';
  } else if (min === max) {
    throw 'Вы ввели минимальное число равное максимальному';
  } else {
    return +randomNumberFormula.toFixed(numberAfterPoint);
  }
};
const getСalculatingRandomNumber = (name) => name[getRandomNumber(0, name.length - 1)];
const randomArrElements = (source) => {
  //Nc длина массива должна быть в диапазоне от 1 до  source.length
  const Nc = Math.floor(getRandomNumber(1, source.length)  );
  const arr = [];
  for (let index = 0; index < Nc; index++) {
    //idx, случайное число от 0 до source.length -1 (тк длина массива на 1 боле, чем кол-во элементов в нем)
    const idx = Math.floor(getRandomNumber(0,source.length -1));
    arr.push(source[idx]);
  }
  return [ ...new Set(arr) ];
};



export {getRandomNumber, getRandomFloatingPointNumber, getСalculatingRandomNumber, randomArrElements};
