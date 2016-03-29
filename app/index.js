/**
 * Created by Plyxiter on 10/21/14.
 */
'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
// var portfolio = require('../portfolio_website.js');

module.exports = yeoman.generators.Base.extend({

    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        //portfolio website option
        this.option('portfolio', {
            desc: 'Framework for a generic portfolio website',
            type: Boolean,
            defaults: false
        });

        this.option('app', {
            desc: 'Framework for a web application',
            type: Boolean,
            defaults: false
        });

        this.app = this.options.app;
        this.portfolio = this.options.portfolio;

        this.pkg = require('../package.json');

    },

    appName: function() {
        var done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'name',
            message : 'Your project name',
            default : this.appname // Default to current folder name
        }, function (answers) {
            this.appname = answers.name;
            this.log(answers.name);
            done();
        }.bind(this));
    },

    cssFramework: function() {
        var done = this.async();

        var prompts = [{
            type: 'confirm',
            name: 'cssFramework',
            message: 'Would you like to include Bootstrap?'
        }];

        this.prompt(prompts, function(answers) {
            var features = answers.features;

            function hasFeature(feat) {
              return features && features.indexOf(feat) !== -1;
            }

            this.includeBootstrap = hasFeature('includeBootstrap');

            done();
        }.bind(this));
    },

    nodePackages: function() {
        if(!this.portfolio && !this.app){
            var done = this.async();

            var prompts = [{
                type: 'checkbox',
                name: 'features',
                message: 'What node modules would you like?',
                choices: [{
                    name: 'Browserify',
                    value: 'includeBrowserify',
                    checked: true
                }]
            }];

            this.prompt(prompts, function (answers) {
                var features = answers.features;

                function hasFeature(feat) {
                    return features && features.indexOf(feat) !== -1;
                }

                this.includeBrowserify = hasFeature('includeBrowserify');

                done();
            }.bind(this));
        }else if(this.app){
            this.includeBrowserify = true;
        }
    },

    bowerComponents: function () {
        var done = this.async();

        var prompts = [{
            type: 'checkbox',
            name: 'features',
            message: 'What Bower components would you like?',
            choices: [{
                name: 'jQuery',
                value: 'includeJquery',
                checked: true
            },{
                name: 'FontAwesome',
                value: 'includeFontAwesome',
                checked: true
            }, {
                name: 'Lodash',
                value: 'includeLodash',
                cehcked: false
            }]
        }];

        this.prompt(prompts, function (answers) {
            var features = answers.features;

            function hasFeature(feat) {
                return features && features.indexOf(feat) !== -1;
            }

            this.includeJquery = hasFeature('includeJquery');
            this.includeFontAwesome = hasFeature('includeFontAwesome');
            this.includeLodash = hasFeature('includeLodash');

            done();
        }.bind(this));
    },

    gulp: function () {
        this.copy('_Gulp.js', 'gulpfile.js');
        this.copy('gulp/config.js', 'gulp/config.js');
        this.copy('gulp/index.js', 'gulp/index.js');
        this.directory('gulp/common', 'gulp/tasks');

        if(this.app){
            this.directory('gulp/app', 'gulp/tasks');
        }
        else if(this.portfolio){
            this.directory('gulp/portfolio', 'gulp/tasks');
        }
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
            bower.dependencies.bootstrap = '~3.2.0';
        }
        if (this.includeJquery) {
            bower.dependencies.jquery = '~1.11.1';
        }
        if (this.includeFontAwesome) {
            bower.dependencies.fontawesome = '*';
        }
        if (this.includeLodash) {
            bower.dependencies.lodash = '*';
        }

        this.copy('_bowerrc', '.bowerrc');
        this.write('bower.json', JSON.stringify(bower, null));
    },

    jshint: function () {
        this.copy('_jshintrc', '.jshintrc');
    },

    favicon: function () {
        this.copy('favicon.ico', 'src/favicon.ico');
    },

    editorConfig: function () {
        this.copy('_editorconfig', '.editorconfig');
    },

    app: function () {

        //create file structure
        this.directory('src');
        this.mkdir('src/scripts');
        this.mkdir('src/styles');
        this.mkdir('src/images');
        this.template('assets/_styles.less', 'src/styles/styles.less', this);

        if (this.portfolio) {
            this.directory('nunjucks/portfolio', 'src/templates');
            this.template('assets/portfolio/_main.less', 'src/styles/main.less', this);
            this.template('assets/portfolio/_variables.less', 'src/styles/variables.less', this);
            this.copy('assets/portfolio/_portfolio_website.js', 'src/scripts/app.js');
        }

        if(this.app) {
            this.directory('nunjucks/app', 'src/templates');
            this.template('assets/app/_main.less', 'src/styles/main.less', this);
            this.template('assets/app/_variables.less', 'src/styles/variables.less', this);
            this.copy('assets/app/_app.js', 'src/scripts/app.js');
        }

    },

    installDep: function () {
        var done = this.async();
        this.installDependencies();
        done();
    }

});
