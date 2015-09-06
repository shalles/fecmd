var fs = require('fs'),
    path = require('path'),
    utils = require('./src/utils'),
    requireItor = require('./src/requireIterator'),
    plugin = require('./src/plugin');

var PLUGIN_NAME = 'fecmd',
    codeStart = fs.readFileSync(__dirname + '/src/tpl/start.tpl').toString(),
    codetpl = fs.readFileSync(__dirname + '/src/tpl/code.tpl').toString(),
    codeInit = fs.readFileSync(__dirname + '/src/tpl/init.tpl').toString(),
    codeEnd = fs.readFileSync(__dirname + '/src/tpl/end.tpl').toString();

var buildPath = process.cwd();

// 注册插件 register Callback before & after require iterator searching
plugin(requireItor.cbBefore, requireItor.cbAfter, buildPath);

function Fecmd(opt) {
    var dft = {
        modulesPath: "",
        filesDir:{
            source: buildPath,
            exports: path.join(buildPath, 'export/')
        }
    };

    opt = !opt ? (utils.log("use default config : ", dft), dft) :
                                    utils.extend(dft, opt, true);         

    console.log('opt: \n', opt);

    var fp, ext, op,
        requireIterator = requireItor(opt),
        source = opt.filesDir.source, exports = opt.filesDir.exports;

    source = utils.convertAbsolute(buildPath, source);
    exports = utils.convertAbsolute(buildPath, exports);

    utils.log('source, exports', source, exports);

    function excuteFile(filepath, outpath){
        var i,
            main = '',
            contents = '',
            modules = {},
            moduleList = [];

        (filepath == outpath) && (i = outpath.lastIndexOf('.'), outpath = outpath.slice(0, i) + '.out' + outpath.slice(i));
        utils.log("-----filespath, outpath-----", filepath, outpath);
        // 深度优先遍历处理require  Depth-First searching require
        moduleList = requireIterator(buildPath, filepath, modules, moduleList);
        
        // 用函数实现cmd的处理  this is the core of fecmd
        contents = utils.simpleTemplate(codetpl, moduleList);

        // 合并文件 merge temolate
        main = utils.simpleTemplate(codeInit, utils.convertWintoInux(utils.removeBuildPath(filepath, buildPath)));
        contents = codeStart + contents + main + codeEnd;
        
        fs.writeFile(outpath, contents, function(err){
            if(err){
                console.log('error when write file: ', outpath);
            } else {
                console.log('export success!', outpath)
            }
        });
    }

    if (fs.existsSync(source) && fs.statSync(source).isDirectory()) {
        var filespath = fs.readdirSync(source);

        console.log(filespath);

        for(var i = 0, len = filespath.length; i < len; i++){
            fp = path.join(source, filespath[i]);

            // console.log("++++++++\n++++++++\n++++++++\n++++++++")
            if((ext = path.extname(fp)) === '.js'){
                op = path.resolve(exports, path.basename(fp));
                excuteFile(fp, op);
            }
        }
    } else {
        fp = source, op = exports;
        if(fs.existsSync(fp) && (ext = path.extname(fp)) === '.js'){
            // console.log("-------\n-------\n-------\n-------", fp)
            fs.existsSync(op) && fs.statSync(op).isDirectory() && (op = path.join(exports, path.basename(fp)));
            // console.log('fp:', fp);
            // console.log('op:', op);
            excuteFile(fp, op);
        }
    }
}

module.exports = Fecmd;