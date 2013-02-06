String.prototype.repeat = function(num){
    return new Array( num + 1 ).join( this );
}

Array.prototype.indexOfgenericId = function(id, pos) {
    for (var i = 0; i < this.length; i++)
        if (this[i].genericId === id){
            return this[i]._id; i=0; break;}
    return (this[pos] || '' && pos == -1)? this[pos]._id : null;      
}

// polje, reverse!, (parseInt, parseFloat)
function sortBy(field, reverse, primer){

   var key = function (x) {return primer ? primer(x[field]) : x[field]};

   return function (a,b) {
       var A = key(a), B = key(b);

       return ((A < B) ? -1 : (A > B) ? + 1 : 0) * [-1,1][+!!reverse];                  
   }
}

exports.sortBy = sortBy;
