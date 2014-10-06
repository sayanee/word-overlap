#world-overlap

Version: 1.0.0

> Check the number of words overlapping between 2 phrases or sentences

Used in cases to check whether 2 titles / sentences / phrases are referring to the same context. E.g. 2 event names.


##Install

```
npm install word-overlap
```

##Usage

```
var overlap = require('overlap');

var sentence1 = 'A Hitchhiking Meetup in Betelgeuse by Ford Prefect';
var sentence2 = 'A hitchhiking meetup meetup by the hitchhiker';
```

###simple case

```
overlap.list(sentence1, sentence2);
// [ 'A', 'by' ]
```

###option: ignore case

```
overlap.list(sentence1, sentence2, {
   ignoreCase: true
});
// [ 'a', 'hitchhiking', 'meetup', 'by' ]
```

###option: min word length

```
overlap.list(sentence1, sentence2, {
  ignoreCase: true,
  minWordLength: 2
});
// [ 'hitchhiking', 'meetup', 'by' ]
```

###option: ignore common words

```
overlap.list(sentence1, sentence2, {
  ignoreCase: true,
  minWordLength: 2,
  ignoreCommonWords: true
});
// [ 'hitchhiking', 'meetup' ]
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
