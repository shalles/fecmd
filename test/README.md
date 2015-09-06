# fecmd

```js
$ npm install -g fecmd 

$ cd test

//a) scan src/source folder, convert all js files and export export/js with same name
$ fecmd src/scripts export/js

//or b) convert app.js to export/

$ fecmd src/scripts/app.js export/

//or c)
//use base path and export with a flag 'out' such source app.js export app.out.js

$ fecmd src/scripts/app.js

//or d)
//scan current folder, convert all js files, export like c) 
$ fecmd

```


`1`. modulesPath  (must be exact path) in fecmd.config
`2`. .bowerrc directory (if exists)
`3`. bower_components (if exists)
`4`. modulesPath (!!modulesPath === false)
