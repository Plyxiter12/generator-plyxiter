'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({

  constructor: function() {
    yeoman.Base.apply(this, arguments);
  },

  prompting: {

    nodePackages: function() {
      var done = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'features',
        message: 'What node modules would you like to include?',
        choices: [{
          name: 'Browserify',
          value: 'includeBrowserify',
          checked: true
        }]
      }];

      this.prompt(prompts, function(answers) {
        var features = answers.features;

        function hasFeature(feat) {
          return features && features.indexOf(feat) !== -1;
        }

        this.includeBrowserify = hasFeature('includeBrowserify');

        done();
      }.bind(this));
    },

    frontEndFrameworks: function() {
      var done = this.async();

      var prompts = [{
        type: 'list',
        name: 'frontEndFramework',
        message: 'What front-end framework would you like to use?',
        choices: [{
          name: '-- None --',
          value: 'none'
        }, {
          name: 'Backbone & Marionette',
          value: 'backbone',
        }]
      }];

      this.prompt(prompts, function(answers) {
        this.framework = answers.frontEndFramework;
        done();
      }.bind(this));
    }
  },

  writing: {

    package: function() {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      if (this.includeBrowserify) {
        pkg.devDependencies.browserify = '^0.5.2';
        pkg.devDependencies['gulp-sourcemaps'] = '*';
        pkg.devDependencies.lodash = '*';
        pkg.devDependencies['lodash.assign'] = '*';
        pkg.devDependencies.resolve = '*';
        pkg.devDependencies.watchify = '*';
        pkg.devDependencies['browserify-shim'] = '*';
        pkg.browserify.transform = ['browserify-shim'];
      }

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    frontEnd: function() {
      var bower = this.fs.readJSON(this.destinationPath('bower.json'), {});

      if (this.framework === 'backbone') {
        bower.dependencies.backbone = '*';
        bower.dependencies.underscore = '*';
        bower.dependencies['backbone.marionette'] = '*';
      }

      this.fs.writeJSON(this.destinationPath('bower.json'), bower);
    },

    copyFiles: function() {
      //gulp
      if (this.includeBrowserify) {
        this.copy('../gulp/browserify.js', 'gulp/tasks/browserify.js');
      }
      this.copy('../gulp/builder.js', 'gulp/tasks/builder.js');

      //styles
      this.directory('../styles', 'src/styles');

      //javascript
      this.template('../scripts/_vendor.js', 'src/scripts/vendor.js', this);
      this.copy('../scripts/app.js', 'src/scripts/vendor.js', this);

      //html
      this.directory('../nunjucks', 'src/templates');
    }
  }
});
