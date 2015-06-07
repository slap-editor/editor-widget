/*global require, global*/

var test = require('tape');
var fs = require('fs');
var path = require('path');

var blessed = require('blessed');
var Editor = require('../.');

test("Editor", function (t) {
  var screen = new blessed.Screen();
  var editor = new Editor({parent: screen});

  t.test(".open", function (st) {
    st.test("should open a file with perms 000 correctly", function (sst) {
      sst.plan(1);

      var perms000File = path.resolve(__dirname, 'fixtures/perms-000');

      // can't be checked in with 000 perms
      var originalPerms = (fs.statSync(perms000File).mode.toString(8).match(/[0-7]{3}$/) || [])[0] || '644';
      fs.chmodSync(perms000File, '000');

      editor.open(perms000File)
        .then(function () {
          sst.equal(editor.textBuf.getText(), '');
        })
        .finally(function () { fs.chmodSync(perms000File, originalPerms); })
        .done();
    });
    st.end();
  });
  t.end();
});
