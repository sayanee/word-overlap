(function() {
  'use strict';

  var expect = require('chai').expect;
  var overlap = require('../index');

  describe('Overlap', function() {

    describe('List', function() {

      describe('With no options', function() {
        it('returns an array', function(done) {
          var sentence1 = '2 Hr Hands-On Money-Making Workshop by CodeClub';
          var sentence2 = 'Hands-On App Creation Session for Your Business by CodeClub';

          expect(overlap(sentence1, sentence2)).to.be.an('array');
          done();
        });

        it('returns an array of overlapped words', function(done) {
          var sentence1 = '2 Hr Hands-On Money-Making Workshop by CodeClub';
          var sentence2 = 'Hands-On App Creation Session for Your Business by CodeClub';

          expect(overlap(sentence1, sentence2)).to.have.members([
            'Hands-On',
            'by',
            'CodeClub'
          ]);
          done();
        });

        it('returns an array of overlapped words removing empty strings', function(done) {
          var sentence1 = 'hello  there';
          var sentence2 = 'hello  ';

          expect(overlap(sentence1, sentence2)).to.have.members([
            'hello'
          ]);
          done();
        });

        it('returns an array of unique words', function(done) {
          var sentence1 = 'C++ programming, Assembly programming';
          var sentence2 = 'C++ programming, Assembly programming';

          expect(overlap(sentence1, sentence2)).to.have.length(3);
          expect(overlap(sentence1, sentence2)).to.include.members([
            'C++',
            'Assembly',
            'programming'
          ]);

          done();
        });
      });

      describe('With option ignoreCommonWords: true', function() {
        it('returns overlapped words without common words ', function(done) {
          var sentence1 = '2 Hr Hands-On Money-Making Workshop by CodeClub';
          var sentence2 = 'Hands-On App Creation Session for Your Business by CodeClub';
          var overlapList = overlap(sentence1, sentence2, {
            ignoreCommonWords: true
          });

          expect(overlapList).to.have.members([
            'Hands-On',
            'CodeClub'
          ]);
          done();
        });
      });

      describe('With option ignoreCommonWords: true', function() {
        it('returns overlapped words numbers', function(done) {
          var sentence1 = 'Welcome to 2015 ahead';
          var sentence2 = '2015 Year ahead';
          var overlapList = overlap(sentence1, sentence2, {
            ignoreNumber: true
          });

          expect(overlapList).to.have.members([
            'ahead'
          ]);
          expect(overlapList).to.not.have.members([
            '2015'
          ]);
          done();
        });
      });

      describe('With option minWordLength', function() {
        it('returns overlapped words with minimum word length of 1 ', function(done) {
          var sentence1 = 'A B Hr Hands-On Money-Making Workshop by CodeClub';
          var sentence2 = 'A B Hands-On App Creation Session for Your Business by CodeClub';
          var overlapList = overlap(sentence1, sentence2, {
            minWordLength: 1
          });

          expect(overlapList).to.include.members([
            'A',
            'B'
          ]);
          expect(overlapList).to.include.members([
            'Hands-On',
            'CodeClub'
          ]);

          done();
        });

        it('returns overlapped words with minimum word length of 2 ', function(done) {
          var sentence1 = 'A B Hr Hands-On Money-Making Workshop by CodeClub';
          var sentence2 = 'A B Hr Hands-On App Creation Session for Your Business by CodeClub';
          var overlapList = overlap(sentence1, sentence2, {
            minWordLength: 2
          });

          expect(overlapList).to.include.members([
            'Hr',
            'by'
          ]);
          expect(overlapList).to.include.members([
            'Hands-On',
            'CodeClub'
          ]);

          done();
        });
      });

      describe('With option ignoreCase', function() {
        it('returns overlapped words with lowercase', function(done) {
          var sentence1 = 'Base and base';
          var sentence2 = 'Base in base';
          var overlapList = overlap(sentence1, sentence2, {
            ignoreCase: true
          });

          expect(overlapList).to.include.members([ 'base' ]);
          expect(overlapList).to.have.length(1);
          done();
        });

        it('returns overlapped words without lowercase', function(done) {
          var sentence1 = 'Base and base';
          var sentence2 = 'Base in base';
          var overlapList = overlap(sentence1, sentence2);

          expect(overlapList).to.include.members([ 'base', 'Base' ]);
          expect(overlapList).to.have.length(2);
          done();
        });
      });

      describe('With options ignoreCommonWords and common', function() {

        it('does not return user defined commons words and common words', function(done) {
          var sentence1 = 'Knitting class by Ellen at CornerClub';
          var sentence2 = 'Needle crafting class by Ellen at CornerClub';
          var overlapList = overlap(sentence1, sentence2, {
            ignoreCommonWords: true,
            common: [ 'class' ]
          });

          expect(overlapList).to.eql([
            'Ellen',
            'CornerClub'
          ]);
          expect(overlapList).to.not.eql([
            'Ellen',
            'CornerClub',
            'by',
            'at',
            'class'
          ]);
          done();
        });
      });

      describe('With option depluralize', function() {
        it('returns overlapped words depluralized', function(done) {
          var sentence1 = 'Base and bases';
          var sentence2 = 'Base in base';
          var overlapList = overlap(sentence1, sentence2, {
            ignoreCase: true,
            depluralize: true
          });

          expect(overlapList).to.include.members([ 'base' ]);
          expect(overlapList).to.have.length(1);
          done();
        });

        it('returns overlapped words depluralized and common', function(done) {
          var sentence1 = 'Base and base';
          var sentence2 = 'Base in bases';
          var overlapList = overlap(sentence1, sentence2, {
            depluralize: true,
            common: [ 'base' ]
          });

          expect(overlapList).to.include.members([ 'Base' ]);
          expect(overlapList).to.have.length(1);
          done();
        });

        it('returns overlapped words without depluralization', function(done) {
          var sentence1 = 'Base and bases';
          var sentence2 = 'Bases in base';
          var overlapList = overlap(sentence1, sentence2);

          expect(overlapList).to.have.length(0);
          done();
        });
      });

      describe('With option stemming', function() {
        it('returns the word stem or root word', function(done) {
          var sentence1 = 'A programming course in SmallTalk';
          var sentence2 = 'Have you programmed in SmallTalk?';
          var overlapList = overlap(sentence1, sentence2, {
            stemming: true,
            ignoreCommonWords: true
          });

          expect(overlapList).to.include.members([
            'program',
            'smalltalk'
          ]);

          done();
        });
      })
    });

  });

})();
