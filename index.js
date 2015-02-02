'use strict';

var lib = require('./lib/lib');

module.exports = function(phrase1, phrase2, options) {

  options = options || {};

  options.ignoreCase = options.ignoreCase || false;
  options.minWordLength = options.minWordLength || 0;
  options.ignoreCommonWords = options.ignoreCommonWords || false;
  options.common = options.common || null;
  options.depluralize = options.depluralize || false;
  options.ignorePlurals = options.ignorePlurals || [];
  options.stemming = options.stemming || false;

  if (options.ignoreCase) {
    phrase1 = phrase1.toLowerCase();
    phrase2 = phrase2.toLowerCase();
  }

  var compare1 = lib.tokenize(lib.sanitize(phrase1)),
    compare2 = lib.tokenize(lib.sanitize(phrase2)),
    answer = [];

  if (options.ignoreCommonWords) {
    compare1 = lib.removeCommonWords(compare1, module.exports.COMMON_WORDS);
    compare2 = lib.removeCommonWords(compare2, module.exports.COMMON_WORDS);
  }

  if (options.depluralize) {
    compare1 = lib.depluralize(compare1, options.ignorePlurals);
    compare2 = lib.depluralize(compare2, options.ignorePlurals);
    options.common = options.common ? lib.depluralize(options.common, options.ignorePlurals) : null;
  }

  if (options.common) {
    compare1 = lib.removeCommonWords(compare1, options.common);
    compare2 = lib.removeCommonWords(compare2, options.common);
  }

  if (options.stemming) {
    compare1 = lib.stem(compare1);
    compare2 = lib.stem(compare2);
  }

  compare1.forEach(function(element) {
    if (compare2.indexOf(element) > -1) {
      answer.push(element);
    }
  });

  answer = answer.filter(lib.onlyUnique);

  if (options.minWordLength) {
    answer = answer.filter(lib.getWordsWithMinLen.bind(this, options.minWordLength));
  }

  return answer;

}

module.exports.COMMON_WORDS = Object.freeze([
  'a', 'an', 'the', 'this', 'that', 'there', 'it',
  'in', 'on', 'for', 'not', 'your', 'you', 'at',
  'to', 'is', 'us', 'out', 'by', 'I', 'and'
]);
