var exec = require('child_process').execFile;
var os = require('os');
var path = require('path');

var ligatures = require('./lib/ligatures');
var render = require('./lib/template');

module.exports = bullshit;

var BIN = 'ttx';

function bullshit(words, options, callback) {
  if (!Array.isArray(words))
    words = [ words ];

  if ('function' === typeof options) {
    callback = options;
    options = { };
  }

  var ligatureGlyphs = ligatures(words);
  render(ligatureGlyphs, rendered);

  function rendered(err, filename) {
    generate(filename, { filename: options.filename, dir: options.dir }, callback);
  }

  function generate(file, options, callback) {
    var args = [ ];

    var dir = options.dir;
    var filename = options.filename;
    var fqdn;

    if (filename)
      args.push('-o', filename);

    if (dir) {
      args.push('-d', dir);
    }

    args.push(file);

    exec(BIN, args, { cwd: dir || os.tmpDir() }, function(err, stdout, stderr) {
      if (err)
        return callback(err);

      dir = dir || path.dirname(file);
      filename = filename || path.basename(file);
      fqdn = path.join(dir, filename);

      callback(null, fqdn);
    });
  }
}


