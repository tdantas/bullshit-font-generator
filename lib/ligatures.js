module.exports = ligature;

var BULLSHIT_GLYPH = {
  small: 'uniE602',
  medium: 'uniE601',
  large: 'uniE600'
};

function ligature(words) {
  if (! Array.isArray(words))
    words = [ words ];

  return uniq(words)
          .map(mapper)
          .reduce(reducer, { });
}

function mapper(item) {
  item = item.replace(/[^a-z0-9 ]/ig,'');

  var split = item.split('');
  var head = split.shift();

  var tail = split.map(function(value) {
    if (value.trim() === '')
      return 'space';
    return value;
  });

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
    return BULLSHIT_GLYPH.small;

  if ( length >= 5 && length <= 8 )
      return BULLSHIT_GLYPH.medium;

  return BULLSHIT_GLYPH.large;
}
