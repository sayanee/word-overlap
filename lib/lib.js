'use strict';

var pluralize = require('pluralize');
var natural = require('natural');
var isNumber = require('is-number');

exports.sanitize = function sanitize(word) {
  // matches common punctuations
  // , / ? # ! $ % ^ & * ; : { } = _ ` ~ ( )
  var punctuationRegex = /[,\/\?@#!$%\^&\*;:{}=_`~()]/g;

  // matches a dot between 2 strings or words
  var dotBetweenWords = /(\w+)\.(\w+)/;

  // matches a hyphen between 2 strings or words
  var dashBetweenWords = /(\w+)\-(\w+)/;

  // matches a full stop
  var fullStop = /(\w+)\./;

  return word
    .replace(punctuationRegex, '')
    .replace(dotBetweenWords, '$1 $2')
    .replace(dashBetweenWords, '$1 $2')
    .replace(fullStop, '$1');
}

exports.tokenize = function tokenize(word) {
  return word.split(' ');
}

exports.removeEmptyString = function removeEmptyString(word) {
  return word.length > 0;
}

exports.onlyUnique = function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

exports.removeCommonWords = function removeCommonWords(words, common) {
  return words.filter(function(element) {
    return common.indexOf(element) < 0;
  });
}

exports.removeNumbers = function removeNumbers(words) {
  return words.filter(function(element) {
    return !isNumber(element);
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

exports.stem = function stem(words) {
  return words.map(function(element) {
    return natural.PorterStemmer.stem(element);
  })
}
