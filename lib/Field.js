var _ = require('lodash');

var util = require('slap-util');
var editorWidgetOpts = require('./opts');

var Editor = require('./Editor');

function Field (opts) {
  var self = this;

  if (!(self instanceof Field)) return new Field(opts);

  Editor.call(self, _.merge({
    height: 1,
    multiLine: false
  }, editorWidgetOpts.field, opts));
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
