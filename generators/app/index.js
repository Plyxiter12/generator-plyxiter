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
        message: 'What front-end components would you like?',
        choices: [{
          name: 'jQuery',
          value: 'includeJquery',
          checked: true
        }, {
          name: 'FontAwesome',
          value: 'includeFontAwesome',
          checked: false
        }, {
          name: 'Modernizr',
          value: 'includeModernizr',
          checked: false
        }]
      }];

      this.prompt(prompts, function(answers) {
        var features = answers.features;

        function hasFeature(feat) {
          return features && features.indexOf(feat) !== -1;
        }

        this.includeJquery = hasFeature('includeJquery');
        this.includeFontAwesome = hasFeature('includeFontAwesome');
        this.includeModernizr = hasFeature('includeModernizr');

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
    app: function() {
      //create file structure
      this.directory('src');
      this.mkdir('src/scripts');
      this.mkdir('src/styles');
      this.mkdir('src/images');
    },

    dependencies: function() {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      if (this.includeBootstrap) {
        pkg.dependencies.bootstrap = '*';
      }
      if (this.includeJquery) {
        pkg.dependencies.jquery = '*';
      }
      if (this.includeFontAwesome) {
        pkg.dependencies['font-awesome'] = '*';
      }
      if (this.includeModernizr) {
        pkg.dependencies.modernizr = '*';
      }

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    nunjucks: function() {
      if (this.subgenerator === 'none') {
        this.directory('../nunjucks', 'src/templates');
      }
    },

    css: function() {
      this.directory('../styles/defaults', 'src/styles');
    },

    gulp: function() {
      this.copy('_Gulp.js', 'gulpfile.js');
      this.copy('../gulp/config.js', 'gulp/config.js');
      this.copy('../gulp/index.js', 'gulp/index.js');
      this.directory('../gulp/common', 'gulp/tasks');

      if (this.includeFontAwesome) {
        this.copy('../gulp/bower/fonts.js', 'gulp/tasks/fonts.js');
      }
    },

    git: function() {
      this.template('_gitignore', '.gitignore', this);
      this.copy('_gitattributes', '.gitattributes');
    },

    packageJSON: function() {
      this.template('_package.json', 'package.json');
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
