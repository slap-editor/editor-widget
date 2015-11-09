# editor-widget [![Build Status](https://travis-ci.org/slap-editor/editor-widget.svg?branch=master)](https://travis-ci.org/slap-editor/editor-widget)
Editor widget used by slap-editor/slap

#### Example

```
var blessed = require('blessed');
var Editor = require('editor-widget');

var filePath = './file.txt';

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'my window title';

// Create editor object
var editor = new Editor({
  parent: screen,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
});

editor.open(filePath);

// Save on Control-S.
screen.key(['C-s'], function(ch, key) {
  editor.save(filePath);
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Render the screen.
screen.render();

```
