const getRandomPositiveNumber = function (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  const randomNumber = Math.random() * (max - min + 1) + min;

  return Math.floor(randomNumber);
};

const checkStringLength = function (string, length) {
  return string.length <= length;
};

getRandomPositiveNumber(8, 4);
checkStringLength('', 50);
