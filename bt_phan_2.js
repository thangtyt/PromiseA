/**
 * Created by thangnv on 7/21/15.
 */

var promise = require("bluebird");
var fs = require('fs');
var request = require('request');
var gm =  require('gm');

var files = [
    {
        link : 'https://unsplash.imgix.net/photo-1425235024244-b0e56d3cf907?fit=crop&fm=jpg&h=700&q=75&w=1050',name : 'dog.jpg',name_thumb : './thumb/dog.jpg',name_bw:'./bw/dog.jpg'},{
        link : 'https://unsplash.imgix.net/photo-1425235024244-b0e56d3cf907?fit=crop&fm=jpg&h=700&q=75&w=1050',name : 'cat.jpg',name_thumb : './thumb/cat.jpg',name_bw:'./bw/cat.jpg'
    }
];
console.time('taskA');

function getPhoto(fileInput){
    return new Promise(function (fulfill,reject) {
        request.get(fileInput.link)
            .on('error', function (err) {
                reject(err);
            })
            .pipe(fs.createWriteStream(fileInput.name)
                .on('finish', function () {
                    gm(fileInput.name)
                        .resize(800,600)
                        .thumb(80,60 , fileInput.name_thumb, 50, function () {
                            //console.log('dsadas');
                        })
                        .write(fileInput.name_thumb, function (err) {
                            if(!err){
                                fulfill(fileInput.name_thumb);
                            }
                        });
                    gm(fileInput.name)
                        .resize(800,600)
                        .monochrome()
                        .write(fileInput.name_bw, function (err) {
                            if(!err){
                                fulfill(fileInput.name_bw);
                            }
                        });
                    fulfill(fileInput.name)
                })
                .on('error', function (err) {
                    reject(err);
                })
            );
    })
}
console.time('getPhoto');
promise.map(files, function (file) {
    return getPhoto(file).then(function (result) {
        return result;
    })

}).then(function (result) {
    console.timeEnd('getPhoto');
})
    .catch(function (err) {
    console.log('LOI : '+err)
})
