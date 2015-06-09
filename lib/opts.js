var path = require('path');
var rc = require('rc');
var util = require('slap-util');

var package = require('../package');
var configFile = path.resolve(__dirname, '..', package.name + '.ini');
module.exports = util.parseOpts(rc(package.name, configFile));
