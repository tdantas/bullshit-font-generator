#!/usr/bin/env node

var fs = require('fs');
var chalk = require('chalk');
var path = require('path');

var dirs = process.env.PATH.split(path.delimiter);
var BIN = 'ttx';

var BINS = dirs.map(function(d) { return path.join(d,BIN); });
var exists = BINS.some(function(bin) { return fs.existsSync(bin); });

if (exists)
  print('green', 'YEAHHH !! \\0/ We found ttx in your PATH.');
else
  print('red', 'Sorry, are you sure that TTX is on your path.');


function print() {
  var args = Array.prototype.slice.call(arguments);
  var color = args.shift();
  var msg = args;

  var colored = chalk[color || 'grey'].apply(chalk, msg);
  console.log(colored);
}
