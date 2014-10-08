'use strict';

exports.sanitize = function sanitize(word) {
  // matches common punctuations:
  // . , / ? # ! $ % ^ & * ; : { } = _ ` ~ ( )
  // does not match hyphen: -
  var punctuationRegex = /[\.,\/\?@#!$%\^&\*;:{}=_`~()]/g;
  return word.replace(punctuationRegex, '');
}

exports.tokenize = function tokenize(word) {
  return word.split(' ');
}

exports.onlyUnique = function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

exports.removeCommonWords = function removeCommonWords(words, common) {
  return words.filter(function(element) {
    return common.indexOf(element) < 0;
  });
}

exports.getWordsWithMinLen = function getWordsWithMinLen(minLen, word) {
  return word.length >= minLen;
}
