(function() {
  'use strict';

  var expect = require('chai').expect,
    lib = require('../../lib/lib');

  describe('Overlap', function() {

    describe('Sanitize', function() {

      it('returns without punctuations: ! or ?', function(done) {
        var sentence = 'Hello! How are you?';
        expect(lib.sanitize(sentence)).to.equal('Hello How are you');
        done();
      });

      it('returns without punctuations: @', function(done) {
        var sentence = 'See you @Mars';
        expect(lib.sanitize(sentence)).to.equal('See you Mars');
        done();
      });

      it('keeps hyphens', function(done) {
        var sentence = 'Hands-on C Programming';
        expect(lib.sanitize(sentence)).to.equal('Hands-on C Programming');
        done();
      });
    });

    describe('Tokenize', function() {
      var sentence = '1st Docker Meetup';

      it('returns an array', function(done) {
        expect(lib.tokenize(sentence)).to.be.an('array');
        done();
      });

      it('returns an array of words', function(done) {
        expect(lib.tokenize(sentence)).to.have.members([
          '1st',
          'Docker',
          'Meetup'
        ]);
        done();
      });
    });

    describe('Get words with min length', function() {

      it('returns an array with minimum length words', function(done) {
        var words = [
            'a',
            'CS',
            'course',
            'by',
            'CodeClub'
          ],
          answer = words.filter(lib.getWordsWithMinLen.bind(this, 2));

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

        done();
      });
    });

    describe('Remove common words', function() {
      it('returns an array', function(done) {
        var words = [
            'a',
            'meetup',
            'by',
            'knitters'
          ],
          common = [
            'a', 'an', 'the', 'this', 'that', 'there', 'it',
            'in', 'on', 'for', 'not', 'your', 'you', 'at',
            'to', 'is', 'us', 'out', 'by', 'I'
          ];

        expect(lib.removeCommonWords(words, common)).to.not.include([
          'a',
          'by'
        ]);
        done();
      });
    });

  });

})();
