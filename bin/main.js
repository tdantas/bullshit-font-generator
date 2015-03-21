#!/usr/bin/env node

var chalk = require('chalk');
var readline = require('readline');

var bullshit = require('../');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var words = [ ];
rl.on('line', words.push.bind(words));
rl.on('close', generateFont);

function generateFont() {
  print('blue', 'Generating your bullshit font');
  bullshit(words, show);
}

function show(err, font) {
  if (err)
    return print('red', 'ERROR: ', err);

  print('green','Your new bullshit font', font);
}

function print() {
  var args = Array.prototype.slice.call(arguments);
  var color = args.shift();
  var msg = args;

  var colored = chalk[color || 'grey'].apply(chalk, msg);
  console.log(colored);
}
