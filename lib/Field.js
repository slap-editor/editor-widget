var blessed = require('base-widget/node_modules/blessed');
var _ = require('lazy.js');

var util = require('slap-util');
var editorWidgetOpts = require('./opts');

var Editor = require('./Editor');

function Field (opts) {
  var self = this;

  if (!(self instanceof blessed.Node)) return new Field(opts);

  Editor.call(self, _(editorWidgetOpts.field)
    .merge({
      height: 1,
      multiLine: false
    })
    .merge(opts || {})
    .toObject());
  self.language(false);
}
Field.prototype.__proto__ = Editor.prototype;

Field.prototype.submit = function (value) { this.emit('submit', value); }
Field.prototype.cancel = function () { this.emit('cancel'); }
Field.prototype._initHandlers = function () {
  var self = this;
  self.on('keypress', function (ch, key) {
    switch (self.resolveBinding(key)) {
      case 'submit': self.submit(self.textBuf.getText()); return false;
      case 'cancel': self.cancel(); return false;
    };
  });
  return Editor.prototype._initHandlers.apply(self, arguments);
}

module.exports = Field;
