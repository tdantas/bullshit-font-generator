#bullshit-font-generator

### Thank you [ SansBullshitSans](https://github.com/RoelN/SansBullshitSans)

### Install

To use **bullshit-font-generator** your system MUST HAVE [ttx](https://github.com/behdad/fonttools/) installed.

![usage](https://cdn.rawgit.com/tdantas/repository-assets/master/assets/bullshit-font-generator/buzz.gif)


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
$ echo 'bullshit' | bfg
 Generating your bullshit font
 Your new bullshit font /some/tmp/folder/72d883ef-b77d-4d5c-ba55-a94dd7f0cd20
 
 # rename the 72d883ef-b77d-4d5c-ba55-a94dd7f0cd20 to whatever you want
 
$ mv /some/tmp/folder/72d883ef-b77d-4d5c-ba55-a94dd7f0cd20 bullshit.ttf
````
 

you can specify the directory output and font name  

````
  $ echo 'nosql' | bfg -n bullshit.ttf -d /home
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





