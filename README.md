#bullshit-font-generator

### Install

To use **bullshit-font-generator** your system MUST HAVE [ttx](https://github.com/behdad/fonttools/) installed.


````
npm i -g bullshit-font-generator
$ bfg-check
  YEAHHH !! \0/ We found ttx in your PATH.
````

### Usage

````
 var ITBuzzWords = [
  'ninja',
  'sass',
  'guru',
  'big data'
  ];

 var bullshit = require('bullshit-font-generator');
 bullshit(words, then);

 function font(err, path) {
  if (err)
    throw err;

  console.log(path); // => somewhere at tmp folder
 }
 ````    

#####long bullshit name
    
    bullshit-font-generator
    
#####short bullshit name

    
    bfg
    
  
#####Examples:
  
 echo whatever buzzword to bfg

 ````
 $ echo 'agile' | bullshit-font-generato
 ````
 
 ````
 $ echo 'agile' | bfg
 ````

As **bfg** read from stdin you can type as many buzzwords as you want from your terminal, **CONTROL-D** will finish the list and start the font generation.

````
  $ bfg
    agile
    flat organization
    big-data
    ^D
````

If you have a huge list the simple way is to create a file.
(one buzzword by line)

````
  $ echo "agile" >> buzzword.txt
  $ echo "big-data" >> buzzword.txt
  $ cat buzzword.txt | bfg

 ````





