'use strict';

var overlap = require('./index'),
  colors = require('colors/safe'),
  sentence1 = 'A Hitchhiking Meetup in Betelgeuse by Ford Prefect',
  sentence2 = 'A hitchhiking meetup by the hitchhiker';

console.log(colors.blue.underline('From example.js: '));

console.log(colors.black('\nWith no options:'));
console.log('overlap(sentence1, sentence2)');
console.log(overlap(sentence1, sentence2));

console.log(colors.black('\nWith option ignoreCase:'));
console.log('overlap(sentence1, sentence2, { ignoreCase: true })');
console.log(overlap(sentence1, sentence2, {
  ignoreCase: true
}));

console.log(colors.black('\nWith options ignoreCase, minWordLength:'));
console.log('overlap(sentence1, sentence2, { ignoreCase: true, minWordLength: 2 })');
console.log(overlap(sentence1, sentence2, {
  ignoreCase: true,
  minWordLength: 2
}));

console.log(colors.black('\nWith options ignoreCase, minWordLength, ignoreCommonWords:'));
console.log('overlap(sentence1, sentence2, { ignoreCase: true, minWordLength: 2, ignoreCommonWords: true })');
console.log(overlap(sentence1, sentence2, {
  ignoreCase: true,
  minWordLength: 2,
  ignoreCommonWords: true
}));

console.log(colors.black('\nWith options ignoreCase, minWordLength, ignoreCommonWords, common words:'));
console.log('overlap(sentence1, sentence2, {ignoreCase: true, minWordLength: 2, ignoreCommonWords: true, common: [ "meetup" ] })');
console.log(overlap(sentence1, sentence2, {
  ignoreCase: true,
  minWordLength: 2,
  ignoreCommonWords: true,
  common: [ 'meetup' ]
}));
