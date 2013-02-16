// Dependencies
var mongoose = require('mongoose');
var mongourl = require('./mongourl');
var rest = require('./rest');
var funcs = require('./funcs');
var provider = require('./provider').provider;

var arguments = process.argv.splice(2);
var provider = new provider();
var start = new Date().getTime();
var delta = 0;
var params = [];
var db = arguments[0];
var col = arguments[1];
var variant = arguments[2];

// Arguments
(arguments.length < 3 ) ? ( console.log('\nUsage: node app <db> <collection> <cofog|kontniplan>\n'), process.kill()) : null;

mongourl.generate(function(url) { mongoose.connect(url) }, db);


// Data url
// In this case - parsed MS Excel document - 
// Plan of accounts of budget beneficiaries of Republic of Srpska  
var hostname = 'kontni-plan-parsed.pej.st';

var options = {
  host: hostname,
  port: 80,
  path: '/materijali/get?sta=' + variant,
  method: 'GET',
  headers: {
        'Content-Type': 'application/json'
    }
};

// Note : Data is structured by its length. Longer structures are children of shorter ones
rest.getJSON(options, function(statusCode, result){
    params = result.results.sort(funcs.sortBy('brojKonta', true));
    provider.save(result.results[0], next, col);
});

function next(msg) {

    param = params.shift();
    (msg || '') ? console.log('! ' + msg) : null;
    if(param || ''){
        provider.save(param, next, col);
        process.stdout.write('Ubacujem ' + param.brojKonta + '\r');
    } else {
        delta = new Date().getTime() - start;
        console.log('Zavšeno za ' + delta + ' milisekundi.');
        process.kill();
    }
}

