var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var funcs = require('./funcs');

// Note that children of this schema can be anything.
// I needed this so I've built it this way
var ElementSchema = new Schema({ 
            genericId       : { type: String, index: { unique: true } },
            name            : { type: String },
            dateCreated     : { type: Date },
            value           : { type: String }
});

ElementSchema.add({
            children        : [ElementSchema]
});

provider = function(){ };

// Search for, create and insert at adequate position
// as embedded document. Depth is set according to data length
// example: 
// data whose length is 6 will be 6-th level child of root object
provider.prototype.save = function(param, next, model){
        
        var Element = mongoose.model(model || 'bi_default', ElementSchema);
        
        var data = param['brojKonta'] || param['broj'];
        var naziv = param['naziv'];
        var usluga = param['vrijednost'] || param['usluga'];
             
        var level = (data + '').length - 1;
        var dataDcr = (data + '').substring(0,level);
        
        if(level == 0){
            var root = new Element({
                    genericId       : data,
                    name            : naziv,
                    dateCreated     : new Date(),
                    value           : usluga
                });

            root.schema.add({  
                children        : [ElementSchema]
            });
            

            Element.findOne({ genericId: data }, function(err, doc) { 
                if (err) throw err;         
                if (!doc) root.save(function (err) { (!err) ? next() : console.log(err) });
                else { next('already-in: ' + data) }
            });
        } else {
            var query = {};
            var childStr = 'children.';
            var i = 0;
            
            // build query
            query[childStr.repeat(level-1) + 'genericId'] = (data + '').substring(0, level);
            
            var child = new Element({
                    genericId       : data,
                    name            : naziv,
                    dateCreated     : new Date(),
                    value           : usluga
                        });

            child.schema.add({  
                children        : [ElementSchema]
            });

            Element.findOne(query).exec( function(err, doc) {
                var i = 0;
                var j = 0;
                var k = 2;
                var root = doc;

                if(doc){
                    while(i == 0){
                        var doclen = (doc.genericId + '').length;
                        
                        if(doclen == level && dataDcr == doc.genericId){
                            var index = doc.children.indexOfgenericId(data, -1);
                            if(index || ''){
                                // already in nothing to do
                                next('already-in: ' + data);
                                i = 1; 
                             } else {
                                doc.children.isNew;
                                doc.children.push(child);
                                root.save(function(err){(!err)? next() : console.log(err) });
                                i = 1;
                            }
                        }
                        else {
                            dataDcr = (data + '').substring(0,k); k++; 
                            var index = doc.children.indexOfgenericId(dataDcr, j);
                            (j >= doc.children.length)? j = 0: j++;
                            (index || '')? (doc = doc.children.id(index), j++): j=0;
                        }
                    }
                } else { next('missing-root-element: ' + data); }
           
        });
   }  
    
}

exports.provider = provider;
