var fs = require('fs');
var os = require('os');
var path = require('path');
var _ = require('underscore');
var uuid = require('uuid');


var TEMPLATE_FILE = path.join(__dirname, '../template/sansbullshitfont.underscore');
var TMPL = _.template(fs.readFileSync(TEMPLATE_FILE, { encoding: 'utf8' }));

module.exports = template;

function template(words, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = { };
  }

  var name = options.filename || uuid.v4();
  var dir = options.dir || os.tmpDir();
  var fqdn = path.join(dir, name);

  fs.writeFile(fqdn, TMPL({ glyphs: words }), then);
  function then(err) {
    if (err)
      return callback(err);

    callback(null, fqdn);
  }
}
