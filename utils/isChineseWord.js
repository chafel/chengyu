module.exports = function(word) {
  return /[\u4e00-\u9fa5]/.test(word);
}
