// источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
let randomNumber = function getRandomIntInclusive(min, max) {

  if( min > max ){
    return "минимальное число не может быть больше максимального";
  }else if( min === max ){
    return "Вы ввели минимальное число равное максимальному  " + Math.floor(Math.random() * (max - min + 1)) + min;
  }else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}


let randomFloatingPointNumber = function getRandomIntInclusiveFixedPoint(min, max , numberAfterPoint) {
  let randomNumber = Math.random() * (max - min) + min;
  if( min > max ){
    return "минимальное число не может быть больше максимального " +  +randomNumber.toFixed(numberAfterPoint);
  }else if( min === max ){

    return "Вы ввели минимальное число равное максимальному  " +  +randomNumber.toFixed(numberAfterPoint);
  }else {
    return +randomNumber.toFixed(numberAfterPoint);
  }
}

console.log(randomFloatingPointNumber(1, 5,1));
console.log(randomFloatingPointNumber(1, 1,2));
console.log(randomFloatingPointNumber(5, 3,0));




