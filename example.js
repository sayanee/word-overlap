(function() {
  'use strict';

  var overlap = require('./wordOverlap'),
    sentence1 = 'A Hitchhiking Meetup in Betelgeuse by Ford Prefect',
    sentence2 = 'A hitchhiking meetup by the hitchhiker';

  console.log('From example.js: ');

  console.log('\nWith no options:');
  console.log(overlap(sentence1, sentence2));

  console.log('\nWith option ignoreCase true:');
  console.log(overlap(sentence1, sentence2, {
    ignoreCase: true
  }));

  console.log('\nWith options ignoreCase true, minWordLength 2:');
  console.log(overlap(sentence1, sentence2, {
    ignoreCase: true,
    minWordLength: 2
  }));

  console.log('\nWith options ignoreCase true, minWordLength 2, ignoreCommonWords true:');
  console.log(overlap(sentence1, sentence2, {
    ignoreCase: true,
    minWordLength: 2,
    ignoreCommonWords: true
  }));

})();
