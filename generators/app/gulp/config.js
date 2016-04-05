var path = require('path');

var _DIST = 'dist';
var _DEV = 'src';
var _PROD = 'prod';
var _FONTS = 'fonts';
var _IMG = 'images';
var _JS = 'scripts';
var _CSS = 'styles';
var _TEMPLATES = 'templates';
var _PAGES = 'templates/pages';

var DEV_HOST = 'http://localhost:';
var DEV_PORT = 5000;

var DIST_HOST = 'http://localhost:';
var DIST_PORT = 5001;

var INDEX_FILE = 'index.html';

var LESS_FILE = 'styles.less';
var CSS_FILE = 'styles.css';
var CSS_MIN_FILE = 'styles.min.css';

var JS_FILE = 'app.js';
var BUILT_JS_FILE = 'app.built.js';
var MIN_JS_FILE = 'app.min.js';

var VENDOR_FILE = 'vendor.js';
var VENDOR_MIN_FILE = 'vendor.min.js';

// these get reused in the export

var APP_ROOT = path.join(__dirname, '../');
var APP_GULP = path.join(APP_ROOT, 'gulp');
var APP_SRC = path.join(APP_ROOT, _DEV);
var APP_DIST = path.join(APP_ROOT, _DIST);
var APP_PROD = path.join(APP_ROOT, _PROD);

var APP_SRC_CSS = path.join(APP_SRC, _CSS);
var APP_SRC_IMG = path.join(APP_SRC, _IMG);
var APP_SRC_JS = path.join(APP_SRC, _JS);
var APP_SRC_TEMPLATES = path.join(APP_SRC, _TEMPLATES);
var APP_SRC_PAGES = path.join(APP_SRC, _PAGES);
var APP_SRC_INDEX_FILE = path.join(APP_SRC, INDEX_FILE);
var APP_SRC_JS_FILE = path.join(APP_SRC_JS, JS_FILE);
var APP_SRC_LESS_FILE = path.join(APP_SRC_CSS, LESS_FILE);
var APP_SRC_CSS_FILE = path.join(APP_SRC_CSS, CSS_FILE);

var APP_DIST_CSS = path.join(APP_DIST, _CSS);
var APP_DIST_FONTS = path.join(APP_DIST, _FONTS);
var APP_DIST_IMG = path.join(APP_DIST, _IMG);
var APP_DIST_JS = path.join(APP_DIST, _JS);
var APP_DIST_INDEX_FILE = path.join(APP_DIST, INDEX_FILE);
var APP_DIST_CSS_FILE = path.join(APP_DIST, CSS_FILE);
var APP_DIST_JS_FILE = path.join(APP_DIST_JS, BUILT_JS_FILE);
var APP_DIST_VENDOR_FILE = path.join(APP_DIST_JS, VENDOR_FILE);

var APP_PROD_IMG = path.join(APP_PROD, _IMG);
var APP_PROD_JS = path.join(APP_PROD, _JS);
var APP_PROD_CSS = path.join(APP_PROD, _CSS);

module.exports = {

  _CSS: _CSS,
  _DIST: _DIST,
  _DEV: _DEV,
  _PROD: _PROD,
  _FONTS: _FONTS,
  _IMG: _IMG,
  _JS: _JS,
  _TEMPLATES: _TEMPLATES,

  APP_PROD: APP_PROD,

  APP_PROD_IMG: APP_PROD_IMG,
  APP_PROD_JS: APP_PROD_JS,
  APP_PROD_CSS: APP_PROD_CSS,

  APP_DIST: APP_DIST,

  APP_DIST_FONTS: APP_DIST_FONTS,
  APP_DIST_CSS: APP_DIST_CSS,
  APP_DIST_IMG: APP_DIST_IMG,
  APP_DIST_JS: APP_DIST_JS,
  APP_DIST_INDEX_FILE: APP_DIST_INDEX_FILE,
  APP_DIST_CSS_FILE: APP_DIST_CSS_FILE,
  APP_DIST_JS_FILE: APP_DIST_JS_FILE,
  APP_DIST_VENDOR_FILE: APP_DIST_VENDOR_FILE,

  APP_GULP: APP_GULP,

  APP_ROOT: APP_ROOT,

  APP_SRC: APP_SRC,
  APP_SRC_INDEX_FILE: APP_SRC_INDEX_FILE,
  APP_SRC_TEMPLATES: APP_SRC_TEMPLATES,
  APP_SRC_PAGES: APP_SRC_PAGES,
  APP_SRC_CSS: APP_SRC_CSS,
  APP_SRC_IMG: APP_SRC_IMG,
  APP_SRC_JS: APP_SRC_JS,

  APP_SRC_JS_FILE: APP_SRC_JS_FILE,
  APP_SRC_LESS_FILE: APP_SRC_LESS_FILE,
  APP_SRC_CSS_FILE: APP_SRC_CSS_FILE,

  CSS_MIN_FILE: CSS_MIN_FILE,

  DEV_HOST: DEV_HOST,
  DEV_PORT: DEV_PORT,

  DIST_HOST: DIST_HOST,
  DIST_PORT: DIST_PORT,

  BUILT_JS_FILE: BUILT_JS_FILE,
  MIN_JS_FILE: MIN_JS_FILE,

  VENDOR_FILE: VENDOR_FILE,
  VENDOR_MIN_FILE: VENDOR_MIN_FILE

};
