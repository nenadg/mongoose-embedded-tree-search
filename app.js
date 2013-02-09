// Dependencies
var mongoose = require('mongoose');
var mongourl = require('./mongourl');
var ElementSchema = require('./test').Schema;
var Element = require('./test').Element;
var test = require('./test').test;
var funcs = require('./funcs');
var rest = require('./rest');

var test = new test();
mongourl.generate(function(url) { mongoose.connect(url); });

var delta = 0;
var params;

// Data url
// In this case - parsed MS Excel document - 
// Plan of accounts of budget beneficiaries of Republic of Srpska  
var dataurl = 'kontni-plan-parsed.pej.st';

var options = {
  host: dataurl,
  port: 80,
  path: '/service/get',
  method: 'GET',
  headers: {
        'Content-Type': 'application/json'
    }
};

// Note : Data is structured by its length. Longer structures are children of shorter ones
rest.getJSON(options, function(statusCode, result){

    params = result.results.sort(funcs.sortBy('brojKonta', true))
    test.index(result.results[0], next);

});

function next() {

    var start = new Date().getTime();
    param = params.shift();
    
    if(param)
        test.index(param, next);
            
    delta = new Date().getTime() - start;    
    console.log(":: Inserted " + param.brojKonta + " for " + delta + "ms");
}

