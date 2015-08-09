(function() {
  'use strict';

  var expect = require('chai').expect;
  var lib = require('../../lib/lib');

  describe('Overlap', function() {

    describe('Sanitize', function() {

      it('returns without punctuations: ! or ?', function() {
        var sentence = 'Hello! How are you?';
        expect(lib.sanitize(sentence)).to.equal('Hello How are you');
      });

      it('returns without punctuations: @', function() {
        var sentence = 'See you @Mars';
        expect(lib.sanitize(sentence)).to.equal('See you Mars');
      });

      it('keeps hyphens', function() {
        var sentence = 'Hands-on C Programming';
        expect(lib.sanitize(sentence)).to.equal('Hands on C Programming');
      });

      it('separates a word with a dot', function() {
        var sentence = 'name.com';
        expect(lib.sanitize(sentence)).to.equal('name com');
      });

      it('removes a full stop', function() {
        var sentence = 'name.';
        expect(lib.sanitize(sentence)).to.equal('name');
      });

      it('replaces a hyphen with a space', function() {
        var sentence = 'name-com';
        expect(lib.sanitize(sentence)).to.equal('name com');
      });
    });

    describe('Tokenize', function() {
      var sentence = '1st Docker Meetup';

      it('returns an array', function() {
        expect(lib.tokenize(sentence)).to.be.an('array');
      });

      it('returns an array of words', function() {
        expect(lib.tokenize(sentence)).to.have.members([
          '1st',
          'Docker',
          'Meetup'
        ]);
      });
    });

    describe('Remove empty string', function() {
      var sentence = [
        '',
        'hello'
      ];

      it('returns an array', function() {
        expect(sentence.filter(lib.removeEmptyString)).to.be.an('array');
        expect(sentence.filter(lib.removeEmptyString)).to.have.members([
          'hello'
        ]);
        expect(sentence.filter(lib.removeEmptyString)).to.not.have.members([
          ''
        ]);
      });
    });

    describe('Get words with min length', function() {

      it('returns an array with minimum length words', function() {
        var words = [
          'a',
          'CS',
          'course',
          'by',
          'CodeClub'
        ];
        var answer = words.filter(lib.getWordsWithMinLen.bind(this, 2));

        expect(answer).to.be.an('array');
        expect(answer).to.not.have.members([
          'a',
          'by'
        ]);
        expect(answer).to.have.members([
          'CS',
          'by',
          'course',
          'CodeClub'
        ]);
      });
    });

    describe('Remove common words', function() {
      it('returns an array', function() {
        var words = [
          'a',
          'meetup',
          'by',
          'knitters'
        ];
        var common = [
          'a', 'an', 'the', 'this', 'that', 'there', 'it',
          'in', 'on', 'for', 'not', 'your', 'you', 'at',
          'to', 'is', 'us', 'out', 'by', 'I'
        ];

        expect(lib.removeCommonWords(words, common)).to.not.include([
          'a',
          'by'
        ]);
      });
    });

    describe('Remove numbers', function() {
      it('returns an array', function() {
        var words = [
          'welcome',
          '2015'
        ];

        expect(lib.removeNumbers(words)).to.not.include([
          '2015'
        ]);
      });
    });

    describe('Depluralize words', function() {

      it('returns an array with depluralized words', function() {
        var words = [
          'a',
          'computers',
          'courses',
          'club'
        ];
        var ignorePlurals = [ 'CS' ];
        var answer = lib.depluralize(words, ignorePlurals);

        expect(answer).to.be.an('array');
        expect(answer).to.include.members([
          'a',
          'computer',
          'course',
          'club'
        ]);
      });
    });

    describe('Stem words', function() {

      it('returns an array with stem words', function() {
        var words = [
          'programming',
          'swimming',
          'eating',
          'traveled'
        ];
        var answer = lib.stem(words);

        expect(answer).to.be.an('array');
        expect(answer).to.have.members([
          'program',
          'swim',
          'eat',
          'travel'
        ]);
      });
    });
  });
})();
