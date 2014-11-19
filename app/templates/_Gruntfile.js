'use strict';

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        app: 'src',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%%= config.app %>/scripts/**/*.js'],
                tasks: ['newer:jshint']
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['newer:jshint']
            },
            less: {
                files: ['<%%= config.app %>/styles/**/*.less'],
                tasks: ['newer:less']
            },
            styles: {
                files: ['<%%= config.app %>/styles/**/*.css'],
                tasks: ['autoprefixer']
            }
        },

        // The actual grunt server settings
        connect: {
            dev: {
                options: {
                    port: 8000,
                    open: true,
                    // Change this to '0.0.0.0' to access the server from outside
                    hostname: 'localhost'
                }
            },
            build: {
                options: {
                    port: 9000,
                    open: true,
                    hostname: 'localhost'
                }
            }

        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%%= config.dist %>/*'
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= config.app %>/scripts/**/*.js'
            ]
        },

        less: {
            dev: {
                options: {
                    paths: ['<%%= config.app %>/styles'],
                    cleanncss: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%%= config.app %>/styles',
                        src: ['**/*.less'],
                        dest: '<%%= config.app %>/styles/css',
                        ext: '.css'
                    }
                ]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.dist %>/styles/css',
                    src: '**/*.css',
                    dest: '<%%= config.dist %>/styles/css'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        wiredep: {
            app:{
                src: ['<%%= config.app %>/**/*.html']
            }
        },

        injector: {
            options: {},
            local_dependencies: {
                files: {
                    'index.html': ['scripts/**/*.js', 'styles/**/*.css']
                }
            },
            bower_dependencies: {
                files: {
                    'index.html': ['bower.json']
                }
            }
        },


        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= config.dist %>/**/*.js',
                        '<%%= config.dist %>/**/*.css',
                        '<%%= config.dist %>/images/**/.*',
                        '<%%= config.dist %>/fonts/**/*.*',
                        '<%%= config.dist %>/*.{ico,png}'
                    ]
                }
            }
        },

        cssmin: {
            generated: {
                options: {
                    banner: '/*minified css file */'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/build/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/',
                    ext: '.min.css'
                }]
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/images',
                    src: '**/*.{gif,jpeg,jpg,png}',
                    dest: '<%%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/images',
                    src: '**/*.svg',
                    dest: '<%%= config.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%%= config.dist %>',
                    src: '**/*.html',
                    dest: '<%%= config.dist %>'
                }]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.app %>',
                    dest: '<%%= config.dist %>',
                    src: [
                        '**/*.html'
                    ]
                }]
            }
        },

        concat: {
            generated: {
                files: [
                    {
                        dest: '<%%= config.dist %>/build/build.js',
                        src: [

                            //This might need to be configured for a specific order
                            '<%%= config.app %>/scripts/**/*.js'
                        ]
                    }, {
                        dest: '<%%= config.dist %>/build/build.css',
                        src: [
                            '<%%= config.app %>/styles/css/**/*.css'
                        ]
                    }
                ]
            }
        },

        uglify: {
            generated: {
                options: {
                    banner: '/* minified js file */'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/build/',
                    src: ['*.js', '!*.min.js'],
                    dest: 'dist/',
                    ext: '.min.js'
                }]
            }
        }
    });


    grunt.registerTask('server', [
        'newer:less',
        'wiredep',
        'autoprefixer',
        'connect:dev',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'newer:less',
        'wiredep',
        'newer:autoprefixer',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'copy:dist',
        'rev',
        'htmlmin'
        //'imagemin',
        //'svgmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'build'
    ]);
};