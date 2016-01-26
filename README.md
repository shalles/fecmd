# fecmd

### install

```
sudo npm install fecmd -g

fecmd source export
// or 
npm install fecmd --save
```

.es6 
more infomation [ https://babeljs.io/docs/learn-es2015/ ](https://babeljs.io/docs/learn-es2015/)

### Documentation

**config**

//fecmd.config

modulePath: bower module path(node model)

*`priority`*

`0`. command line

```
//a) scan src/source folder, convert all js files and export export/js with same name
fecmd src/source export/js

//or b) convert app.js to export/

fecmd src/script/app.js export/

//or c)
//use base path and export with a flag 'out' such source app.js export app.out.js

fecmd src/script/app.js

//or d)
//scan current folder, convert all js files, export like c) 
fecmd

//or e)
//use fecmd.config
fecmd -e
```

`1`. modulesPath  (must be exact path)
`2`. .bowerrc directory (if exists)
`3`. bower_components (if exists)
`4`. modulesPath (!!modulesPath === false)

```json
{
    "modulesPath":"",
    "filesDir": [
        {
            "source": "src/scripts/",
            "exports": "src/export/js/"
        }
    ]
}
```

**program file**

```html
<!-- file index.html -->
<script src="js/a.js"></script>

```

```js
// file a.js

var b = require('lib/b.js'); // '[./]lib/b[.js]'
var tpl = require('tpl/xx.tpl'); //return a string
var json = require('data/data.json'); //return the Object
var es6 = require('lib/file.es6'); // return es5 code
// or
// require('c.js');
// require('d');
// 
// you can quote module 
// from bower module lick this require('jquery'), without 
// extname and without a filename jquery or jquery.js file
// in the same dir with a.js
require('jquery');


/* do something */
var console.log(b.c);

```

```js
// file lib/b.js

// other code do something
// such
// require()...
// var a,b,c...
// function(){} ...

//export your module
//*
module.exports = {
    c: 2,
    cc: 23
}
/*/
//or
exports.c = 2;
exports.cc = 23;
//*/
//
```
**es6**

```js
// file.es6

class Calc {
    constructor() {
        console.log('Calc constructor');
    }
    add(a, b) {
        return a + b;
    }
}

module.exports = Calc;

// usage
// var c = new Calc();
// console.log(c.add(1, 2));
```

**template**

require support template (*.tpl) like this file "xx.tpl"
and export a string

```html
<div>
    {{#list}}
    <span>{{supportTemplate}}</span>
    {{/list}}
</div>
```
export
```js
"<div>\n    {{#list}}\n    <span>{{supportTemplate}}</span>\n    {{/list}}\n</div>"
```

more -- Test Demo[ https://github.com/shalles/fecmd/tree/master/test ](https://github.com/shalles/fecmd/tree/master/test)

