'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: require('./package.json'),
        jshint: {
            all: {
                options: {
                    jshintrc: './.jshintrc'
                },
                src: [
                    '**/index.js',
                    '*.js'
                ]
            }
        }
    });

    grunt.registerTask('default', ['jshint']);

};
