module.exports = ligature;

var BULLSHIT_GLYPHS = {
  small: 'uniE602',
  medium: 'uniE601',
  large: 'uniE600'
};

/*
  Need to update char table with more values
*/

var CHAR_TABLE = {
  ' ': 'space',
  '!': 'exclam',
  '+': 'plus',
  '&': 'ampersand',
  '*': 'asterisk',
  '-': 'hyphen',
  '/': 'slash',
  '>': 'greater',
  '<': 'less',
  '=': 'equal',
  '?': 'question',
  ';': 'semicolon',
  ',': 'colon',
  "'": 'quotesingle',
  '@': 'at',
  '_': 'underscore',
  'ç': 'cedilla',
  '0': 'zero',
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine',
  '.': 'period',
  '\u2019': 'period'
};

var CHAR_MAP_KEYS = Object.keys(CHAR_TABLE);

ligature.BULLSHIT_GLYPHS = BULLSHIT_GLYPHS;
ligature.CHAR_TABLE = CHAR_TABLE;

function ligature(words) {
  if (! Array.isArray(words))
    words = [ words ];

  return uniq(words)
          .map(mapper)
          .reduce(reducer, { });
}

function replacer(word) {
  return CHAR_MAP_KEYS.reduce(function(acc, w) {
    return acc.replace(w, CHAR_TABLE[w]);
  }, word);
}

function mapper(item) {
  var split = item.split('');
  var first = split.shift();

  var head = replacer(first);
  var tail = split.map(replacer);

  return [ head, tail ];
}

function reducer(result, item) {
  var idx = item[0];
  var components = result[idx];

  if (!components)
    result[idx] = [ ];

  result[idx].push({ value: item[1], glyph: bullshitGlyph(item[1]) });
  return result;
}

function uniq(array) {
  return array.filter(isUnique);

  function isUnique(ele, idx, arr) {
    return arr.indexOf(ele) === idx;
  }
}

function bullshitGlyph(word) {
  var length = word.length;

  if (length <= 4)
    return BULLSHIT_GLYPHS.small;

  if ( length >= 5 && length <= 8 )
      return BULLSHIT_GLYPHS.medium;

  return BULLSHIT_GLYPHS.large;
}
