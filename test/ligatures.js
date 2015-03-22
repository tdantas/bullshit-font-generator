var test = require('tape');
var ligatures = require('../lib/ligatures');

test("generate for one word", function(t) {
  t.plan(5);

  var glyph = ligatures('agile');

  t.ok(glyph.a, 'prefixed with first char');
  t.ok(Array.isArray(glyph.a), 'returns an array of components');
  t.ok(glyph.a.length === 1, 'returns an array with 1 component');

  t.ok(glyph.a[0].value, 'contains value property');
  t.ok(glyph.a[0].glyph, 'contains glyph property');
});

test("generate for multiple word", function(t) {
  t.plan(6);
  var glyph = ligatures(['agile', 'bigdata']);

  t.ok(glyph.a.length === 1, 'returns an array with 1 component for agile');
  t.ok(glyph.b.length === 1, 'returns an array with 1 component big-data');

  t.deepEqual(glyph.a[0].value, 'gile'.split(''), 'contains value property');
  t.ok(glyph.a[0].glyph, 'contains glyph property');

  t.deepEqual(glyph.b[0].value, 'igdata'.split(''), 'contains value property');
  t.ok(glyph.b[0].glyph, 'contains glyph property');
});

test("generate for multiple word", function(t) {
  t.plan(6);
  var glyph = ligatures(['agile', 'bigdata']);

  t.ok(glyph.a.length === 1, 'returns an array with 1 component for agile');
  t.ok(glyph.b.length === 1, 'returns an array with 1 component big-data');

  t.deepEqual(glyph.a[0].value, 'gile'.split(''), 'contains value property');
  t.ok(glyph.a[0].glyph, 'contains glyph property');

  t.deepEqual(glyph.b[0].value, 'igdata'.split(''), 'contains value property');
  t.ok(glyph.b[0].glyph, 'contains glyph property');
});


[ 'big-data',
  'c++',
  'using<xml>',
  'ruby&rails',
  'some spaces',
  'wat!',
  'who?',
  '1+1=2',
  'red,blue',
  'email@domain.com',
  'snake_case',
  'word-with-ç' ].forEach(function(word) {
    test("replace special character", function(t) {
      t.plan(1);

      var glyph = ligatures(word);
      var prefix = word.substring(0,1);

      var transform = word.split('').map(function(c) {
        var subs = ligatures.CHAR_TABLE[c];
        if (!subs)
          return c;

        return subs;
      });

      t.deepEqual(glyph[prefix][0].value, transform.slice(1), 'generated valid glyph for ' + word);
    });
});

test("group by same prefix", function(t) {
  t.plan(1);
  var glyph = ligatures(['agile', 'aggregate', 'agility']);
  t.ok(glyph.a.length === 3);
});

test("do not generate duplicated", function(t) {
  t.plan(1);
  var glyph = ligatures(['agile', 'agile', 'agile']);
  t.ok(glyph.a.length === 1);
});
