#!/usr/bin/env node
/*global require, global*/

var test = require('tape');
var fs = require('fs');
var path = require('path');

var Screen = require('base-widget/spec/util').screenFactory;
var Editor = require('../.');

test("Editor", function (t) {
  var screen = new Screen();
  screen.key('C-q', function () { process.exit(); });
  var editor = new Editor({parent: screen});

  t.test(".open", function (st) {
    st.test("should throw EACCES for a file with perms 000", function (sst) {
      sst.plan(1);

      var perms000File = path.resolve(__dirname, 'fixtures/perms-000');

      // can't be checked in with 000 perms
      var originalPerms = (fs.statSync(perms000File).mode.toString(8).match(/[0-7]{3}$/) || [])[0] || '644';
      fs.chmodSync(perms000File, '000');

      editor.open(perms000File)
        .then(function () { sst.ok(false); })
        .catch(function (err) { sst.equal(err.code, 'EACCES'); })
        .finally(function () { fs.chmodSync(perms000File, originalPerms); })
        .done();
    });
  });

  t.on('end', function () {
    Editor.highlightClient.done(function (client) {
      client.dontRespawn = true;
      editor.detach();
    });
  });
});
