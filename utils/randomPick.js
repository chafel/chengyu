var getRandomIndex = function(length) {
  return Math.floor(Math.random() * length);
};

module.exports = function(array, count) {
  if (array.length < count) {
    return array;
  }

  var resultMap = {};
  for (var i = 0; i < count; i++) {
    var randomIndex = getRandomIndex(array.length);
    while (resultMap[randomIndex]) {
      randomIndex = getRandomIndex(array.length);
    }
    resultMap[randomIndex] = array[randomIndex];
  }
  return Object.keys(resultMap).map((key) => resultMap[key]);
}
