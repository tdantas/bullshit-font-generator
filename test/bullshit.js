var test = require('tape');
var bullshit = require('../');
var fs = require('fs');

[ ['multiple', 'words'], 'just one word'].forEach(function(word) {

  test("generate ttf file with words: " + word, function (t) {
    t.plan(2);

    bullshit(word, verify);

    function verify(err, path) {
      t.ifError(err, 'without error');
      var tenKB = 10240;
      var size = fs.statSync(path).size;
      t.ok(size > tenKB, 'greater than 10KB');
    }
  });
});
