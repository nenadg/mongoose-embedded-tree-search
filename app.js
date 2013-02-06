// Dependencies
var mongoose = require('mongoose');
var mongourl = require('./mongourl');

var ElementSchema = require('./test').Schema;
var Element = require('./test').Element;

var test = require('./test').test;
var funcs = require('./funcs');

mongourl.generate(function(url) { mongoose.connect(url); });

var test = new test();
var delta = 0;

// Dummy data to insert
// Note : Data is structured by its length. Longer structures are children of shorter ones
var param = {data: 1}
var params = [ {data: 10}, {data: 100}, {data: 1000}, {data: 10000}, {data: 100000},
               {data: 11}, {data: 111}, {data: 1111}, {data: 11111}, {data: 111111}, 
               {data: 12}, {data: 122}, {data: 1222}, {data: 12222}, {data: 122222}, 
               {data: 13}, {data: 133}, {data: 1333}, {data: 13333}, {data: 133333}, 
               {data: 14}, {data: 144}, {data: 1444}, {data: 14444}, {data: 144444}, 
               {data: 15}, {data: 155}, {data: 1555}, {data: 15555}, {data: 155555}];

// This example uses serial insertion due to the nature of document that 
// is to be built, in real life 'test.index' will most probably be executed 
// in async way

sequential(param, delta, next);

function sequential(param, ms, next)
{
    var start = new Date().getTime();

    setTimeout(function() {
        test.index(param, next);
        delta = new Date().getTime() - start;
        console.log(":: Inserted " + param.data + " for " + delta + "ms"); 
    }, ms);
}

// For sequential job the following was used: https://github.com/justgord/async_vs_serial/blob/master/async_vs_serial.js
function next() {
    //pop from front, execute, return
    param = params.shift();
    if(param)
        sequential(param, delta, next);
}

