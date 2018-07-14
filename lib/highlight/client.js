var fork = require('child_process').fork;
var path = require('path');
var minimist = require('minimist');
var Promise = require('bluebird');

var init = Promise.resolve();
var opts = minimist(process.execArgv);
var forkOpts = {silent: false};
if (['inspect', 'inspect-brk'].some(function (opt) { return opt in opts; })) {
  init = init
    .then(require('get-random-port'))
    .then(function (port) { forkOpts.execArgv = ['--inspect=' + port]; })
    .return(null);
}

function spawn () {
  return spawn.promise = spawn.promise.then(function (client) {
    if (client && client.dontRespawn) return client.kill();
    var oldMessageListeners = client ? client.listeners('message') : [];
    client = fork(path.join(__dirname, 'server.js'), forkOpts);
    client.setMaxListeners(100);
    client.on('exit', spawn);
    oldMessageListeners.forEach(client.on.bind(client, 'message'));
    return client;
  });
};
spawn.promise = init;

spawn.buckets = 0;
spawn.getBucket = function () { return spawn.buckets++; };

module.exports = spawn;
