var express = require('express');
var router = express.Router();

var path = require('path');
var async = require('async');

function loadDirectory(callback)
{
    // Project Folder
    // var parentDir = path.dirname(module.parent.filename);    
    // var finalPath = parentDir + '\\public\\';

    fs.readdir('./public', function (err, files)
    {
        if (err)
        {
            callback(err);
        }
        else
        {
            for (var i = 0; i < files.length; i++)
            {
                files[i] = './public/' + files[i];
                // files[i] = finalPath + files[i];
            }

            // res.render('dataroom', { title: '한양대학교 산업융학학부 15학번', text: files.toString() });
            callback(null, files);
        }
    });
}

function IsNullOrEmpty(l)
{
    if (l == null || l.length == 0)
        return true;
    return false;
}

function loadFileEachDirectory(files, callback)
{
    if (IsNullOrEmpty(files))
    {
        callback('dataroom::loadFileEachDirectory(), ArgumentNullException');
        return;
    }

    async.map(files, fs.readdir, function (err, results)
    {
        if (err)
            console.log('[ERR] dataroom::loadFileEachDirectory(files, callback), ' + err);
        else
        {
            if (IsNullOrEmpty(results))
            {
                callback(null, results);
                return;
            }
            
            var res = [];

            for (var i = 0; i < files.length; i++)
            {
                if (IsNullOrEmpty(results[i]))
                    continue;

                var obj = {};
                var arr = [];
                for (var j = 0; j < results[i].length; j++)
                {
                    if (IsNullOrEmpty(results[i][j]))
                        continue;

                    arr.push(files[i] + '/' + results[i][j]);
                }

                obj['folder'] = files[i];
                obj['files'] = arr;

                res.push(obj);
            }

            callback(null, res);
        }
    });
}

/* GET home page. */
router.get('/', function (req, res, next) {
    
    async.waterfall([
        loadDirectory
        , loadFileEachDirectory
    ], function (err, result) {
        if (err)
            return;

        // console.log(result);
        res.render('dataroom', { title: '자료실', res : result });
    });

    /*
    fs.readdir(finalPath, function (err, files)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(files.toString());
            res.render('dataroom', { title: '한양대학교 산업융학학부 15학번', text: files.toString() });
        }
    });
    */
});

module.exports = router;
