#!/usr/bin/env node

var blessed = require('blessed');
var Editor = require('../.');

var screen = new blessed.Screen();
screen.key('C-q', function () { process.exit(); });
var editor = new Editor({parent: screen});
editor.open(__filename).done();
