var fs = require('fs'),
    path = require('path');

var PLUGIN_NAME = 'fecmd',
    regexID = /[^a-zA-Z0-9]/g,
    flagWin = /\w:/.test(process.cwd());

function log() {
    console.log('---- ' + PLUGIN_NAME + ' log ------------------------------------\n',
                                        Array.prototype.join.call(arguments, "\n"));
}

function simpleTemplate(str, data) {

    if (!str || !data) return '';

    var type = Object.prototype.toString.call(data),
        strRes = '',
        regex = /\{\{\s*(\w+)\s*\}\}/g;

    switch (type) {
        case '[object Array]':
            for (var i = 0, len = data.length; i < len; i++) {
                strRes += simpleTemplate(str, data[i]);
            }
            break;
        case '[object Object]':
            strRes = str.replace(regex, function ($0, $1) {
                return data[$1];
            });
            break;
        case '[object String]':
            strRes = str.replace(regex, data);
            break;
        default:
            strRes = '';
    }

    return strRes;
}

function convertID(path) {
    return path.replace(regexID, "");
}

function convertWintoInux(path){
    return flagWin ? path.replace(/[\\]/g, "/") : path;
}

function classof(o) {
    // if (o === null) return "Null";
    // if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}

function extend(){
    
    function copy(to, from, deep){
        for(var i in from){
            var fi = from[i];
            if(deep && (!fi.nodeType || fi !== window)){
                var classFI = classof(fi), 
                    isArr = classFI === 'Array', 
                    isObj = classFI === 'Object';
                if(isArr || isObj){
                    isArr && (to[i] = []);
                    isObj && (to[i] = {});

                    copy(to[i], from[i], deep);
                }
            }
            if(from[i] !== undefined){
                to[i] = from[i];
            }
        }
    }

    var re = {}, len = arguments.length, deep;
    deep = arguments[len-1] === true ? (len--, true): false
    for(var i = 0; i < len; i++){
        classof(arguments[i]) === 'Object' && copy(re, arguments[i], deep);
    }

    return re;
}


function clearJs(str){
    var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g;
    return str.replace(reg, function(word) {
        return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word;
    });
}

function readjson(filepath){
    var json;
    try{
        json = JSON.parse(clearJs(fs.readFileSync(filepath).toString()));
    } catch(e){
        json = {}
    }
    return json;
}

function removeBuildPath(p, bp){
    if(p.indexOf(bp) === 0){
        p = p.slice(bp.length);
    }
    return p;
}

function convertAbsolute(bp, p){
    return path.isAbsolute(p) ? p : path.resolve(bp, p);
}

module.exports = {
    log: log,
    clearJs: clearJs,
    simpleTemplate: simpleTemplate,
    convertID: convertID,
    flagWin: flagWin,
    convertWintoInux: convertWintoInux,
    extend: extend,
    readjson: readjson,
    removeBuildPath: removeBuildPath,
    convertAbsolute: convertAbsolute
}