'use strict';

module.exports = function(phrase1, phrase2, options) {

  options = options || {};

  options.ignoreCase = options.ignoreCase || false;
  options.minWordLength = options.minWordLength || 0;
  options.ignoreCommonWords = options.ignoreCommonWords || false;
  options.common = options.common || module.exports.COMMON_WORDS;

  if (options.ignoreCase) {
    phrase1 = phrase1.toLowerCase();
    phrase2 = phrase2.toLowerCase();
  }

  var compare1 = tokenize(sanitize(phrase1)),
    compare2 = tokenize(sanitize(phrase2)),
    answer = [];

  if (options.ignoreCommonWords) {
    compare1 = removeCommonWords(compare1, options.common);
    compare2 = removeCommonWords(compare2, options.common);
  }

  compare1.forEach(function(element) {
    if (compare2.indexOf(element) > -1) {
      answer.push(element);
    }
  });

  answer = answer.filter(onlyUnique);

  if (options.minWordLength) {
    answer = answer.filter(getWordsWithMinLen.bind(this, options.minWordLength));
  }

  return answer;

}

module.exports.COMMON_WORDS = Object.freeze([
  'a', 'an', 'the', 'this', 'that', 'there', 'it',
  'in', 'on', 'for', 'not', 'your', 'you', 'at',
  'to', 'is', 'us', 'out', 'by', 'I'
]);

function sanitize(word) {
  // matches common punctuations:
  // . , / ? # ! $ % ^ & * ; : { } = _ ` ~ ( )
  // does not match hyphen: -
  var punctuationRegex = /[\.,\/\?#!$%\^&\*;:{}=_`~()]/g;
  return word.replace(punctuationRegex, '');
}

function tokenize(word) {
  return word.split(' ');
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function removeCommonWords(words, common) {
  return words.filter(function(element) {
    return common.indexOf(element) < 0;
  });
}

function getWordsWithMinLen(minLen, word) {
  return word.length >= minLen;
}

if (process.env.NODE_ENV === 'test') {
  module.exports.sanitize = sanitize;
  module.exports.tokenize = tokenize;
  module.exports.getWordsWithMinLen = getWordsWithMinLen;
  module.exports.removeCommonWords = removeCommonWords;
}
