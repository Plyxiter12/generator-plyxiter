'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: require('./package.json'),
        jshint: {
            all: {
                options: {
                    jshintrc: './.jshintrc'
                },
                src: [
                    'app/index.js',
                    'app/templates/*.js'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);

};
