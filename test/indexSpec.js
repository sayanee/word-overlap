(function() {
  'use strict';

  var expect = require('chai').expect,
    overlap = require('../index');

  describe('Overlap', function() {

    describe('List', function() {

      describe('With no options', function() {
        it('returns an array', function(done) {
          var sentence1 = '2 Hr Hands-On Money-Making Workshop by CodeClub',
            sentence2 = 'Hands-On App Creation Session for Your Business by CodeClub';

          expect(overlap(sentence1, sentence2)).to.be.an('array');
          done();
        });

        it('returns an array of overlapped words', function(done) {
          var sentence1 = '2 Hr Hands-On Money-Making Workshop by CodeClub',
            sentence2 = 'Hands-On App Creation Session for Your Business by CodeClub';

          expect(overlap(sentence1, sentence2)).to.have.members([
            'Hands-On',
            'by',
            'CodeClub'
          ]);
          done();
        });

        it('returns an array of unique words', function(done) {
          var sentence1 = 'C++ programming, Assembly programming',
            sentence2 = 'C++ programming, Assembly programming';

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
          var sentence1 = '2 Hr Hands-On Money-Making Workshop by CodeClub',
            sentence2 = 'Hands-On App Creation Session for Your Business by CodeClub',
            overlapList = overlap(sentence1, sentence2, {
              ignoreCommonWords: true
            });

          expect(overlapList).to.have.members([
            'Hands-On',
            'CodeClub'
          ]);
          done();
        });
      });

      describe('With option minWordLength', function() {
        it('returns overlapped words with minimum word length of 1 ', function(done) {
          var sentence1 = 'A B Hr Hands-On Money-Making Workshop by CodeClub',
            sentence2 = 'A B Hands-On App Creation Session for Your Business by CodeClub',
            overlapList = overlap(sentence1, sentence2, {
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
          var sentence1 = 'A B Hr Hands-On Money-Making Workshop by CodeClub',
            sentence2 = 'A B Hr Hands-On App Creation Session for Your Business by CodeClub',
            overlapList = overlap(sentence1, sentence2, {
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
          var sentence1 = 'Base and base',
            sentence2 = 'Base in base',
            overlapList = overlap(sentence1, sentence2, {
              ignoreCase: true
            });

          expect(overlapList).to.include.members([ 'base' ]);
          expect(overlapList).to.have.length(1);
          done();
        });

        it('returns overlapped words without lowercase', function(done) {
          var sentence1 = 'Base and base',
            sentence2 = 'Base in base',
            overlapList = overlap(sentence1, sentence2);

          expect(overlapList).to.include.members([ 'base', 'Base' ]);
          expect(overlapList).to.have.length(2);
          done();
        });
      });
    });

  });

})();
