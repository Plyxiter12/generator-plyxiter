'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.Base.extend({

  constructor: function() {
    yeoman.Base.apply(this, arguments);

    this.pkg = require('../../package.json');
  },

  prompting: {

    appName: function() {
      var done = this.async();
      this.prompt({
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname // Default to current folder name
      }, function(answers) {
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

    bowerComponents: function() {
      var done = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'features',
        message: 'What Bower components would you like?',
        choices: [{
          name: 'jQuery',
          value: 'includeJquery',
          checked: true
        }, {
          name: 'FontAwesome',
          value: 'includeFontAwesome',
          checked: true
        }, {
          name: 'Lodash',
          value: 'includeLodash',
          cehcked: false
        }]
      }];

      this.prompt(prompts, function(answers) {
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

    generatorPrompt: function() {
      var done = this.async();

      var prompts = [{
        type: 'list',
        name: 'subGenerators',
        message: 'Would you like to include a sub generator?',
        choices: [{
          name: '-- None --',
          value: 'none'
        }, {
          name: 'Portfolio',
          value: 'portfolio',
        }, {
          name: 'Web Application',
          value: 'webapp',
        }]
      }];

      this.prompt(prompts, function(answers) {
        this.subgenerator = answers.subGenerators;
        done();
      }.bind(this));
    },

  },

  writing: {

    gulp: function() {
      this.copy('_Gulp.js', 'gulpfile.js');
      this.copy('../gulp/config.js', 'gulp/config.js');
      this.copy('../gulp/index.js', 'gulp/index.js');
      this.directory('../gulp/common', 'gulp/tasks');
    },

    git: function() {
      this.template('_gitignore', '.gitignore', this);
      this.copy('_gitattributes', '.gitattributes');
    },

    packageJSON: function() {
      this.template('_package.json', 'package.json');
    },

    bower: function() {
      var bower = {
        name: this.appname,
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

    jshint: function() {
      this.copy('_jshintrc', '.jshintrc');
    },

    jscs: function() {
      this.copy('_jscsrc', '.jscsrc');
    },

    favicon: function() {
      this.copy('favicon.ico', 'src/favicon.ico');
    },

    editorConfig: function() {
      this.copy('_editorconfig', '.editorconfig');
    },

    app: function() {
      //create file structure
      this.directory('src');
      this.mkdir('src/scripts');
      this.mkdir('src/styles');
      this.mkdir('src/images');
      this.template('../styles/_styles.less', 'src/styles/styles.less', this);
    }
  },

  subGenerators: function() {
    if (this.subgenerator === 'portfolio') {
      this.composeWith('plyxiter:portfolio');
    }
    if (this.subgenerator === 'webapp') {
      this.composeWith('plyxiter:webapp');
    }
  },

  installDep: function() {
    var done = this.async();
    this.installDependencies();
    done();
  }

});
