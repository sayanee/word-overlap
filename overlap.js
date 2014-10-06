(function() {
  'use strict';

  function sanitize(word) {
    var punctuationRegex = /[\.,\/\?#!$%\^&\*;:{}=_`~()]/g;
    return word.replace(punctuationRegex, '');
  }

  function tokenize(word) {
    return word.split(' ');
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function removeCommonWords(words) {
    var commonWords = [
      'a', 'an', 'the', 'this', 'that', 'there', 'it',
      'in', 'on', 'for', 'not', 'your', 'you', 'at',
      'to', 'is', 'us', 'out', 'by', 'I' ];
    // a, an, the, this, that, there, it
    // on, for, not, your, you, at, to, is, us, out, by, I

    return words.filter(function(element) {
      return commonWords.indexOf(element) < 0;
    });
  }

  function getWordsWithMinLen(minLen, word) {
    if (word.length >= minLen) {
      return true;
    }
  }

  if (process.env.NODE_ENV === 'test') {
    exports.sanitize = sanitize;
    exports.tokenize = tokenize;
    exports.getWordsWithMinLen = getWordsWithMinLen;
  }

  exports.list = function list(phrase1, phrase2, options) {

    if (!options) {
      options = {};
    }

    options.ignoreCase = options.ignoreCase || false;
    options.minWordLength = options.minWordLength || 0;
    options.ignoreCommonWords = options.ignoreCommonWords || false;

    if (options.ignoreCase) {
      phrase1 = phrase1.toLowerCase();
      phrase2 = phrase2.toLowerCase();
    }

    var compare1 = tokenize(sanitize(phrase1)),
      compare2 = tokenize(sanitize(phrase2)),
      answer = [];

    if (options.ignoreCommonWords) {
      compare1 = removeCommonWords(compare1);
      compare2 = removeCommonWords(compare2);
    }

    compare1.forEach(function(element1) {
      compare2.forEach(function(element2) {
        if (element1 === element2) {
          answer.push(element1);
        }
      });
    });

    answer = answer.filter(onlyUnique);

    if (options.minWordLength) {
      answer = answer.filter(getWordsWithMinLen.bind(this, options.minWordLength));
    }

    return answer;

  }

})();
