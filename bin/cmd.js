#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    utils = require('../src/utils'),
    fecmd = require('../index');

var fileDir = process.argv.slice(2),
    cwd = process.cwd(),
    configPath = path.join(cwd, 'fecmd.config'),
    configJson = {};

console.log('configPath', configPath);
console.log('configJson', utils.readjson(configPath));

var source = fileDir[0], exp = fileDir[1];

if(source === '-e' && fs.existsSync(configPath) && 
        (configJson = utils.readjson(configPath)) && 
                            configJson['filesDir']){

    var dirs = configJson['filesDir'] || [];
    console.log('configJson["filesDir"]', dirs);
    for(var i = 0, len = dirs.length; i < len; i++){

        fecmd({
            filesDir: dirs[i]
        });
    }
} else if(source && (source = path.resolve(cwd, fileDir[0])) && fs.existsSync(source)){
    fecmd({
        filesDir: {
            source: source,
            exports: exp || source
        }
    })
} else {
    fecmd({
        filesDir: {
            source: cwd,
            exports: cwd
        }
    })
}