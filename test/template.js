var test = require('tape');
var DOM = require('xmldom').DOMParser;
var xpath = require('xpath');

var template = require('../lib/template');

var fs = require('fs');

test("font template contains all words", function(t) {
  t.plan(2);

  var locals = {
    a: [ { value: 'g,i,l,e' } ]
  };
  template(locals, verify);

  function verify(err, template) {
    t.ifError(err, 'template without error');
    var ttx = fs.readFileSync(template, { encoding: 'utf8' });
    var dom = new DOM().parseFromString(ttx);
    var ele = xpath.select("//Ligature[@components='g,i,l,e']", dom);
    t.ok(ele.length === 1, 'generated with success');
  }

});

test('aggregate by initial letter', function(t) {
  t.plan(3);

  var locals = {
    a: [ { value: 'g,i,l,e' }, { value: 'g,g,r,e,g,a,t,o,r' }]
  };

  template(locals, verify);

  function verify(err, template) {
    t.ifError(err, 'template without error');
    var ttx = fs.readFileSync(template, { encoding: 'utf8' });
    var dom = new DOM().parseFromString(ttx);
    var eleAgile = xpath.select("//LigatureSet[@glyph='a']//Ligature[@components='g,i,l,e']", dom);
    var eleAggregator = xpath.select("//LigatureSet[@glyph='a']//Ligature[@components='g,g,r,e,g,a,t,o,r']", dom);
    t.ok(eleAgile.length === 1, 'generated agile with success');
    t.ok(eleAggregator.length === 1, 'generated aggregator with success');
  }

});

test("generate ligature for multiple words", function(t) {
  t.plan(3);

  var locals = {
    a: [ { value: 'g,i,l,e' } ],
    b: [ { value: 'i,g,space,d,a,t,a'}]
  };

  template(locals, verify);

  function verify(err, template) {
    t.ifError(err, 'template without error');
    var ttx = fs.readFileSync(template, { encoding: 'utf8' });
    var dom = new DOM().parseFromString(ttx);

    var ele = xpath.select("//LigatureSet[@glyph='a']//Ligature[@components='g,i,l,e']", dom);
    t.ok(ele.length === 1, 'generated with success');

    var eleBigData = xpath.select("//LigatureSet[@glyph='b']//Ligature[@components='i,g,space,d,a,t,a']", dom);
    t.ok(eleBigData.length === 1, 'generated with success');
  }

});


