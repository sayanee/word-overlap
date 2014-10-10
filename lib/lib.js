'use strict';

var pluralize = require('pluralize');

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

exports.depluralize = function depluralize(words, ignorePlurals) {
  ignorePlurals.forEach(pluralize.addUncountableRule);
  return words.map(function(element) {
    return pluralize.singular(element);
  })
}
