var $ = require("jquery"),
    utils = require("lib/utils"),
    // or utils = require("lib/utils.js"),
    json = require("data/data.json"),
    tpl = require("tpl/html.tpl"),
    Cacl = require("lib/file.es6");


console.log($);
console.log(json);
console.log(utils.simpleTemplate(tpl, {
    title: "Fecmd Test Demo",
    content: "more infomation <a herf='https://github.com/shalles/fecmd'>https://github.com/shalles/fecmd</a>"
}));
console.log(new Cacl().add(1,2));