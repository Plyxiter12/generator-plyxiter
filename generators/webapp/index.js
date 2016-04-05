'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({

  constructor: function() {
    yeoman.Base.apply(this, arguments);
  },

  nodePackages: function() {
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

    this.prompt(prompts, function(answers) {
      var features = answers.features;

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1;
      }

      this.includeBrowserify = hasFeature('includeBrowserify');

      done();
    }.bind(this));
  },

  copyFiles: function() {
    //gulp
    this.directory('../gulp', 'gulp/tasks');

    //styles
    this.directory('../styles', 'src/styles');

    //javascript
    this.directory('../javascript', 'src/scripts');

    //html
    this.directory('../nunjucks', 'src/templates');
  }

});
