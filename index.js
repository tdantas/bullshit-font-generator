var exec = require('child_process').execFile;
var os = require('os');
var path = require('path');
var uuid = require('uuid');

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

  var renderDir = options.dir || os.tmpDir();
  var filename = options.filename || uuid.v4();

  var ext = path.extname(filename);
  var basename = path.basename(filename, ext);

  var ligatureGlyphs = ligatures(words);
  render(ligatureGlyphs, { dir: renderDir, filename: basename }, rendered);

  function rendered(err, filename) {
    generate(filename, { cwd: renderDir }, then);
  }

  function then(err, font) {
    if (err)
      return callback(err);

    callback(null, font);
  }

  function generate(file, options, callback) {
    exec(BIN, [ file ], options, function(err, stdout, stderr) {
      if (err)
        return callback(err);

      callback(null, file + ext);
    });
  }
}


