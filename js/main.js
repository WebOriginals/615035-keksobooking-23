// источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {

  if( min > max ){
    return "минимальное число не может быть больше максимального";
  }else if( min === max ){
    return "Вы ввели минимальное число равное максимальному  " + Math.floor(Math.random() * (max - min + 1)) + min;
  }else{
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

console.log(getRandomIntInclusive(5,5));
console.log(getRandomIntInclusive(12,10));
console.log(getRandomIntInclusive(1,4));



