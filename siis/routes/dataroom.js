var express = require('express');
var router = express.Router();

var path = require('path');
var async = require('async');

var EZCrypto = require('./../scripts/EZCrypto');
var EZDB = require('./../scripts/EZDB');

const folderPath = './private/dataroom/';

function loadDirectory(callback)
{
    // Project Folder
    // var parentDir = path.dirname(module.parent.filename);    
    // var finalPath = parentDir + '\\public\\';

    fs.readdir(folderPath, 'utf8', function (err, files)
    {
        if (err)
        {
            callback(err);
        }
        else
        {
            for (var i = 0; i < files.length; i++)
            {
                files[i] = folderPath + files[i];
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

function loadFileEachDirectory(folders, callback)
{
    if (IsNullOrEmpty(folders))
    {
        callback('dataroom::loadFileEachDirectory(), ArgumentNullException');
        return;
    }
    
    var fs = require('fs');

    async.map(folders, fs.readdir, function (err, results)
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
            var csv = 'hashValue,folder,name\n';

            for (var i = 0; i < folders.length; i++)
            {
                if (IsNullOrEmpty(results[i]))
                    continue;

                var obj = {};
                var arr = [];
                for (var j = 0; j < results[i].length; j++)
                {
                    if (IsNullOrEmpty(results[i][j]))
                        continue;
                    
                    var file = {};
                    // file['path'] = folders[i] + '/' + results[i][j];
                    file['path'] = EZCrypto.encrypt(folders[i] + '/' + results[i][j]);
                    console.log(file['path']);
                    csv += file['path'];
                    csv += ',';

                    csv += folders[i];
                    csv += ',';

                    file['name'] = results[i][j];

                    csv += file['name'];
                    csv += '\n';
                    
                    arr.push(file);
                }

                obj['folder'] = folders[i].replace(folderPath, '');
                obj['files'] = arr;

                res.push(obj);
            }

            fs.writeFileSync('dataroom.txt', Buffer.from(csv, 'utf8'), 'utf8');
            callback(null, res);
        }
    });
}

/* GET home page. */
router.get('/', function (req, res, next) {
    
    //async.waterfall([
    //    loadDirectory
    //    , loadFileEachDirectory
    //], function (err, result) {
        
    //});
    
    var sql = 'select Idx, Folder,FileName, DownloadCount from dataroom';
    EZDB.query(sql, function (err, results) {
        if (err) throw err;
        else {
          
            var map = new Map();
            for (var i = 0; i < results.length; i++) {
                var row = results[i];
                var key = row['Folder'];
                if (map.has(key) == false) {
                    map.set(key, []);
                }

                var arr = map.get(key);
                delete row['Folder'];
                arr.push(row);
            }
          
            var arr = [];
            for (var key of map.keys()) {
                var file = {};
                file['Folder'] = key;
                file['Files'] = map.get(key);
                arr.push(file);
            }
          
            res.render('dataroom', {
                title: '자료실'
                , user: req.user
                , res: arr
            });
        }
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
