/**
 * Created by Plyxiter on 10/21/14.
 */
'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({

    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.option('angular', {
            desc: 'Use angularJS for your web application',
            type: Boolean,
            defaults: false
        });
        this.angular = this.options.angular;

        this.option('knockout', {
            desc: 'Use Knockoutjs for your web application',
            type: Boolean,
            defaults: false
        });
        this.knockout = this.options.knockout;

        this.pkg = require('../package.json');

    },

    framework: function () {

        if (this.angular) {
            var done = this.async();

            this.log(require('yosay')());
            this.log(chalk.magenta(
                'You chose to use angularJS for your webapp!'
            ));
            var prompts = [{
                type: 'checkbox',
                name: 'modules',
                message: 'Which modules would you like to include?',
                choices: [
                    {
                        value: 'animateModule',
                        name: 'angular-animate.js',
                        checked: false
                    }, {
                        value: 'cookiesModule',
                        name: 'angular-cookies.js',
                        checked: false
                    }, {
                        value: 'resourceModule',
                        name: 'angular-resource.js',
                        checked: false
                    }, {
                        value: 'routeModule',
                        name: 'angular-route.js',
                        checked: false
                    }, {
                        value: 'sanitizeModule',
                        name: 'angular-sanitize.js',
                        checked: false
                    }, {
                        value: 'touchModule',
                        name: 'angular-touch.js',
                        checked: false
                    }
                ]
            }];

            this.prompt(prompts, function (answers) {
                var modules = answers.modules;

                function hasMod(feat) {
                    return modules && modules.indexOf(feat) !== -1;
                }

                this.animateModule = hasMod('animateModule');
                this.cookiesModule = hasMod('cookiesModule');
                this.resourceModule = hasMod('resourceModule');
                this.routeModule = hasMod('routeModule');
                this.sanitizeModule = hasMod('sanitizeModule');
                this.touchModule = hasMod('touchModule');

                var angMods = [];

                if (this.animateModule) {
                    angMods.push("'ngAnimate'");
                }

                if (this.cookiesModule) {
                    angMods.push("'ngCookies'");
                }

                if (this.resourceModule) {
                    angMods.push("'ngResource'");
                }

                if (this.routeModule) {
                    angMods.push("'ngRoute'");
                    this.env.options.ngRoute = true;
                }

                if (this.sanitizeModule) {
                    angMods.push("'ngSanitize'");
                }

                if (this.touchModule) {
                    angMods.push("'ngTouch'");
                }

                if (angMods.length) {
                    this.env.options.angularDeps = '\n    ' + angMods.join(',\n    ') + '\n  ';
                }

                done();

            }.bind(this));
        }

        if (this.knockout) {
            this.log(require('yosay')());
            this.log(chalk.magenta(
                'You chose to use Knockout for your webapp!'
            ));
        }
    },

    askFor: function () {
        var done = this.async();

        if (!this.options['default']) {
            this.log(require('yosay')());
            this.log(chalk.magenta(
                'Out of the box I include an HTML5 Boilerplate, LESS css & a ' +
                'Gruntfile.js to build your app.'
            ));
        }

        var prompts = [{
            type: 'checkbox',
            name: 'features',
            message: 'What Bower components would you like?',
            choices: [{
                name: 'jQuery',
                value: 'includeJquery',
                checked: true
            }, {
                name: 'Bootstrap',
                value: 'includeBootstrap',
                checked: false
            }, {
                name: 'Modernizr',
                value: 'includeModernizr',
                checked: false
            }, {
                name: 'require.js',
                value: 'includeRequire',
                checked: false
            }, {
                name: 'FontAwesome',
                value: 'includeFontAwesome',
                checked: false
            }, {
                name: 'Underscore',
                value: 'includeUnderscore',
                cehcked: false
            }]
        }];

        this.prompt(prompts, function (answers) {
            var features = answers.features;

            function hasFeature(feat) {
                return features && features.indexOf(feat) !== -1;
            }

            this.includeJquery = hasFeature('includeJquery');
            this.includeBootstrap = hasFeature('includeBootstrap');
            this.includeModernizr = hasFeature('includeModernizr');
            this.includeRequire = hasFeature('includeRequre');
            this.includeFontAwesome = hasFeature('includeFontAwesome');
            this.includeUnderscore = hasFeature('includeUnderscore');

            done();
        }.bind(this));
    },

    gruntfile: function () {
        this.template('_Gruntfile.js', 'Gruntfile.js');
    },

    git: function () {
        this.template('_gitignore', '.gitignore', this);
        this.copy('_gitattributes', '.gitattributes');
    },

    packageJSON: function () {
        this.template('_package.json', 'package.json');
    },

    bower: function () {
        var bower = {
            name: this._.slugify(this.appname),
            private: true,
            dependencies: {}
        };

        if (this.includeBootstrap) {
            bower.dependencies.bootstrap = "~3.2.0";
        }
        if (this.includeJquery) {
            bower.dependencies.jquery = "~1.11.1";
        }
        if (this.includeModernizr) {
            bower.dependencies.modernizr = "~2.8.2";
        }
        if (this.includeRequire) {
            bower.dependencies.require = "*";
        }
        if (this.includeFontAwesome) {
            bower.dependencies.fontAwesome = "*";
        }
        if (this.includeUnderscore) {
            bower.dependencies.underscore = "*";
        }

        bower.dependencies.less = '*';

        this.copy('_bowerrc', '.bowerrc');
        this.write('bower.json', JSON.stringify(bower, null));
    },

    jshint: function () {
        this.copy('_jshintrc', '.jshintrc');
    },

    favicon: function () {
        this.copy('favicon.ico', 'src/favicon.ico')
    },

    editorConfig: function () {
        this.copy('_editorconfig', '.editorconfig');
    },

    wireIndex: function () {
        this.indexFile = this.engine(
            this.readFileAsString(path.join(this.sourceRoot(), 'index.html')),
            this
        );

        // wire Bootstrap plugins
        if (this.includeBootstrap) {
            var bs = '../components/bootstrap/js/';
            this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', [
                bs + 'affix.js',
                bs + 'alert.js',
                bs + 'dropdown.js',
                bs + 'tooltip.js',
                bs + 'modal.js',
                bs + 'transition.js',
                bs + 'button.js',
                bs + 'popover.js',
                bs + 'carousel.js',
                bs + 'scrollspy.js',
                bs + 'collapse.js',
                bs + 'tab.js'
            ]);
        }

        this.indexFile = this.appendFiles({
            html: this.indexFile,
            fileType: 'js',
            optimizedPath: 'src/scripts/main.js',
            sourceFileList: ['src/scripts/main.js']
        });
    },

    app: function () {

        this.directory('src');
        this.mkdir('src/scripts');
        this.mkdir('src/styles');
        this.mkdir('src/images');
        this.template('_main.less', 'src/styles/main.less', this);

        this.write('src/index.html', this.indexFile);


        if (this.angular) {
            this.copy('_angular.js', 'src/scripts/main.js');
        } else if (this.knockout) {
            this.copy('_knockout.js', 'src/scripts/main.js');
        } else {
            this.copy('_main.js', 'src/scripts/main.js');
        }

    },

    installDep: function () {
        var done = this.async();
        this.installDependencies();
        done();
    }

});