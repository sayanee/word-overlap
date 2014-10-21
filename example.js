'use strict';

var overlap = require('./index'),
  colors = require('colors/safe'),
  sentence1 = 'The Hitchhikings Meetup in Betelgeuse by Ford Prefect',
  sentence2 = 'The hitchhikings meetups by the hitchhikers';

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
console.log('overlap(sentence1, sentence2, {ignoreCase: true, minWordLength: 2, ignoreCommonWords: true, common: [ "hitchhikings" ] })');
console.log(overlap(sentence1, sentence2, {
  ignoreCase: true,
  minWordLength: 2,
  ignoreCommonWords: true,
  common: [ 'hitchhikings' ]
}));

console.log(colors.black('\nWith options ignoreCase, ignoreCommonWords, depluralize:'));
console.log('overlap(sentence1, sentence2, {ignoreCase: true, depluralize: true, ignoreCommonWords: true })');
console.log(overlap(sentence1, sentence2, {
  ignoreCase: true,
  depluralize: true,
  ignoreCommonWords: true
}));

console.log(colors.black('\nWith options ignoreCase, ignoreCommonWords, depluralize, ignoreplurals:'));
console.log('overlap(sentence1, sentence2, {ignoreCase: true, depluralize: true, ignorePlurals: [ "hitchhikings" ], ignoreCommonWords: true })');
console.log(overlap(sentence1, sentence2, {
  ignoreCase: true,
  depluralize: true,
  ignorePlurals: [ 'hitchhikings' ],
  ignoreCommonWords: true
}));

console.log(colors.black('\nWith options stemming:'));
console.log('var sentence1 = \'A programming course in SmallTalk\';');
console.log('var sentence2 = \'Have you programmed in SmallTalk?\';');
console.log('overlap(sentence1, sentence2, { stemming: true, ignoreCommonWords: true })');
sentence1 = 'A programming course in SmallTalk';
sentence2 = 'Have you programmed in SmallTalk?';
console.log(overlap(sentence1, sentence2, {
  stemming: true,
  ignoreCommonWords: true
}));
