/**
 * Created by thangnv on 7/21/15.
 */
var promise = require('bluebird');

var array = [2,4,'5',7,'fds','sfsd343','8',43,'fdsfs5454','2222']

promise.map(array, function (arr) {
    if (typeof arr === "number"){
        return arr*arr;
    }else{
        if (!isNaN(parseInt(arr))){
            return parseInt(arr)*parseInt(arr)
        }
    }
}).then(function (result) {
    for (var i = 0 ; i < result.length ; i++){
        if (typeof result[i] === "number"){
            console.log(result[i]);
        }
    }
})
    .catch(function (err) {
    console.log(err)
})

