module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    bump: {
      options: {
        files: [ 'package.json' ],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: [ 'package.json' ],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1'
      }
    },

    jscs: {
      src: [
        'Gruntfile.js',
        'example.js',
        'index.js',
        'lib/**/*.js',
        'test/**/*.js'
      ],
      options: {
        config: '.jscsrc'
      }
    },

    jshint: {
      all: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'Gruntfile.js',
          'example.js',
          'index.js',
          'lib/**/*.js',
          'test/**/*.js'
        ]
      }
    },

    jsonlint: {
      all: {
        src: [
          'package.json',
          '.jscs.json',
          '.jshintrc'
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-jsonlint');

  grunt.registerTask('default', [
    'jsonlint',
    'jscs',
    'jshint'
  ]);

};
