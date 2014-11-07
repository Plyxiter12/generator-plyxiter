/**
 * Created by holeinone1200 on 10/28/14.
 */
'use strict';

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // measures the time each task takes
    require('time-grunt')(grunt);

    var appConfig = {
        app: 'src',
        dist: 'dist'
    };

    // Project configuration.
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: {
            multipleFiles: {
                expand: true,
                flatten: true,
                src: '<%= yeoman.app %>/css/*.css',
                dest: '<%= yeoman.dist %>/css/'
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'build',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: 'build'
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    // Change this to '0.0.0.0' to access the server from outside.
                    hostname: 'localhost',
                    base: 'build'
                }
            }

        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', '*/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '<%= yeoman.app %>/scripts/vendor/*'
            ]
        },

        less: {
            dev: {
                options: {
                    paths: ['src/styles'],
                    cleanncss: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/styles',
                        src: ['**/*.less'],
                        dest: '<%= yeoman.app %>/styles/css',
                        ext: '.css'
                    }
                ]
            }
        },

        uglify: {
            dev: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                build: {
                    src: '<%= yeoman.app %>/scripts/**/*.js',
                    dest: 'temp/<%= pkg.name %>.min.js'
                }
            }

        },

        watch: {
            less: {
                files: ['<%= yeoman.app %>/styles/*.less'],
                tasks: ['less:dev']
            }
        },

        wiredep: {
            app: {
                src: ['<%= yeoman.app %>/index.html']
            }
        }
    });

    // task(s).
    grunt.registerTask('server', [
        'newer:less:dev',
        'clean:server',
        'wiredep',
        'connect',
        'watch']);

    grunt.registerTask('build', [
        'newer:jshint',
        'newer:less:dev',
        'newer:autoprefixer',
        'newer:uglify:dev']);
};