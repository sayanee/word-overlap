#word-overlap

[![NPM version](https://badge.fury.io/js/word-overlap.svg)](http://badge.fury.io/js/word-overlap) [![Build Status](https://travis-ci.org/sayanee/word-overlap.svg?branch=master)](https://travis-ci.org/sayanee/word-overlap) [![Coverage Status](https://img.shields.io/coveralls/sayanee/word-overlap.svg)](https://coveralls.io/r/sayanee/word-overlap) [![Code Climate](https://codeclimate.com/github/sayanee/word-overlap/badges/gpa.svg)](https://codeclimate.com/github/sayanee/word-overlap) [![Dependency Status](https://gemnasium.com/sayanee/word-overlap.svg)](https://gemnasium.com/sayanee/word-overlap)

> Check the number of words overlapping between 2 phrases or sentences

Used in cases to check whether 2 titles / sentences / phrases are referring to the same context. E.g. 2 event names.


##Install

1. with [npm](https://www.npmjs.org/)

	```js
	npm install word-overlap
	```
- with [browserify](http://browserify.org/)
	1. in file `main.js`

		```js
		// in main.js
		var overlap = require('word-overlap');

		var sentence1 = 'The Hitchhikings Meetup in Betelgeuse by Ford Prefect';
		var sentence2 = 'The hitchhikings meetups by the hitchhikers';

		var reply = overlap(sentence1, sentence2, {
		  ignoreCase: true,
		  minWordLength: 2,
		  ignoreCommonWords: true
		});

		console.log(reply);
		```
	- in file `index.html`

		```html
		<script src="build.js"></script>
		```
	- make the file `build.js`

		```shell
		browserify main.js -o build.js --exclude WNdb --exclude lapack
		```



##Usage

```js
var overlap = require('word-overlap');

var sentence1 = 'The Hitchhikings Meetup in Betelgeuse by Ford Prefect';
var sentence2 = 'The hitchhikings meetups by the hitchhikers';
```

###simple case

```js
overlap(sentence1, sentence2);
// [ 'The', 'by' ]
```

###option: ignore case

```js
overlap(sentence1, sentence2, {
   ignoreCase: true
});
// [ 'the', 'hitchhikings', 'by' ]
```

###option: min word length

```js
overlap(sentence1, sentence2, {
  ignoreCase: true,
  minWordLength: 2
});
// [ 'the', 'hitchhiking', 'by' ]
```

###option: ignore default common words

Common words by default include: *a, an, the, this, that, there, it, in, on, for, not, your, you, at,
to, is, us, out, by, I*

```js
overlap(sentence1, sentence2, {
  ignoreCase: true,
  minWordLength: 2,
  ignoreCommonWords: true
});
// [ 'hitchhikings' ]
```

###option: ignore number

Ignore numbers such as: 5e3, 0xff, -1.1, 0, 1, 1.1, 10, 10.10, 100, '-1.1', etc.

```js
sentence1 = 'Welcome to 2015';
sentence2 = '2015 Meetup for the year';
console.log(overlap(sentence1, sentence2, {
  ignoreNumber: true
}));
// [ ]
```

###option: add your common words to ignore

```js
overlap(sentence1, sentence2, {
  ignoreCase: true,
  minWordLength: 2,
  ignoreCommonWords: true,
  common: [ 'hitchhikings' ]
});
// [ ]
```

###option: depluralize words

```js
overlap(sentence1, sentence2, {
  ignoreCase: true,
  minWordLength: 2,
  ignoreCommonWords: true,
  depluralize: true
});
// [ 'hitchhiking', 'meetup' ]
```

###option: depluralize words with plurals to ignore

```js
overlap(sentence1, sentence2, {
  ignoreCase: true,
  minWordLength: 2,
  ignoreCommonWords: true,
  depluralize: true,
  ignorePlurals: [ 'hitchhikings' ]
});
// [ 'hitchhikings', 'meetup' ]
```

###option: stemming

```js
var sentence1 = 'A programming course in SmallTalk';
var sentence2 = 'Have you programmed in SmallTalk?';

overlap(sentence1, sentence2, {
  stemming: true,
  ignoreCommonWords: true
});
// [ 'program', 'smalltalk' ]
```

Try out the examples in file `example.js` with the command `node example.js`

##Contribute

Please see [`CONTRIBUTING.md`](CONTRIBUTING.md) for details.

##Versioning

This repository follows the [Semantic Versioning](http://semver.org/) guidelines:

1. For **patches**, run `grunt bump`
- For **minor release**, run `grunt bump:minor`
- For **major release**, run `grunt bump:major`

##License

(C) Sayanee Basu 2014, released under an MIT license
