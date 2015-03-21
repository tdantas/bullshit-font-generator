var exec = require('child_process').execFile;
var os = require('os');

var ligatures = require('./lib/ligatures');
var render = require('./lib/template');

module.exports = bullshit;

var BIN = 'ttx';

function bullshit(words, callback) {
  if (!Array.isArray(words))
    words = [ words ];

  var renderDir = os.tmpDir();
  var ligatureGlyphs = ligatures(words);
  render(ligatureGlyphs, { dir: renderDir }, rendered);

  function rendered(err, filename) {
    generate(filename, { cwd: renderDir }, then);
  }

  function then(err, font) {
    if (err)
      return callback(err);

    callback(null, font);
  }
}

function generate(file, options, callback) {
  exec(BIN, [ file ], options, function(err, stdout, stderr) {
    if (err)
      return callback(err);

    callback(null, file);
  });
}
